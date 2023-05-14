import { UTILITIES_BY_CATEGORY } from "./utilities-by-category";
import { processUtility } from "./process-utility";
import { generateFile } from "./gen-file";
import {
  GenerateTailwindRuleSetOptions,
  ResolvedRules,
  TailwindRules,
} from "./types";
import { GenerationState, EMPTY_GENERATION_STATE } from "./generation-state";

function resolveCategory(
  category: keyof Omit<TailwindRules, "mode">,
  config:
    | boolean
    | (Record<string, boolean> & { mode?: "whitelist" | "blacklist" }),
  defaultMode: "blacklist" | "whitelist"
): string[] {
  if (typeof config === "boolean") {
    if (config) return UTILITIES_BY_CATEGORY[category] as any;
    return [];
  }

  const { mode = defaultMode, ...utilities } = config;

  if (mode === "whitelist")
    return Object.entries(utilities)
      .map(([utility, enabled]) => {
        if (enabled) return utility;
        return false;
      })
      .filter(<T>(value: T | false): value is T => Boolean(value));

  const allUtilities: string[] = UTILITIES_BY_CATEGORY[category] as any;
  return allUtilities.filter((utility) => utilities[utility] !== false);
}

function resolveRules({
  mode = "blacklist",
  ...categories
}: TailwindRules): ResolvedRules {
  const baseResolvedRules: ResolvedRules = Object.fromEntries(
    Object.keys(UTILITIES_BY_CATEGORY).map((category) => [category, []])
  ) as any;

  if (mode === "whitelist")
    return {
      ...baseResolvedRules,
      ...Object.fromEntries(
        Object.entries(categories).map(([category, config]) => [
          category,
          resolveCategory(category as any, config as any, mode),
        ])
      ),
    };

  return {
    ...baseResolvedRules,
    ...Object.fromEntries(
      Object.entries(UTILITIES_BY_CATEGORY).map(([_category, utilities]) => {
        const category = _category as keyof typeof UTILITIES_BY_CATEGORY;
        if (categories[category] == null) return [category, utilities] as any;
        return [
          category,
          resolveCategory(category, categories[category] as any, mode),
        ];
      })
    ),
  };
}

function updateImports(state: GenerationState) {
  const importConditions: Record<
    GenerationState["imports"][number],
    unknown[]
  > = {
    uniqueRule: [
      state.alignContentUniqueRule,
      state.listStylePositionUniqueRule,
      state.textDecorationStyleUniqueRule,
      state.borderStyleUniqueRule,
      state.divideStyleUniqueRule,
      state.outlineStyleUniqueRule,
      state.shadowUniqueRule,
      state.fontWeightUniqueRule,
    ],
    uniqueRules: [
      state.flexDirectionWrapUniqueRules.length > 0,
      state.textAlignSizeUniqueRules.length > 0,
      state.bgUniqueRules.length > 0,
      state.scrollUniqueRules.length > 0,
      state.topUniqueRules.length > 0,
      state.objectFitPositionUniqueRules.length > 0,
    ],
    simpleRule: [
      state.topSimpleRule.length > 0,
      state.topSimpleRuleByType.length > 0,
    ],
    cardinalRules: [
      state.xyCardinalRules.length > 0,
      state.trblCardinalRules.length > 0,
    ],
    cardinalRule: [state.borderCardinalRule],
    arbitraryRule: [state.arbitraryRule],
    conflictRule: [
      state.topConflictRule.length > 0,
      state.flexBasisGrowShrinkConflictRule,
    ],
  };

  Object.entries(importConditions).forEach(([importName, conditions]) => {
    if (conditions.some(Boolean))
      state.imports.push(importName as GenerationState["imports"][number]);
  });
}

export function generateTailwindRuleSet(
  _rules: TailwindRules | "all",
  options: GenerateTailwindRuleSetOptions = {}
) {
  const rules = _rules === "all" ? {} : _rules;
  const { target = "console" } = options;
  const resolvedRules = resolveRules(rules);
  const state = EMPTY_GENERATION_STATE;

  Object.entries(resolvedRules).forEach(([_category, utilities]) => {
    const category = _category as keyof ResolvedRules;
    for (const utility of utilities) {
      processUtility(state, category, utility);
    }
  });

  updateImports(state);

  const file = generateFile(state, options);

  // eslint-disable-next-line no-console
  if (target === "console") console.log(file);
  // eslint-disable-next-line no-console
  else console.log("TODO");

  return file;
}
