import { createMerge } from './lib/create-merge'
import { DEFAULT_TAILWIND_RULES } from './tailwind-rules'

export const twMerge = createMerge(DEFAULT_TAILWIND_RULES)
export { createMerge, DEFAULT_TAILWIND_RULES as DEFAULT_TAILWIND_CONFIG }
export {
    arbitraryRule,
    cardinalRule,
    cardinalRules,
    conflictRule,
    simpleRule,
    simpleRules,
    uniqueRule,
    uniqueRules,
} from './rules'
