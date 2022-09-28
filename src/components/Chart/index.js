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
    "animated-svg": {
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
    "animated-pixi-with-svg": {
      isSVGShown: true,
      isSVGDataShown: false,
      isSVGAnimated: false,
      isPixiDataShown: true,
      isPixiAnimated: true,
      isPixiTooltipEnabled: false,
      isBrushEnabled: false,
    },
    "animated-pixi-with-tooltip": {
      isSVGShown: true,
      isSVGDataShown: false,
      isSVGAnimated: false,
      isPixiDataShown: true,
      isPixiAnimated: true,
      isPixiTooltipEnabled: true,
      isBrushEnabled: false,
    },
    "animated-pixi-with-brush": {
      isSVGShown: true,
      isSVGDataShown: false,
      isSVGAnimated: false,
      isPixiDataShown: true,
      isPixiAnimated: true,
      isPixiTooltipEnabled: false,
      isBrushEnabled: true,
    },
    "pixi-with-tooltip-and-brush": {
      isSVGShown: true,
      isSVGDataShown: Boolean(data.length < 300),
      isSVGAnimated: Boolean(data.length < 300),
      isPixiDataShown: Boolean(data.length >= 300),
      isPixiAnimated: Boolean(data.length <= 3000),
      isPixiTooltipEnabled:
        Boolean(data.length >= 300) && Boolean(data.length <= 3000),
      isBrushEnabled: Boolean(data.length > 3000),
    },
  };

  const props = versionProps[version];

  return (
    <DimensionsProvider height={CHART_HEIGHT} margin={CHART_MARGIN}>
      <ChartContainer {...props} />
    </DimensionsProvider>
  );
};

export default Chart;
