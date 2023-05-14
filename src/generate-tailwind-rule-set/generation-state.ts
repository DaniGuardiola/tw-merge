import { CONSTANTS, TOP_CONFLICT_RULE } from "./data";

export type GenerationState = {
  imports: (
    | "uniqueRule"
    | "simpleRule"
    | "cardinalRules"
    | "cardinalRule"
    | "arbitraryRule"
    | "uniqueRules"
    | "conflictRule"
  )[];
  constants: (keyof typeof CONSTANTS)[];
  topConflictRule: (keyof typeof TOP_CONFLICT_RULE)[];
  flexDirectionWrapUniqueRules: ("direction" | "wrap")[];
  flexBasisGrowShrinkConflictRule: ("basis" | "grow" | "shrink")[];
  textAlignSizeUniqueRules: ("align" | "size")[];
  bgUniqueRules: ("attachment" | "position" | "repeat" | "size")[];
  scrollUniqueRules: ("behavior" | "snap-align" | "snap-stop" | "snap-type")[];
  topUniqueRules: (
    | "DISPLAY"
    | "ISOLATION"
    | "POSITION"
    | "VISIBILITY"
    | "FONT_SMOOTHING"
    | "FONT_STYLE"
    | "FVN_FIGURE"
    | "FVN_SPACING"
    | "FVN_FRACTION"
    | "TEXT_DECORATION"
    | "TEXT_TRANSFORM"
    | "TEXT_OVERFLOW"
  )[];
  alignContentUniqueRule: boolean;
  listStylePositionUniqueRule: boolean;
  textDecorationStyleUniqueRule: boolean;
  borderStyleUniqueRule: boolean;
  divideStyleUniqueRule: boolean;
  outlineStyleUniqueRule: boolean;
  shadowUniqueRule: boolean;
  fontWeightUniqueRule: boolean;
  topSimpleRule: (
    | "accent"
    | "align"
    | "animate"
    | "aspect"
    | "auto-cols"
    | "auto-rows"
    | "backdrop-blur"
    | "backdrop-brightness"
    | "backdrop-contrast"
    | "backdrop-grayscale"
    | "backdrop-hue-rotate"
    | "backdrop-invert"
    | "backdrop-opacity"
    | "backdrop-saturate"
    | "backdrop-sepia"
    | "basis"
    | "bg-blend"
    | "bg-clip"
    | "bg-origin"
    | "bg-none"
    | "bg-gradient"
    | "bg"
    | "blur"
    | "border-collapse"
    | "border-spacing"
    | "bottom"
    | "box-decoration"
    | "box"
    | "break-after"
    | "break-before"
    | "break-inside"
    | "break"
    | "brightness"
    | "caption"
    | "caret"
    | "clear"
    | "col-end"
    | "col-start"
    | "columns"
    | "col"
    | "container"
    | "content"
    | "contrast"
    | "cursor"
    | "decoration"
    | "delay"
    | "divide-x-reverse"
    | "divide-x"
    | "divide-y-reverse"
    | "divide-y"
    | "divide"
    | "drop-shadow"
    | "duration"
    | "ease"
    | "end"
    | "fill"
    | "flex"
    | "float"
    | "grayscale"
    | "grid-cols"
    | "grid-flow"
    | "grid-rows"
    | "grow"
    | "hue-rotate"
    | "hyphens"
    | "h"
    | "indent"
    | "invert"
    | "items"
    | "justify-items"
    | "justify-self"
    | "justify"
    | "leading"
    | "left"
    | "line-clamp"
    | "list-image"
    | "list"
    | "max-h"
    | "max-w"
    | "min-h"
    | "min-w"
    | "mix-blend"
    | "opacity"
    | "order"
    | "origin"
    | "outline-offset"
    | "place-content"
    | "place-items"
    | "place-self"
    | "pointer-events"
    | "resize"
    | "right"
    | "ring-inset"
    | "rotate"
    | "row-end"
    | "row-start"
    | "row"
    | "saturate"
    | "select"
    | "self"
    | "sepia"
    | "shadow"
    | "shrink"
    | "skew-x"
    | "skew-y"
    | "space-x-reverse"
    | "space-x"
    | "space-y-reverse"
    | "space-y"
    | "start"
    | "table"
    | "top"
    | "touch"
    | "tracking"
    | "transition"
    | "translate-x"
    | "translate-y"
    | "underline-offset"
    | "whitespace"
    | "will-change"
    | "w"
    | "z"
  )[];
  topSimpleRuleByType: (
    | "text"
    | "outline"
    | "ring-offset"
    | "ring"
    | "from"
    | "via"
    | "to"
    | "stroke"
    | "font"
  )[];
  borderCardinalRule: boolean;
  xyCardinalRules: (
    | "rounded"
    | "gap"
    | "inset"
    | "scale"
    | "overflow"
    | "overscroll"
  )[];
  trblCardinalRules: ("p" | "m" | "scroll-m" | "scroll-p")[];
  objectFitPositionUniqueRules: ("fit" | "position")[];
  arbitraryRule: boolean;
};

export const EMPTY_GENERATION_STATE: GenerationState = {
  imports: [],
  constants: [],
  topConflictRule: [],
  flexDirectionWrapUniqueRules: [],
  flexBasisGrowShrinkConflictRule: [],
  textAlignSizeUniqueRules: [],
  bgUniqueRules: [],
  scrollUniqueRules: [],
  topUniqueRules: [],
  alignContentUniqueRule: false,
  listStylePositionUniqueRule: false,
  textDecorationStyleUniqueRule: false,
  borderStyleUniqueRule: false,
  divideStyleUniqueRule: false,
  outlineStyleUniqueRule: false,
  shadowUniqueRule: false,
  fontWeightUniqueRule: false,
  topSimpleRule: [],
  topSimpleRuleByType: [],
  borderCardinalRule: false,
  xyCardinalRules: [],
  trblCardinalRules: [],
  objectFitPositionUniqueRules: [],
  arbitraryRule: false,
};
