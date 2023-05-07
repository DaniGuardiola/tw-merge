import {
    RuleSet,
    uniqueRule,
    simpleRules,
    cardinalRules,
    cardinalRule,
    arbitraryRule,
    uniqueRules,
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

const FLEX_DIRECTION = 'row|row-reverse|col|col-reverse'
const FLEX_WRAP = 'wrap|wrap-reverse|nowrap'

const ALIGN_CONTENT = 'normal|center|start|end|between|around|evenly|baseline|stretch'

const FONT_AND_SHADOW_SIZE = 'xs|sm|base|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl|inner|none'
const FONT_SMOOTHING = 'antialiased|subpixel-antialiased'
const FONT_STYLE = 'italic|not-italic'
const FONT_WEIGHT = 'thin|extralight|light|normal|medium|semibold|bold|extrabold|black'

const LIST_STYLE_POSITION = 'inside|outside'

const TEXT_ALIGN = 'left|center|right|justify|start|end'
const TEXT_DECORATION = 'underline|overline|line-through|no-underline'
const TEXT_DECORATION_STYLE = 'solid|double|dotted|dashed|wavy'
const TEXT_TRANSFORM = 'uppercase|lowercase|capitalize|normal-case'
const TEXT_OVERFLOW = 'truncate|text-ellipsis|text-clip'

const BG_ATTACHMENT = 'fixed|local|scroll'
const BG_REPEAT = 'repeat|no-repeat|repeat-x|repeat-y|repeat-round|repeat-space'
const BG_SIZE = 'auto|cover|contain'

const BORDER_AND_OUTLINE_STYLE = 'solid|dashed|dotted|double|hidden|none'

const FVN_FIGURE = 'lining-nums|oldstyle-nums'
const FVN_SPACING = 'proportional-nums|tabular-nums'
const FVN_FRACTION = 'diagonal-fractions|stacked-fractions'

const SCROLL_BEHAVIOR = 'auto|smooth'
const SCROLL_SNAP_ALIGN = 'start|end|center|none'
const SCROLL_SNAP_STOP = 'normal|always'
const SCROLL_SNAP_TYPE = 'none|x|y|both|mandatory|proximity'

// TODO: font-family
// TODO: font-variant-numeric seems tricky with overrides
// TODO: text-<something>/20 should override line-height (leading)
// TODO: text-decoration-thickness (conflicts with text-decoration-color)
// TODO: background-image
// TODO: outline style supports no value
export function tailwind(): RuleSet {
    return [
        // these rules are at the top because they need to run before others
        conflictRule({
            'inset-x': 'left|right',
            'inset-y': 'top|bottom',
            inset: 'inset-x|inset-y|start|end|left|right|top|bottom',
            'sr-only': 'not-sr-only',
            'not-sr-only': 'sr-only',
            'normal-nums':
                'ordinal|slashed-zero|lining-nums|oldstyle-nums|proportional-nums|tabular-nums|diagonal-fractions|stacked-fractons',
            ordinal: 'normal-nums',
            'slashed-zero': 'normal-nums',
            'lining-nums': 'normal-nums',
            'oldstyle-nums': 'normal-nums',
            'proportional-nums': 'normal-nums',
            'tabular-nums': 'normal-nums',
            'diagonal-fractions': 'normal-nums',
            'stacked-fractons': 'normal-nums',
        }),
        ...uniqueRules([FLEX_DIRECTION, FLEX_WRAP], { prefix: 'flex' }),
        conflictRule({ flex: 'basis|grow|shrink' }),
        uniqueRule(ALIGN_CONTENT, { prefix: 'content' }),
        uniqueRule(LIST_STYLE_POSITION, { prefix: 'list' }),
        uniqueRule(TEXT_ALIGN, { prefix: 'text' }),
        uniqueRule(TEXT_DECORATION_STYLE, { prefix: 'decoration' }),
        uniqueRule(TEXT_OVERFLOW),
        ...uniqueRules([BG_ATTACHMENT, BG_AND_OBJECT_POSITION, BG_REPEAT, BG_SIZE], {
            prefix: 'bg',
        }),
        uniqueRule(BORDER_AND_OUTLINE_STYLE, { prefix: 'border' }),
        uniqueRule(BORDER_AND_OUTLINE_STYLE, { prefix: 'divide' }),
        uniqueRule(BORDER_AND_OUTLINE_STYLE, { prefix: 'outline' }),
        uniqueRule(FONT_AND_SHADOW_SIZE, { prefix: 'shadow' }),
        ...uniqueRules([SCROLL_BEHAVIOR, SCROLL_SNAP_ALIGN, SCROLL_SNAP_STOP, SCROLL_SNAP_TYPE], {
            prefix: 'scroll',
        }),
        // these rules are ordered as in the Tailwind docs (more or less)
        ...simpleRules(
            'aspect|columns|break-after|break-before|break-inside|break|box-decoration|box|float|clear|start|end|top|right|bottom|left|z|basis|flex|order|grid-cols|col-start|col-end|col|grid-rows|row-start|row-end|row|grid-flow|auto-cols|auto-rows|justify-items|justify-self|justify|items|self|place-content|place-items|place-self|space-x-reverse|space-y-reverse|space-x|space-y|w|min-w|max-w|h|min-h|max-h|tracking|line-clamp|leading|list-image-none|list|underline-offset|indent|align|whitespace|hyphens|content|bg-clip|bg-origin|bg-blend|bg|divide-x-reverse|divide-y-reverse|divide-x|divide-y|outline-offset|ring-inset|shadow|opacity|mix-blend|brightness|contrast|hue-rotate|saturate|backdrop-brightness|backdrop-contrast|backdrop-hue-rotate|border-collapse|border-spacing|table|caption|duration|ease|delay|animate|rotate|translate-x|translate-y|skew-x|skew-y|origin|accent|cursor|caret|pointer-events|touch|select|will-change|fill',
        ),
        ...uniqueRules([
            DISPLAY,
            ISOLATION,
            POSITION,
            VISIBILITY,
            FONT_SMOOTHING,
            FONT_STYLE,
            FVN_FIGURE,
            FVN_SPACING,
            FVN_FRACTION,
            TEXT_DECORATION,
            TEXT_TRANSFORM,
        ]),
        uniqueRule(OBJECT_FIT, { prefix: 'object' }),
        uniqueRule(BG_AND_OBJECT_POSITION, { prefix: 'object' }),
        ...cardinalRules('overflow|overscroll', {
            dir: 'x|y',
            overrides: { x: [EMPTY], y: [EMPTY] },
            dash: true,
        }),
        cardinalRule('inset', {
            dir: 'x|y',
            overrides: {
                x: [EMPTY],
                y: [EMPTY],
            },
            dash: true,
        }),
        ...simpleRules(
            'grow|shrink|blur|drop-shadow|grayscale|invert|sepia|backdrop-blur|backdrop-grayscale|backdrop-invert|backdrop-opacity|backdrop-saturate|backdrop-sepia|transition|resize',
            { def: true },
        ),
        ...cardinalRules('gap|scale', {
            dir: 'x|y',
            overrides: {
                x: [EMPTY],
                y: [EMPTY],
            },
            dash: true,
        }),
        ...cardinalRules('p|m|scroll-m|scroll-p', {
            dir: 't|r|b|l|x|y|s|e',
            overrides: {
                t: [EMPTY, 'y'],
                r: [EMPTY, 'x'],
                b: [EMPTY, 'y'],
                l: [EMPTY, 'x'],
                x: [EMPTY],
                y: [EMPTY],
                s: [EMPTY, 'x'],
                e: [EMPTY, 'x'],
            },
        }),
        uniqueRule(FONT_AND_SHADOW_SIZE, { prefix: 'text', slash: true }),
        uniqueRule(FONT_WEIGHT, { prefix: 'font' }),
        ...simpleRules('text|outline|ring-offset|ring|from|via|to|stroke', {
            byType: true,
            slash: true,
        }),
        ...simpleRules('decoration|divide', { slash: true }),
        cardinalRule('rounded', {
            dir: 't|r|b|l|tl|tr|br|bl|s|e|ss|se|es|ee',
            overrides: {
                t: [EMPTY, 'tl', 'tr'],
                r: [EMPTY, 'tr', 'br'],
                b: [EMPTY, 'br', 'bl'],
                l: [EMPTY, 'bl', 'tl'],
                ss: [EMPTY, 'e', 's'],
                se: [EMPTY, 'e', 's'],
                es: [EMPTY, 'e', 's'],
                ee: [EMPTY, 'e', 's'],
            },
            dash: true,
            def: true,
        }),
        cardinalRule('border', {
            dir: 't|r|b|l|x|y|s|e',
            overrides: {
                t: [EMPTY, 'y'],
                r: [EMPTY, 'x'],
                b: [EMPTY, 'y'],
                l: [EMPTY, 'x'],
                x: [EMPTY],
                y: [EMPTY],
                s: [EMPTY],
                e: [EMPTY],
            },
            dash: true,
            def: true,
            byType: true,
            slash: true,
        }),
        arbitraryRule(),
    ]
}
