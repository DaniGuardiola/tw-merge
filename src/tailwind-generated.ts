import {
    RuleSet,
    uniqueRules,
    simpleRule,
    cardinalRules,
    arbitraryRule,
    conflictRule,
} from './rules'
import { EMPTY } from './lib/shared'

const DISPLAY =
    'block|inline-block|inline-flex|inline-table|inline-grid|inline|flex|table-caption|table-cell|table-column-group|table-column|table-footer-group|table-header-group|table-row-group|table-row|table|flow-root|grid|contents|list-item|hidden'
const ISOLATION = 'isolate|isolation-auto'
const OBJECT_FIT = 'contain|cover|fill|none|scale-down'
const BG_AND_OBJECT_POSITION =
    'bottom|center|left|left-bottom|left-top|right|right-bottom|right-top|top'
const POSITION = 'static|fixed|absolute|relative|sticky'
const VISIBILITY = 'visible|invisible|collapse'

export const tailwindRuleSet: RuleSet = [
    conflictRule({
        'inset-x': 'left|right',
        'inset-y': 'top|bottom',
        inset: 'inset-x|inset-y|start|end|left|right|top|bottom',
    }),
    ...uniqueRules([DISPLAY, ISOLATION, POSITION, VISIBILITY]),
    simpleRule(
        'aspect|bottom|box-decoration|box|break-after|break-before|break-inside|clear|columns|container|end|float|left|right|start|top|z',
    ),
    ...cardinalRules('overflow|overscroll|inset', {
        dir: 'x|y',
        overrides: { x: [EMPTY], y: [EMPTY] },
    }),
    ...uniqueRules([OBJECT_FIT, BG_AND_OBJECT_POSITION], { prefix: 'object' }),
    arbitraryRule(),
]
