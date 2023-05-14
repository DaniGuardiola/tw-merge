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
        default:
        // TODO
      }

      break;
    }

    case "spacing": {
      const utility = _utility as ResolvedRules["spacing"][number];

      switch (utility) {
        default:
        // TODO
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
