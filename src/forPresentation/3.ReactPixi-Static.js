import { memo, useCallback } from "react";
import { asHexNumber } from "../../utils";
import { Stage, Container, Graphics } from "@inlet/react-pixi";
import { useData } from "../../hooks/useData";
import { useDimensions } from "../../hooks/useDimensions";
import { useScales } from "../../hooks/useScales";

const Circle = ({ x, y, r, color }) => {
  const draw = useCallback(
    (g) => {
      g.clear();
      g.beginFill(asHexNumber(color));
      g.drawCircle(x, y, r);
      g.endFill();
    },
    [x, y, r, color]
  );

  return <Graphics draw={draw} />;
};

const ReactPixiChart = () => {
  const { width, height, margin } = useDimensions();
  const { data } = useData();
  const { xScale, yScale, colorScale, nodeRadiusScale } = useScales();

  return (
    <Stage
      style={{
        position: "absolute",
        top: 0,
        left: 0,
      }}
      width={width}
      height={height}
      options={{ backgroundAlpha: 0 }}
    >
      <Container x={margin.left} y={margin.top}>
        {data.map((d) => (
          <Circle
            key={`${d.R_fighter}-${d.B_fighter}-${d.date}`}
            x={xScale(new Date(d.date))}
            y={yScale(d.cleaned_fight_type)}
            r={nodeRadiusScale(d.total_fight_minutes)}
            color={colorScale(d.win_by)}
          />
        ))}
      </Container>
    </Stage>
  );
};

export default memo(ReactPixiChart);
