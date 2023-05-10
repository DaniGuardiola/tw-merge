import { CONSTANTS, TOP_CONFLICT_RULE } from './data'
import { GenerationState } from './generation-state'
import { GenerateTailwindRuleSetOptions } from './types'

function shouldImportEmptySymbol(state: GenerationState) {
    const conditions = [
        state.borderCardinalRule,
        state.roundedCardinalRule,
        state.xyCardinalRules.length > 0,
        state.trblCardinalRules.length > 0,
    ]

    return conditions.some(Boolean)
}

function orderByPriority(_targets: string[]): string[] {
    const targets = [..._targets]
    let seenTargets = []
    let i = 0
    while (i < targets.length) {
        const target = targets[i] as string
        const seenIndex = seenTargets.findIndex((t) => target.startsWith(t))
        if (seenIndex >= 0) {
            const [t] = targets.splice(i, 1)
            targets.splice(seenIndex, 0, t as string)
            return orderByPriority(targets)
        }
        seenTargets.push(target)
        i++
        continue
    }
    return targets
}

function orderSimpleTargets(targets: string[]) {
    return orderByPriority(targets.sort())
}

function objectFitPositionToConstantName(value: string) {
    return {
        fit: 'OBJECT_FIT',
        position: 'BG_AND_OBJECT_POSITION',
    }[value]
}

export function generateFile(
    state: GenerationState,
    {
        importPath = 'merge-utility',
        emptySymbolImportPath = importPath,
        exportName = 'tailwindRuleSet',
    }: GenerateTailwindRuleSetOptions,
) {
    let file = ''

    // imports
    file += 'import {\n  RuleSet,\n  '
    file += state.imports.join(',\n  ')
    file += `\n} from '${importPath}'\n`
    if (shouldImportEmptySymbol(state)) file += `import { EMPTY } from '${emptySymbolImportPath}'\n`

    // constants
    state.constants.forEach((constant) => {
        file += `\nconst ${constant} = "${CONSTANTS[constant]}"`
    })
    if (state.constants.length > 0) file += '\n'

    // header
    file += `\nexport const ${exportName}: RuleSet = [`

    // top conflict rules
    if (state.topConflictRule.length > 0) {
        file += `\n  conflictRule({\n`
        state.topConflictRule.forEach((rule) => {
            file += `    '${rule}': '${TOP_CONFLICT_RULE[rule]}',\n`
        })
        file += `  }),`
    }

    // flex direction wrap unique rules
    // TODO

    // flex basis grow shrink conflict rule
    // TODO

    // text align size unique rules
    // TODO

    // bg unique rules
    // TODO

    // scroll unique rules
    // TODO

    // top unique rules
    if (state.topUniqueRules.length > 0) {
        file += '\n  ...uniqueRules(['
        state.topUniqueRules.forEach((rule) => {
            file += `\n    ${rule},`
        })
        file += '\n  ]),'
    }

    // align content unique rule
    // TODO

    // list style position unique rule
    // TODO

    // text decoration style unique rule
    // TODO

    // border style unique rule
    // TODO

    // divide style unique rule
    // TODO

    // outline style unique rule
    // TODO

    // shadow unique rule
    // TODO

    // font weight unique rule
    // TODO

    // top simple rule
    if (state.topSimpleRule.length > 0) {
        file += '\n  simpleRule('
        const targets = orderSimpleTargets(state.topSimpleRule)
        file += `\n    '${targets.join('|')}'`
        file += '\n  ),'
    }

    // top simple rule by type
    if (state.topSimpleRuleByType.length > 0) {
        file += '\n  simpleRule('
        const targets = orderSimpleTargets(state.topSimpleRuleByType)
        file += `\n    '${targets.join('|')}'`
        file += '\n  ),'
    }

    // border cardinal rule
    // TODO

    // rounded cardinal rule
    // TODO

    // xy cardinal rules
    if (state.xyCardinalRules.length > 0) {
        file += `\n  ...cardinalRules('${state.xyCardinalRules.join('|')}', {`
        file += "\n    dir: 'x|y',"
        file += '\n    overrides: { x: [EMPTY], y: [EMPTY] },'
        file += '\n  }),'
    }

    // trbl cardinal rules
    // TODO

    // object fit position unique rules
    if (state.objectFitPositionUniqueRules.length > 0) {
        file += `\n  ...uniqueRules([${state.objectFitPositionUniqueRules
            .map(objectFitPositionToConstantName)
            .join(', ')}], { prefix: 'object' }),`
    }

    // arbitrary rule
    if (state.arbitraryRule) file += '\n  arbitraryRule(),'

    // footer
    file += '\n]\n'

    return file
}
