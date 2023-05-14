export const CONSTANTS = {
  DISPLAY:
    "block|inline-block|inline-flex|inline-table|inline-grid|inline|flex|table-caption|table-cell|table-column-group|table-column|table-footer-group|table-header-group|table-row-group|table-row|table|flow-root|grid|contents|list-item|hidden",
  ISOLATION: "isolate|isolation-auto",
  OBJECT_FIT: "contain|cover|fill|none|scale-down",
  BG_AND_OBJECT_POSITION:
    "bottom|center|left|left-bottom|left-top|right|right-bottom|right-top|top",
  POSITION: "static|fixed|absolute|relative|sticky",
  VISIBILITY: "visible|invisible|collapse",
  FLEX_DIRECTION: "row|row-reverse|col|col-reverse",
  FLEX_WRAP: "wrap|wrap-reverse|nowrap",
  ALIGN_CONTENT:
    "normal|center|start|end|between|around|evenly|baseline|stretch",
  FONT_AND_SHADOW_SIZE:
    "xs|sm|base|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl|inner|none",
  FONT_SMOOTHING: "antialiased|subpixel-antialiased",
  FONT_STYLE: "italic|not-italic",
  FONT_WEIGHT:
    "thin|extralight|light|normal|medium|semibold|bold|extrabold|black",
  LIST_STYLE_POSITION: "inside|outside",
  TEXT_ALIGN: "left|center|right|justify|start|end",
  TEXT_DECORATION: "underline|overline|line-through|no-underline",
  TEXT_DECORATION_STYLE: "solid|double|dotted|dashed|wavy",
  TEXT_TRANSFORM: "uppercase|lowercase|capitalize|normal-case",
  TEXT_OVERFLOW: "truncate|text-ellipsis|text-clip",
  BG_ATTACHMENT: "fixed|local|scroll",
  BG_REPEAT: "repeat|no-repeat|repeat-x|repeat-y|repeat-round|repeat-space",
  BG_SIZE: "auto|cover|contain",
  BORDER_AND_OUTLINE_STYLE: "solid|dashed|dotted|double|hidden|none",
  FVN_FIGURE: "lining-nums|oldstyle-nums",
  FVN_SPACING: "proportional-nums|tabular-nums",
  FVN_FRACTION: "diagonal-fractions|stacked-fractions",
  SCROLL_BEHAVIOR: "auto|smooth",
  SCROLL_SNAP_ALIGN: "start|end|center|none",
  SCROLL_SNAP_STOP: "normal|always",
  SCROLL_SNAP_TYPE: "none|x|y|both|mandatory|proximity",
} as const;

export const TOP_CONFLICT_RULE = {
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
} as const;
