import { useState, useCallback } from "react";
import PixiChart from "../PixiChart";
import SVGChart from "../SVGChart";
import Tooltip from "../Tooltip";
import { useData } from "../../hooks/useData";
import { useDimensions } from "../../hooks/useDimensions";
import { ScalesProvider } from "../../hooks/useScales";

const ChartContainer = () => {
  const { width, height, margin } = useDimensions();
  const { data } = useData();

  const [tooltipData, setTooltipData] = useState({
    position: { x: 0, y: 0 },
    data: null,
  });

  const handlePointMouseover = useCallback((data, position) => {
    setTooltipData({ data, position });
  }, []);

  const handlePointMouseout = useCallback(() => {
    setTooltipData({ data: null, position: { x: 0, y: 0 } });
  }, []);

  return (
    <ScalesProvider data={data} width={width} height={height} margin={margin}>
      <div style={{ position: "absolute", zIndex: 1 }}>
        <PixiChart
          isDataShown={Boolean(data.length >= 500)}
          onPointMouseover={handlePointMouseover}
          onPointMouseout={handlePointMouseout}
          // isAnimated={true}
        />
        <SVGChart
          isDataShown={Boolean(data.length < 1000)}
          onPointMouseover={handlePointMouseover}
          onPointMouseout={handlePointMouseout}
          isAnimated={true}
        />
      </div>
      <Tooltip position={tooltipData.position} data={tooltipData.data} />
    </ScalesProvider>
  );
};

export default ChartContainer;
