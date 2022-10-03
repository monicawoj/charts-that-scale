import { useData } from "../../hooks/useData";
import ChartContainer from "../ChartContainer";
import { DimensionsProvider } from "../../hooks/useDimensions";
import { CHART_MARGIN, CHART_HEIGHT } from "../../constants";

const Chart = ({ version = "pixi-with-tooltip-and-brush" }) => {
  const { data } = useData();

  const versionProps = {
    "static-svg": {
      isSVGShown: true,
      isSVGDataShown: true,
      isSVGAnimated: false,
      isPixiDataShown: false,
      isPixiAnimated: false,
      isPixiTooltipEnabled: false,
      isBrushEnabled: false,
    },
    "pure-svg": {
      isSVGShown: true,
      isSVGDataShown: true,
      isSVGAnimated: true,
      isPixiDataShown: false,
      isPixiAnimated: false,
      isPixiTooltipEnabled: false,
      isBrushEnabled: false,
    },
    "static-pixi-no-svg": {
      isSVGShown: false,
      isSVGDataShown: false,
      isSVGAnimated: false,
      isPixiDataShown: true,
      isPixiAnimated: false,
      isPixiTooltipEnabled: false,
      isBrushEnabled: false,
    },
    "pure-svg-overlay": {
      isSVGShown: true,
      isSVGDataShown: false,
      isSVGAnimated: false,
      isPixiDataShown: false,
      isPixiAnimated: false,
      isPixiTooltipEnabled: false,
      isBrushEnabled: false,
    },
    "static-pixi-with-svg": {
      isSVGShown: true,
      isSVGDataShown: false,
      isSVGAnimated: false,
      isPixiDataShown: true,
      isPixiAnimated: false,
      isPixiTooltipEnabled: false,
      isBrushEnabled: false,
    },
    "animated-react-pixi-with-svg": {
      isSVGShown: true,
      isSVGDataShown: false,
      isSVGAnimated: false,
      isPixiDataShown: true,
      isPixiAnimated: true,
      isPixiTooltipEnabled: false,
      isBrushEnabled: false,
    },
    "animated-pixi-with-svg": {
      isSVGShown: true,
      isSVGDataShown: false,
      isSVGAnimated: false,
      isPixiDataShown: true,
      isPixiAnimated: true,
      isPixiTooltipEnabled: false,
      isBrushEnabled: false,
      isPurePixiWithSprites: true,
    },
    "animated-pixi-with-tooltip": {
      isSVGShown: true,
      isSVGDataShown: false,
      isSVGAnimated: false,
      isPixiDataShown: true,
      isPixiAnimated: true,
      isPixiTooltipEnabled: true,
      isBrushEnabled: false,
      isPurePixiWithSprites: true,
    },
    "animated-pixi-with-tooltip-and-brush": {
      isSVGShown: true,
      isSVGDataShown: Boolean(data.length < 300),
      isSVGAnimated: Boolean(data.length < 300),
      isPixiDataShown: Boolean(data.length >= 300),
      isPixiAnimated: true,
      isPixiTooltipEnabled:
        Boolean(data.length >= 300) && Boolean(data.length <= 1000),
      isBrushEnabled: Boolean(data.length > 1000),
      isPurePixiWithSprites: true,
    },
  };

  const props = versionProps[version];

  return (
    <DimensionsProvider margin={CHART_MARGIN}>
      <ChartContainer {...props} />
    </DimensionsProvider>
  );
};

export default Chart;
