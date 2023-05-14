import {
  RuleSet,
  uniqueRule,
  simpleRule,
  cardinalRules,
  cardinalRule,
  arbitraryRule,
  conflictRule,
} from "./rules";

const DISPLAY =
  "block|inline-block|inline-flex|inline-table|inline-grid|inline|flex|table-caption|table-cell|table-column-group|table-column|table-footer-group|table-header-group|table-row-group|table-row|table|flow-root|grid|contents|list-item|hidden";

const ISOLATION = "isolate|isolation-auto";

const OBJECT_FIT = "contain|cover|fill|none|scale-down";
const BG_AND_OBJECT_POSITION =
  "bottom|center|left|left-bottom|left-top|right|right-bottom|right-top|top";

const POSITION = "static|fixed|absolute|relative|sticky";

const VISIBILITY = "visible|invisible|collapse";

const FLEX_DIRECTION = "row|row-reverse|col|col-reverse";
const FLEX_WRAP = "wrap|wrap-reverse|nowrap";

const ALIGN_CONTENT =
  "normal|center|start|end|between|around|evenly|baseline|stretch";

const FONT_AND_SHADOW_SIZE =
  "xs|sm|base|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl|inner|none";
const FONT_SMOOTHING = "antialiased|subpixel-antialiased";
const FONT_STYLE = "italic|not-italic";
const FONT_WEIGHT =
  "thin|extralight|light|normal|medium|semibold|bold|extrabold|black";

const LIST_STYLE_POSITION = "inside|outside";

const TEXT_ALIGN = "left|center|right|justify|start|end";
const TEXT_DECORATION = "underline|overline|line-through|no-underline";
const TEXT_DECORATION_STYLE = "solid|double|dotted|dashed|wavy";
const TEXT_TRANSFORM = "uppercase|lowercase|capitalize|normal-case";
const TEXT_OVERFLOW = "truncate|text-ellipsis|text-clip";

const BG_ATTACHMENT = "fixed|local|scroll";
const BG_REPEAT =
  "repeat|no-repeat|repeat-x|repeat-y|repeat-round|repeat-space";
const BG_SIZE = "auto|cover|contain";

const BORDER_AND_OUTLINE_STYLE = "solid|dashed|dotted|double|hidden|none";

const FVN_FIGURE = "lining-nums|oldstyle-nums";
const FVN_SPACING = "proportional-nums|tabular-nums";
const FVN_FRACTION = "diagonal-fractions|stacked-fractions";

const SCROLL_BEHAVIOR = "auto|smooth";
const SCROLL_SNAP_ALIGN = "start|end|center|none";
const SCROLL_SNAP_STOP = "normal|always";
const SCROLL_SNAP_TYPE = "none|x|y|both|mandatory|proximity";

// TODO: text-<something>/20 should override line-height (leading)
// TODO: ^ same with opacities and other trailing slash values
// TODO: text-decoration-thickness (conflicts with text-decoration-color and there are custom values: auto and from-font)
export function tailwind(): RuleSet {
  return [
    // these rules are at the top because they need to run before others
    conflictRule({
      "inset-x": "left|right",
      "inset-y": "top|bottom",
      inset: "inset-x|inset-y|start|end|left|right|top|bottom",
      "sr-only": "not-sr-only",
      "not-sr-only": "sr-only",
      "normal-nums":
        "ordinal|slashed-zero|lining-nums|oldstyle-nums|proportional-nums|tabular-nums|diagonal-fractions|stacked-fractons",
      ordinal: "normal-nums",
      "slashed-zero": "normal-nums",
      "lining-nums": "normal-nums",
      "oldstyle-nums": "normal-nums",
      "proportional-nums": "normal-nums",
      "tabular-nums": "normal-nums",
      "diagonal-fractions": "normal-nums",
      "stacked-fractons": "normal-nums",
      "bg-gradient": "bg-none",
      "bg-none": "bg-gradient",
    }),
    uniqueRule([
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
      TEXT_OVERFLOW,
    ]),
    uniqueRule([
      ["content", ALIGN_CONTENT],
      ["list", LIST_STYLE_POSITION],
      ["decoration", TEXT_DECORATION_STYLE],
      ["border", BORDER_AND_OUTLINE_STYLE],
      ["divide", BORDER_AND_OUTLINE_STYLE],
      ["outline|outline", BORDER_AND_OUTLINE_STYLE],
      ["shadow", FONT_AND_SHADOW_SIZE],
      ["font", FONT_WEIGHT],
      ["object", OBJECT_FIT, BG_AND_OBJECT_POSITION],
    ]),
    uniqueRule([
      [
        "scroll",
        SCROLL_BEHAVIOR,
        SCROLL_SNAP_ALIGN,
        SCROLL_SNAP_STOP,
        SCROLL_SNAP_TYPE,
      ],
      ["bg", BG_ATTACHMENT, BG_AND_OBJECT_POSITION, BG_REPEAT, BG_SIZE],
      ["text", TEXT_ALIGN, FONT_AND_SHADOW_SIZE],
      ["flex", FLEX_DIRECTION, FLEX_WRAP],
    ]),
    conflictRule({ flex: "basis|grow|shrink" }),
    // -----------------------------------------------------------------
    simpleRule(
      "accent|align|animate|aspect|auto-cols|auto-rows|backdrop-blur|backdrop-brightness|backdrop-contrast|backdrop-grayscale|backdrop-hue-rotate|backdrop-invert|backdrop-opacity|backdrop-saturate|backdrop-sepia|basis|bg-blend|bg-clip|bg-origin|bg-none|bg-gradient|bg|blur|border-collapse|border-spacing|bottom|box-decoration|box|break-after|break-before|break-inside|break|brightness|caption|caret|clear|col-end|col-start|columns|col|content|contrast|cursor|decoration|delay|divide-x-reverse|divide-x|divide-y-reverse|divide-y|divide|drop-shadow|duration|ease|end|fill|flex|float|grayscale|grid-cols|grid-flow|grid-rows|grow|hue-rotate|hyphens|h|indent|invert|items|justify-items|justify-self|justify|leading|left|line-clamp|list-image|list|max-h|max-w|min-h|min-w|mix-blend|opacity|order|origin|outline-offset|place-content|place-items|place-self|pointer-events|resize|right|ring-inset|rotate|row-end|row-start|row|saturate|select|self|sepia|shadow|shrink|skew-x|skew-y|space-x-reverse|space-x|space-y-reverse|space-y|start|table|top|touch|tracking|transition|translate-x|translate-y|underline-offset|whitespace|will-change|w|z"
    ),
    simpleRule("text|outline|ring-offset|ring|from|via|to|stroke|font", {
      byType: true,
    }),
    cardinalRule("border", { byType: true }),
    ...cardinalRules("rounded|gap|inset|scale|overflow|overscroll"),
    ...cardinalRules("p|m|scroll-m|scroll-p", { dash: false }),
    arbitraryRule(),
  ];
}
