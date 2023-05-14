import { createMerge } from "./lib/create-merge";
import { tailwind } from "./tailwind";

export { createMerge, tailwind };
export {
  arbitraryRule,
  cardinalRule,
  cardinalRules,
  conflictRule,
  simpleRule,
  uniqueRule,
  uniqueRules,
} from "./rules";

export const twMerge = createMerge(tailwind());
