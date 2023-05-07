import { Handler, RuleMemory, RuleSet } from '../rules'

import { createLruCache } from './create-lru-cache'
import { EMPTY } from './shared'
import { normalizeContext } from './utils'

type ParsedRule = [RegExp, Handler]
type ParsedRuleSet = ParsedRule[]

export type CreateMergeConfig = {
    cacheSize?: number
    separator?: string
    prefix?: string
}

export function createMerge(
    ruleSet: RuleSet,
    { cacheSize = 500, separator = ':', prefix }: CreateMergeConfig = {},
) {
    const cache = createLruCache<string, string>(cacheSize)

    const parsedRuleSet = ruleSet.map(
        ([regExp, handler]) =>
            [
                new RegExp(
                    regExp
                        .replace('%SEPARATOR%', separator)
                        .replace('%PREFIX%', prefix ? `${prefix}-` : ''),
                ),
                handler,
            ] as ParsedRule,
    )

    function merge(className: string) {
        const cached = cache.get(className)
        if (cached !== undefined) return cached

        const memoryStore: unknown[] = []

        const classes = className.split(' ')

        const outputClasses: string[] = []

        // - for each class from right to left
        for (let classI = classes.length - 1; classI >= 0; classI--) {
            const currentClass = classes[classI]!
            let didNotMatchOrWasContinued = true
            // - for each rule
            for (let ruleI = 0; ruleI < parsedRuleSet.length; ruleI++) {
                const rule = parsedRuleSet[ruleI]!
                const regexp = rule[0]
                const match = currentClass.match(regexp)

                // - if class matches rule, execute it
                if (match) {
                    didNotMatchOrWasContinued = false
                    const context = normalizeContext(match.groups?.context || EMPTY, separator)
                    const value = match.groups?.value || EMPTY
                    const handler = rule[1]

                    const memory = (memoryStore[ruleI] ??= {}) as RuleMemory
                    memory[context] ??= {}

                    const result = handler(memory, { context, value, match })
                    const keepClass = result === true
                    const continueToNextRule = result === 'continue'

                    if (keepClass) outputClasses.unshift(currentClass)

                    // - finish with the class unless the rule says so
                    if (!continueToNextRule) break

                    didNotMatchOrWasContinued = true
                }
            }

            if (didNotMatchOrWasContinued) outputClasses.unshift(currentClass)
        }

        return cache.set(className, outputClasses.join(' '))
    }

    return merge
}
