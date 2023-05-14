import { GenerationState } from "./generation-state";
import { ResolvedRules } from "./types";

export function processUtility<U extends string>(
  state: GenerationState,
  category: keyof ResolvedRules,
  _utility: U
) {
  switch (category) {
    case "other": {
      const utility = _utility as ResolvedRules["other"][number];

      switch (utility) {
        case "arbitrary":
          state.arbitraryRule = true;
          break;
      }
      break;
    }

    case "layout": {
      const utility = _utility as ResolvedRules["layout"][number];

      switch (utility) {
        case "aspectRatio":
          state.topSimpleRule.push("aspect");
          break;

        case "container":
          state.topSimpleRule.push("container");
          break;

        case "columns":
          state.topSimpleRule.push("columns");
          break;

        case "breakAfter":
          state.topSimpleRule.push("break-after");
          break;

        case "breakBefore":
          state.topSimpleRule.push("break-before");
          break;

        case "breakInside":
          state.topSimpleRule.push("break-inside");
          break;

        case "boxDecorationBreak":
          state.topSimpleRule.push("box-decoration");
          break;

        case "boxSizing":
          state.topSimpleRule.push("box");
          break;

        case "display":
          state.constants.push("DISPLAY");
          state.topUniqueRules.push("DISPLAY");
          break;

        case "floats":
          state.topSimpleRule.push("float");
          break;

        case "clear":
          state.topSimpleRule.push("clear");
          break;

        case "isolation":
          state.constants.push("ISOLATION");
          state.topUniqueRules.push("ISOLATION");
          break;

        case "objectFit":
          state.constants.push("OBJECT_FIT");
          state.objectFitPositionUniqueRules.push("fit");
          break;

        case "objectPosition":
          state.constants.push("BG_AND_OBJECT_POSITION");
          state.objectFitPositionUniqueRules.push("position");
          break;

        case "overflow":
          state.xyCardinalRules.push("overflow");
          break;

        case "overscrollBehavior":
          state.xyCardinalRules.push("overscroll");
          break;

        case "position":
          state.constants.push("POSITION");
          state.topUniqueRules.push("POSITION");
          break;

        case "topRightBottomLeft":
          state.topConflictRule.push("inset-x");
          state.topConflictRule.push("inset-y");
          state.topConflictRule.push("inset");
          state.xyCardinalRules.push("inset");
          state.topSimpleRule.push(
            "top",
            "left",
            "bottom",
            "right",
            "start",
            "end"
          );
          break;

        case "visibility":
          state.constants.push("VISIBILITY");
          state.topUniqueRules.push("VISIBILITY");
          break;

        case "zIndex":
          state.topSimpleRule.push("z");
          break;
      }

      break;
    }

    case "flexboxAndGrid": {
      const utility = _utility as ResolvedRules["flexboxAndGrid"][number];

      switch (utility) {
        case "flexBasis":
          state.topSimpleRule.push("basis");
          state.flexBasisGrowShrinkConflictRule.push("basis");
          break;

        case "flexDirection":
          state.constants.push("FLEX_DIRECTION");
          state.flexDirectionWrapUniqueRules.push("direction");
          break;

        case "flexWrap":
          state.constants.push("FLEX_WRAP");
          state.flexDirectionWrapUniqueRules.push("wrap");
          break;

        case "flex":
          state.topSimpleRule.push("flex");
          break;

        case "flexGrow":
          state.topSimpleRule.push("grow");
          state.flexBasisGrowShrinkConflictRule.push("grow");
          break;

        case "flexShrink":
          state.topSimpleRule.push("shrink");
          state.flexBasisGrowShrinkConflictRule.push("shrink");
          break;

        case "order":
          state.topSimpleRule.push("order");
          break;

        case "gridTemplateColumns":
          state.topSimpleRule.push("grid-cols");
          break;

        case "gridColumnStartEnd":
          state.topSimpleRule.push("col-start");
          state.topSimpleRule.push("col-end");
          state.topSimpleRule.push("col");
          break;

        case "gridTemplateRows":
          state.topSimpleRule.push("grid-rows");
          break;

        case "gridRowStartEnd":
          state.topSimpleRule.push("row-start");
          state.topSimpleRule.push("row-end");
          state.topSimpleRule.push("row");
          break;

        case "gridAutoFlow":
          state.topSimpleRule.push("grid-flow");
          break;

        case "gridAutoColumns":
          state.topSimpleRule.push("auto-cols");
          break;

        case "gridAutoRows":
          state.topSimpleRule.push("auto-rows");
          break;

        case "gap":
          state.xyCardinalRules.push("gap");
          break;

        case "justifyContent":
          state.topSimpleRule.push("justify");
          break;

        case "justifyItems":
          state.topSimpleRule.push("justify-items");
          break;

        case "justifySelf":
          state.topSimpleRule.push("justify-self");
          break;

        case "alignContent":
          state.constants.push("ALIGN_CONTENT");
          state.alignContentUniqueRule = true;
          break;

        case "alignItems":
          state.topSimpleRule.push("items");
          break;

        case "alignSelf":
          state.topSimpleRule.push("self");
          break;

        case "placeContent":
          state.topSimpleRule.push("place-content");
          break;

        case "placeItems":
          state.topSimpleRule.push("place-items");
          break;

        case "placeSelf":
          state.topSimpleRule.push("place-self");
          break;
      }

      break;
    }

    case "spacing": {
      const utility = _utility as ResolvedRules["spacing"][number];

      switch (utility) {
        case "padding":
          state.trblCardinalRules.push("p");
          break;

        case "margin":
          state.trblCardinalRules.push("m");
          break;

        case "spaceBetween":
          state.topSimpleRule.push("space-x-reverse");
          state.topSimpleRule.push("space-x");
          state.topSimpleRule.push("space-y-reverse");
          state.topSimpleRule.push("space-y");
          break;
      }

      break;
    }

    case "sizing": {
      const utility = _utility as ResolvedRules["sizing"][number];

      switch (utility) {
        default:
        // TODO
      }

      break;
    }

    case "typography": {
      const utility = _utility as ResolvedRules["typography"][number];

      switch (utility) {
        default:
        // TODO
      }

      break;
    }

    case "backgrounds": {
      const utility = _utility as ResolvedRules["backgrounds"][number];

      switch (utility) {
        default:
        // TODO
      }

      break;
    }

    case "borders": {
      const utility = _utility as ResolvedRules["borders"][number];

      switch (utility) {
        default:
        // TODO
      }

      break;
    }

    case "effects": {
      const utility = _utility as ResolvedRules["effects"][number];

      switch (utility) {
        default:
        // TODO
      }

      break;
    }

    case "filters": {
      const utility = _utility as ResolvedRules["filters"][number];

      switch (utility) {
        default:
        // TODO
      }

      break;
    }

    case "tables": {
      const utility = _utility as ResolvedRules["tables"][number];

      switch (utility) {
        default:
        // TODO
      }

      break;
    }

    case "transitionsAndAnimations": {
      const utility =
        _utility as ResolvedRules["transitionsAndAnimations"][number];

      switch (utility) {
        default:
        // TODO
      }

      break;
    }

    case "transforms": {
      const utility = _utility as ResolvedRules["transforms"][number];

      switch (utility) {
        default:
        // TODO
      }

      break;
    }

    case "interactivity": {
      const utility = _utility as ResolvedRules["interactivity"][number];

      switch (utility) {
        default:
        // TODO
      }

      break;
    }

    case "svg": {
      const utility = _utility as ResolvedRules["svg"][number];

      switch (utility) {
        default:
        // TODO
      }

      break;
    }

    case "accessibility": {
      const utility = _utility as ResolvedRules["accessibility"][number];

      switch (utility) {
        default:
        // TODO
      }

      break;
    }
  }
}
