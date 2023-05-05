import { createMerge } from './lib/merge'
import { DEFAULT_TAILWIND_CONFIG } from './lib/tailwind-config'

export const twMerge = createMerge(DEFAULT_TAILWIND_CONFIG)
export { createMerge, DEFAULT_TAILWIND_CONFIG }
