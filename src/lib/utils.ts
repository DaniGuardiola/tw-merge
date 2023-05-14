import { EMPTY, MatchValue } from "./shared";

export function isNumericValue(value: MatchValue) {
  if (value === EMPTY) return true;
  const arbitraryValue = value.match(/^\[(.*)\]$/)?.[1];
  return !isNaN(parseInt(arbitraryValue ?? value));
}

function sortContextSection(section: string[], separator: string) {
  return section
    .sort((a, b) => {
      if (a.startsWith("[") || b.startsWith("[")) return 0;
      return a.localeCompare(b);
    })
    .join(separator);
}

export function normalizeContext(
  context: string | typeof EMPTY,
  separator: string
) {
  if (context === EMPTY) return context;
  const important = context.endsWith("!");
  const variants = context.replace(/:!?$/, "").split(separator);
  let section: string[] = [];
  let normalizedSections: string[] = [];
  function commitSection() {
    if (section.length > 0)
      normalizedSections.push(sortContextSection(section, separator));
  }
  for (let i = 0; i < variants.length; i++) {
    const variant = variants[i]!;
    if (variant.startsWith("[")) {
      // is arbitrary variant
      commitSection();
      normalizedSections.push(variant);
      section = [];
    } else section.push(variant);
  }
  commitSection();

  return `${normalizedSections.join(separator)}${separator}${
    important ? "!" : ""
  }`;
}
