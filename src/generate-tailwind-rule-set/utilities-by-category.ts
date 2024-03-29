export const UTILITIES_BY_CATEGORY = {
  other: ["arbitrary"],
  layout: [
    "aspectRatio",
    "container",
    "columns",
    "breakAfter",
    "breakBefore",
    "breakInside",
    "boxDecorationBreak",
    "boxSizing",
    "display",
    "floats",
    "clear",
    "isolation",
    "objectFit",
    "objectPosition",
    "overflow",
    "overscrollBehavior",
    "position",
    "topRightBottomLeft",
    "visibility",
    "zIndex",
  ],
  flexboxAndGrid: [
    "flexBasis",
    "flexDirection",
    "flexWrap",
    "flex",
    "flexGrow",
    "flexShrink",
    "order",
    "gridTemplateColumns",
    "gridColumnStartEnd",
    "gridTemplateRows",
    "gridRowStartEnd",
    "gridAutoFlow",
    "gridAutoColumns",
    "gridAutoRows",
    "gap",
    "justifyContent",
    "justifyItems",
    "justifySelf",
    "alignContent",
    "alignItems",
    "alignSelf",
    "placeContent",
    "placeItems",
    "placeSelf",
  ],
  spacing: ["padding", "margin", "spaceBetween"],
  sizing: ["width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight"],
  typography: [
    "fontFamily",
    "fontSize",
    "fontSmoothing",
    "fontStyle",
    "fontWeight",
    "fontVariantNumeric",
    "letterSpacing",
    "lineClamp",
    "lineHeight",
    "listStyleImage",
    "listStylePosition",
    "listStyleType",
    "textAlign",
    "textColor",
    "textDecoration",
    "textDecorationColor",
    "textDecorationStyle",
    "textDecorationThickness",
    "textUnderlineOffset",
    "textTransform",
    "textOverflow",
    "textIndent",
    "verticalAlign",
    "whitespace",
    "wordBreak",
    "hyphens",
    "content",
  ],
  backgrounds: [
    "backgroundAttachment",
    "backgroundClip",
    "backgroundColor",
    "backgroundOrigin",
    "backgroundPosition",
    "backgroundRepeat",
    "backgroundSize",
    "backgroundImage",
    "gradientColorStops",
  ],
  borders: [
    "borderRadius",
    "borderWidth",
    "borderColor",
    "borderStyle",
    "divideWidth",
    "divideColor",
    "divideStyle",
    "outlineWidth",
    "outlineColor",
    "outlineStyle",
    "outlineOffset",
    "ringWidth",
    "ringColor",
    "ringOffsetWidth",
    "ringOffsetColor",
  ],
  effects: [
    "boxShadow",
    "boxShadowColor",
    "opacity",
    "mixBlendMode",
    "backgroundBlendMode",
  ],
  filters: [
    "blur",
    "brightness",
    "contrast",
    "dropShadow",
    "grayscale",
    "hueRotate",
    "invert",
    "saturate",
    "sepia",
    "backdropBlur",
    "backdropBrightness",
    "backdropContrast",
    "backdropGrayscale",
    "backdropHueRotate",
    "backdropInvert",
    "backdropOpacity",
    "backdropSaturate",
    "backdropSepia",
  ],
  tables: ["borderCollapse", "borderSpacing", "tableLayout", "captionSide"],
  transitionsAndAnimations: [
    "transitionProperty",
    "transitionDuration",
    "transitionTimingFunction",
    "transitionDelay",
    "animation",
  ],
  transforms: ["scale", "rotate", "translate", "skew", "transformOrigin"],
  interactivity: [
    "accentColor",
    "appearance",
    "cursor",
    "caretColor",
    "pointerEvents",
    "resize",
    "scrollBehavior",
    "scrollMargin",
    "scrollPadding",
    "scrollSnapAlign",
    "scrollSnapStop",
    "scrollSnapType",
    "touchAction",
    "userSelect",
    "willChange",
  ],
  svg: ["fill", "stroke", "strokeWidth"],
  accessibility: ["screenReaders"],
} as const;
