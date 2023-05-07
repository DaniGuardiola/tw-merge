import { RuleMemory, RuleSet } from '../rules'

import { EMPTY } from './shared'
import { normalizeContext } from './utils'

export function createMerge(config: RuleSet) {
    function merge(className: string) {
        const memoryStore: unknown[] = []

        const classes = className.split(' ')

        const outputClasses: string[] = []

        for (let classI = classes.length - 1; classI >= 0; classI--) {
            // - for each class from right to left
            const currentClass = classes[classI]!

            let didNotMatchOrWasContinued = true
            for (let ruleI = 0; ruleI < config.length; ruleI++) {
                // - for each rule
                const rule = config[ruleI]!
                const regexp = rule[0]
                const match = currentClass.match(regexp)

                if (match) {
                    // - if class matches rule, execute it
                    didNotMatchOrWasContinued = false
                    const context = normalizeContext(match.groups?.context || EMPTY)
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

        return outputClasses.join(' ')
    }

    return merge
}
