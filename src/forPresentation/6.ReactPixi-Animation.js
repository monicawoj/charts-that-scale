import { memo, useCallback } from "react";
import { asHexNumber } from "../../utils";
import { Spring } from "react-spring";
import { Stage, Container, Graphics } from "@inlet/react-pixi/animated";
// For React 18 support: https://github.com/inlet/react-pixi/pull/338
// if using ReactSpring, need to import from '@inlet/react-pixi/animated'
import { useData } from "../../hooks/useData";
import { useDimensions } from "../../hooks/useDimensions";
import { useScales } from "../../hooks/useScales";

const AnimatedCircle = ({ xStart, xEnd, y, r, color }) => {
  const draw = useCallback(
    (g, x) => {
      g.clear();
      g.beginFill(asHexNumber(color));
      g.drawCircle(x, y, r);
      g.endFill();
    },
    [y, r, color]
  );

  return (
    <Spring native from={{ x: xStart }} to={{ x: xEnd }}>
      {(props) => <Graphics draw={draw} {...props} />}
    </Spring>
  );
};

const ReactPixiChart = ({ isDataShown, isAnimated, isTooltipEnabled }) => {
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
      {isDataShown && (
        <Container x={margin.left} y={margin.top}>
          {data.map((d) => (
            <AnimatedCircle
              key={`${d.R_fighter}-${d.B_fighter}-${d.date}`}
              xStart={xScale.domain[0]}
              xEnd={xScale(new Date(d.date))}
              y={yScale(d.cleaned_fight_type)}
              r={nodeRadiusScale(d.total_fight_minutes)}
              color={colorScale(d.win_by)}
            />
          ))}
        </Container>
      )}
    </Stage>
  );
};

export default memo(ReactPixiChart);
