import PixiChart from "../PixiChart";
import SVGChart from "../SVGChart";
import Tooltip from "../Tooltip";
import { useData } from "../../hooks/useData";
import { useDimensions } from "../../hooks/useDimensions";
import { ScalesProvider } from "../../hooks/useScales";
import { TooltipDataProvider } from "../../hooks/useTooltipData";

const ChartContainer = () => {
  const { width, height, margin } = useDimensions();
  const { data } = useData();

  return (
    <ScalesProvider data={data} width={width} height={height} margin={margin}>
      <TooltipDataProvider>
        <div style={{ position: "absolute", zIndex: 1 }}>
          <PixiChart
            isDataShown={Boolean(data.length >= 1000)}
            isAnimated={true}
          />
          <SVGChart
            isDataShown={Boolean(data.length < 1000)}
            isAnimated={true}
            isBrushEnabled={true}
          />
        </div>
        <Tooltip />
      </TooltipDataProvider>
    </ScalesProvider>
  );
};

export default ChartContainer;
