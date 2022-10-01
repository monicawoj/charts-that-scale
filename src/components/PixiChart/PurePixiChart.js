import React, { useRef, useEffect } from "react";
import * as PIXI from "pixi.js";
import { asHexNumber } from "../../utils";
import { useDimensions } from "../../hooks/useDimensions";
import { useScales } from "../../hooks/useScales";
import { useData } from "../../hooks/useData";
import { useTooltipData } from "../../hooks/useTooltipData";
import gsap from "gsap";

const PurePixiChart = ({ isDataShown, isAnimated, isTooltipEnabled }) => {
  const { width, height, margin } = useDimensions();
  const { data } = useData();
  const { xScale, yScale, colorScale, nodeRadiusScale } = useScales();
  const { setTooltipData } = useTooltipData();
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && isDataShown) {
      const app = new PIXI.Application({
        width,
        height,
        x: 0,
        y: 0,
        backgroundAlpha: 0,
        antialias: true,
      });

      // create a white texture to be used by our sprites
      const circleTemplate = new PIXI.Graphics()
        .beginFill(0xffffff)
        .drawCircle(0, 0, 10)
        .endFill();

      const texture = app.renderer.generateTexture(circleTemplate);

      // add a container to hold our circles
      const container = new PIXI.Container(
        width - margin.left - margin.right,
        height - margin.top - margin.bottom
      );
      app.stage.addChild(container);
      container.x = margin.left;
      container.y = margin.top;

      // time animation in seconds
      const duration = 0.3;

      const renderSprite = ({
        d,
        x0,
        x1,
        y,
        width,
        height,
        tint,
        onPointerEvent,
      }) => {
        const sprite = new PIXI.Sprite(texture);

        sprite.anchor.set(0.5);
        sprite.x = x0;
        sprite.y = y;
        sprite.width = width;
        sprite.height = height;
        sprite.tint = tint;

        if (isTooltipEnabled) {
          sprite.interactive = true;
          sprite.buttonMode = true;
          sprite.on("pointerover", (e) => {
            const { clientX, clientY } = e.data.originalEvent;
            onPointerEvent({
              data: d,
              position: { x: clientX, y: clientY + 10 },
            });
          });
          sprite.on("pointerout", () => onPointerEvent());
        }

        const tween = gsap.to(sprite, {
          x: x1,
          duration,
          overwrite: true,
        });

        // This is a hack to keep the app from crashing due to an animation error
        window.addEventListener("error", (event) => {
          tween.kill();
          sprite.x = x1;
        });

        container.addChild(sprite);
      };

      data.forEach((d) => {
        const x0 = xScale.range[0];
        const x1 = xScale(new Date(d.date));
        const y = yScale(d.cleaned_fight_type);
        const r = nodeRadiusScale(d.total_fight_minutes);
        const tint = asHexNumber(colorScale(d.win_by));

        // white circle outline
        // renderSprite({
        //   d,
        //   x,
        //   y,
        //   width: r * 2 + 2,
        //   height: r * 2 + 2,
        //   tint: asHexNumber("white"),
        //   onPointerEvent: () => {},
        // });

        // colored circle with hover
        renderSprite({
          d,
          x0,
          x1,
          y,
          width: r * 2,
          height: r * 2,
          tint,
          onPointerEvent: setTooltipData,
        });
      });

      // Add app to DOM
      ref.current.appendChild(app.view);

      return () => {
        // On unload completely destroy the application and all of it's children
        app.destroy(true, true);
      };
    }
  }, [
    data,
    width,
    height,
    xScale,
    yScale,
    colorScale,
    nodeRadiusScale,
    margin.bottom,
    margin.top,
    margin.left,
    margin.right,
    isTooltipEnabled,
    setTooltipData,
    isDataShown,
  ]);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
      }}
      width={width}
      height={height}
    />
  );
};

export default PurePixiChart;
