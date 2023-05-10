import { A } from 'ts-toolbelt'

import { UTILITIES_BY_CATEGORY } from './utilities-by-category'

export type GenerateTailwindRuleSetOptions = {
    importPath?: string
    emptySymbolImportPath?: string
    target?: 'file' | 'console'
    exportName?: string
}

export type CategoryRules<T extends string[]> =
    | boolean
    | ({ mode?: 'whitelist' | 'blacklist' } & { [K in T[number]]?: boolean })

export type TailwindRules = A.Compute<
    {
        mode?: 'whitelist' | 'blacklist'
    } & {
        -readonly [K in keyof typeof UTILITIES_BY_CATEGORY]?: CategoryRules<
            (typeof UTILITIES_BY_CATEGORY)[K][number][]
        >
    }
>

export type ResolvedRules = A.Compute<{
    -readonly [K in keyof typeof UTILITIES_BY_CATEGORY]: (typeof UTILITIES_BY_CATEGORY)[K][number][]
}>
