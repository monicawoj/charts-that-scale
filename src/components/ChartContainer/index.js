import PixiChart from "../PixiChart";
import SVGChart from "../SVGChart";
import PixiChartWithSprites from "../PixiChart/PurePixiChart";
import Tooltip from "../Tooltip";
import { useData } from "../../hooks/useData";
import { useDimensions } from "../../hooks/useDimensions";
import { ScalesProvider } from "../../hooks/useScales";
import { TooltipDataProvider } from "../../hooks/useTooltipData";
import { INITIAL_TOOLTIP_DATA } from "../../constants";

const ChartContainer = ({
  isSVGShown,
  isPixiDataShown,
  isPixiAnimated,
  isSVGDataShown,
  isSVGAnimated,
  isPixiTooltipEnabled,
  isBrushEnabled,
  isPurePixiWithSprites = false,
}) => {
  const { width, height, margin } = useDimensions();
  const { data, fullData } = useData();

  // Reset the tooltip data every time the chart container re-renders
  localStorage.setItem("tooltipData", JSON.stringify(INITIAL_TOOLTIP_DATA));

  return (
    <ScalesProvider
      data={data}
      fullData={fullData}
      width={width}
      height={height}
      margin={margin}
    >
      <TooltipDataProvider>
        <div style={{ position: "absolute", zIndex: 1 }}>
          {!isPurePixiWithSprites && (
            <PixiChart
              isDataShown={isPixiDataShown}
              isAnimated={isPixiAnimated}
              isTooltipEnabled={isPixiTooltipEnabled}
            />
          )}
          {isPurePixiWithSprites && (
            <PixiChartWithSprites
              isDataShown={isPixiDataShown}
              isAnimated={isPixiAnimated}
              isTooltipEnabled={isPixiTooltipEnabled}
            />
          )}
          {isSVGShown && (
            <SVGChart
              isDataShown={isSVGDataShown}
              isAnimated={isSVGAnimated}
              isBrushEnabled={isBrushEnabled}
              isPixiTooltipEnabled={isPixiTooltipEnabled}
            />
          )}
        </div>
        <Tooltip />
      </TooltipDataProvider>
    </ScalesProvider>
  );
};

export default ChartContainer;
