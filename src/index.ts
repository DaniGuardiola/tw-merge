import { createMerge } from './lib/create-merge'
import { tailwind } from './tailwind'

export { createMerge, tailwind }
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

export const twMerge = createMerge(tailwind())
