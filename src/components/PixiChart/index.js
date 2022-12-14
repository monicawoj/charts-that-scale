import { memo, useCallback } from "react";
import { asHexNumber } from "../../utils";
import { Spring } from "react-spring";
import { Stage, Container, Graphics } from "@inlet/react-pixi/animated";
// For React 18 support: https://github.com/inlet/react-pixi/pull/338
// if using ReactSpring, need to import from '@inlet/react-pixi/animated'
import { useData } from "../../hooks/useData";
import { useDimensions } from "../../hooks/useDimensions";
import { useScales } from "../../hooks/useScales";
import { useTooltipData } from "../../hooks/useTooltipData";

const AnimatedCircle = ({
  xStart,
  xEnd,
  y,
  r,
  color,
  d,
  onPointerEvent,
  isTooltipEnabled,
}) => {
  const draw = useCallback(
    (g, x) => {
      g.clear();
      g.beginFill(asHexNumber(color));
      g.drawCircle(x, y, r);
      g.endFill();

      if (isTooltipEnabled) {
        g.interactive = true;
        g.buttonMode = true;
        g.on("pointerover", (e) => {
          const { clientX, clientY } = e.data.originalEvent;
          onPointerEvent({
            data: d,
            position: { x: clientX, y: clientY + 10 },
          });
        });
        g.on("pointerout", () => onPointerEvent());
      }
    },
    [y, r, color, d, onPointerEvent, isTooltipEnabled]
  );

  return (
    <Spring native from={{ x: xStart }} to={{ x: xEnd }}>
      {(props) => <Graphics draw={draw} {...props} />}
    </Spring>
  );
};

const Circle = ({ d, x, y, r, color, onPointerEvent, isTooltipEnabled }) => {
  const draw = useCallback(
    (g) => {
      g.clear();
      g.beginFill(asHexNumber(color));
      g.drawCircle(x, y, r);
      g.endFill();

      if (isTooltipEnabled) {
        g.interactive = true;
        g.buttonMode = true;
        g.on("pointerover", (e) => {
          const { clientX, clientY } = e.data.originalEvent;
          onPointerEvent({
            data: d,
            position: { x: clientX, y: clientY + 10 },
          });
        });
        g.on("pointerout", () => onPointerEvent());
      }
    },
    [d, x, y, r, color, onPointerEvent, isTooltipEnabled]
  );

  return <Graphics draw={draw} />;
};

const PixiChart = ({ isDataShown, isAnimated, isTooltipEnabled }) => {
  const { width, height, margin } = useDimensions();
  const { data } = useData();
  const { xScale, yScale, colorScale, nodeRadiusScale } = useScales();
  const { setTooltipData } = useTooltipData();

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
          {data.map((d) =>
            isAnimated ? (
              <AnimatedCircle
                key={`${d.R_fighter}-${d.B_fighter}-${d.date}`}
                d={d}
                xStart={xScale.domain[0]}
                xEnd={xScale(new Date(d.date))}
                y={yScale(d.cleaned_fight_type)}
                r={nodeRadiusScale(d.total_fight_minutes)}
                color={colorScale(d.win_by)}
                onPointerEvent={setTooltipData}
                isTooltipEnabled={isTooltipEnabled}
              />
            ) : (
              <Circle
                key={`${d.R_fighter}-${d.B_fighter}-${d.date}`}
                d={d}
                x={xScale(new Date(d.date))}
                y={yScale(d.cleaned_fight_type)}
                r={nodeRadiusScale(d.total_fight_minutes)}
                color={colorScale(d.win_by)}
                onPointerEvent={setTooltipData}
                isTooltipEnabled={isTooltipEnabled}
              />
            )
          )}
        </Container>
      )}
    </Stage>
  );
};

export default memo(PixiChart);
