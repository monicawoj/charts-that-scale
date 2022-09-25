import { memo, useCallback } from "react";
import { asHexNumber } from "./utils";
import { Spring } from "react-spring";
import { Stage, Container, Graphics } from "@inlet/react-pixi/animated";
// For React 18 support: https://github.com/inlet/react-pixi/pull/338
// if using ReactSpring, need to import from '@inlet/react-pixi/animated'
import { useData } from "../../hooks/useData";
import { useDimensions } from "../../hooks/useDimensions";
import { useScales } from "../../hooks/useScales";
import { NODE_RADIUS } from "../../constants";

const AnimatedCircle = ({ x, yStart, yEnd, r, color }) => {
  const draw = useCallback(
    (g, y) => {
      g.clear();
      g.beginFill(asHexNumber(color));
      g.drawCircle(x, y, r);
      g.endFill();
    },
    [x, r, color]
  );

  return (
    <Spring native from={{ y: yStart }} to={{ y: yEnd }}>
      {(props) => <Graphics draw={draw} {...props} />}
    </Spring>
  );
};

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

  return (
    <Graphics
      draw={draw}
      interactive={true}
      mouseover={(d) => {
        console.log("hovered!", d);
      }}
    />
  );
};

const PixiChart = ({
  isDataShown,
  onPointMouseover,
  onPointMouseout,
  isAnimated,
}) => {
  const { width, height, margin } = useDimensions();
  const { data } = useData();
  const { xScale, yScale, colorScale } = useScales();

  return (
    <Stage
      style={{
        position: "absolute",
        top: 0,
        left: 0,
      }}
      width={width}
      height={height}
      options={{ backgroundColor: asHexNumber("white") }}
    >
      {isDataShown && (
        <Container x={margin.left} y={margin.top}>
          {data.map((d) =>
            isAnimated ? (
              <AnimatedCircle
                key={`${d.R_fighter}-${d.B_fighter}-${d.date}`}
                yStart={yScale(0)}
                yEnd={yScale(d.total_fight_minutes)}
                x={xScale(new Date(d.date))}
                r={NODE_RADIUS}
                color={colorScale(d.win_by)}
              />
            ) : (
              <Circle
                // key={`${d.R_fighter}-${d.B_fighter}-${d.date}`}
                x={xScale(new Date(d.date))}
                y={yScale(d.total_fight_minutes)}
                r={NODE_RADIUS}
                color={colorScale(d.win_by)}
              />
            )
          )}
        </Container>
      )}
    </Stage>
  );
};

export default memo(PixiChart);
