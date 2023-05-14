import { isNumericValue } from "./lib/utils";

export type Handler<T = any> = (
  memory: T,
  matches: NonNullable<RegExpMatchArray["groups"]>
) => boolean | "continue"; // keep class | continue to next rule

export type Rule = [string, Handler];
export type RuleSet = Rule[];

export const CONTEXT_REGEXP = "(?<ctx>.*%s!?|!?)?-?%p";
export const TRAILING_SLASH_REGEXP = "(?:\\/[0-9]+)?";
export const VALUE_REGEXP = `(?:-(?<value>.+?)${TRAILING_SLASH_REGEXP})?`;

// simple rule
// -----------

export type SimpleHandlerOptions = { byType?: boolean };

export function createSimpleHandler({ byType }: SimpleHandlerOptions = {}) {
  const simpleHandler: Handler<
    Record<string, Partial<Record<"number" | "other", boolean>>>
  > = (memory, { value, target }) => {
    const type = byType && isNumericValue(value) ? "number" : "other";
    const mem = (memory[target!] ??= {});

    // seen before
    if (mem[type]) return false;

    // never seen
    return (mem[type] = true);
  };

  return simpleHandler;
}

export type SimpleRuleOptions = SimpleHandlerOptions;

export function simpleRule(
  target: string,
  { byType }: SimpleRuleOptions = {}
): Rule {
  const regExp = `^${CONTEXT_REGEXP}(?<target>${target})${VALUE_REGEXP}$`;
  return [regExp, createSimpleHandler({ byType })];
}

// cardinal rule
// -------------

export type CardinalHandlerOptions = {
  byType?: boolean;
};

type Direction = string;

const CARDINAL_OVERRIDES: Record<string, string> = {
  t: ",y,tl,tr",
  r: ",x,tr,br",
  b: ",y,br,bl",
  l: ",x,bl,tl",
  x: "",
  y: "",
  s: "",
  e: "",
  ss: ",e,s",
  se: ",e,s",
  es: ",e,s",
  ee: ",e,s",
};
const CARDINAL_DIRECTIONS =
  Object.keys(CARDINAL_OVERRIDES).join("|") + "|tl|tr|br|bl";

export function createCardinalHandler({ byType }: CardinalHandlerOptions = {}) {
  const cardinalHandler: Handler<
    Partial<Record<Direction, Partial<Record<"number" | "other", boolean>>>> & {
      _?: Partial<Record<"number" | "other", Set<string>>>;
    }
  > = (memory, { value, direction = "" }) => {
    const type = byType && isNumericValue(value) ? "number" : "other";
    const mem = (memory[direction] ??= {});

    // seen before
    if (mem[type]) return false;

    // apply override
    const memOverriders = ((memory._ ??= {})[type] ??= new Set());
    if (
      CARDINAL_OVERRIDES[direction]
        ?.split(",")
        .some((dir) => memOverriders.has(dir))
    )
      return false;

    // remember overrider
    memOverriders.add(direction);

    // never seen
    mem[type] = true;
    return true;
  };

  return cardinalHandler;
}

export type CardinalRuleOptions = {
  /**
   * Whether the direction is dash-separated (e.g. `border-t-2`)
   * @default true
   */
  dash?: boolean;
} & CardinalHandlerOptions;

export function cardinalRule(
  target: string,
  { dash = true, byType }: CardinalRuleOptions = {}
): Rule {
  const _target = `${target}(?:${
    dash ? "-" : ""
  }(?<direction>${CARDINAL_DIRECTIONS}))?`;
  const regExp = `^${CONTEXT_REGEXP}${_target}${VALUE_REGEXP}$`;
  return [regExp, createCardinalHandler({ byType })];
}

export function cardinalRules(targets: string, options?: CardinalRuleOptions) {
  const _targets = targets.split("|");
  return _targets.map((target) => cardinalRule(target, options));
}

// unique rule
// -----------

export function createUniqueHandler() {
  const uniqueValueHandler: Handler<{ seen: boolean }> = (memory) => {
    return memory.seen ? false : (memory.seen = true);
  };
  return uniqueValueHandler;
}

export type UniqueRuleOptions = { prefix?: string; def?: boolean };

export function uniqueRule(
  values: string,
  { prefix, def }: UniqueRuleOptions = {}
): Rule {
  const _prefix = prefix ? `${prefix}-` : "";
  const utility = `(${values})${TRAILING_SLASH_REGEXP}`;
  const body = def
    ? `(?:${prefix}|${_prefix}${utility})`
    : `${_prefix}${utility}`;
  const regExp = `^${CONTEXT_REGEXP}${body}$`;
  return [regExp, createUniqueHandler()];
}

export function uniqueRules(targets: string[], options?: UniqueRuleOptions) {
  return targets.map((target) => uniqueRule(target, options));
}

// arbitrary rule
// --------------

export function createArbitraryHandler() {
  const arbitraryHandler: Handler<Record<string, { done?: boolean }>> = (
    memory,
    { property }
  ) => {
    const mem = (memory[property!] ??= {});

    // seen before
    if (mem.done) return false;

    // never seen
    mem.done = true;
    return true;
  };

  return arbitraryHandler;
}

export function arbitraryRule(): Rule {
  return [
    `^${CONTEXT_REGEXP}\\[(?<property>.+?):(?<value>.*)\\]$`,
    createArbitraryHandler(),
  ];
}

// conflict rule
// -------------

export type ConflictRuleTargets = Record<string, string>;

export function createConflictHandler(targets: ConflictRuleTargets) {
  const overridableMap: Record<string, string[]> = {};
  Object.entries(targets).forEach(([overridingUtility, overridableUtilities]) =>
    overridableUtilities.split("|").forEach((value) => {
      overridableMap[value] ??= [];
      overridableMap[value]!.push(overridingUtility);
    })
  );

  const conflictHandler: Handler<Record<string, boolean>> = (
    memory,
    { utility }
  ) => {
    // is overridable utility and overriding utility has been seen
    const skipClass = Boolean(
      utility! in overridableMap &&
        overridableMap[utility!]!.some((u) => memory[u])
    );
    if (skipClass) return false;

    // is overriding utility
    if (utility! in targets) memory[utility!] = true;

    // continue evaluating other rules
    return "continue";
  };

  return conflictHandler;
}

export function conflictRule(targets: ConflictRuleTargets): Rule {
  const overridingUtilities = Object.keys(targets);
  const overridableUtilities = Object.values(targets).join("|").split("|");
  const matchingClasses = [...overridingUtilities, ...overridableUtilities];
  const utility = `(?<utility>${matchingClasses.join("|")})`;
  const regExp = `^${CONTEXT_REGEXP}${utility}${VALUE_REGEXP}$`;
  return [regExp, createConflictHandler(targets)];
}
