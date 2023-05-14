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
} from "./rules";

export const twMerge = createMerge(tailwind());
