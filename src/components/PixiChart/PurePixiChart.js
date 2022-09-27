import React, { useRef, useEffect } from "react";
import * as PIXI from "pixi.js";
import { asHexNumber } from "../LineChart/utils";
import { useDimensions } from "../../hooks/useDimensions";
import { useScales } from "../../hooks/useScales";
import { useData } from "../../hooks/useData";
import { useTooltipData } from "../../hooks/useTooltipData";

const PixiChart = ({ isDataShown, isAnimated }) => {
  const { width, height, margin } = useDimensions();
  const { data } = useData();
  const { xScale, yScale, colorScale, nodeRadiusScale } = useScales();
  const { setTooltipData } = useTooltipData();
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      // On first render create our application
      const app = new PIXI.Application({
        width: width - margin.left - margin.right,
        height: height - margin.top - margin.bottom,
        x: margin.left,
        y: margin.top,
        backgroundAlpha: 0,
        backgroundColor: asHexNumber("white"),
        antialias: true,
        renderer: PIXI.autoDetectRenderer({
          width: width,
          height: height,
          antialias: true,
          autoResize: true,
          resolution: 2,
          backgroundColor: 0xffffff,
        }),
      });

      // const stage = new PIXI.Container();
      // const renderer = PIXI.autoDetectRenderer({
      //   width: width,
      //   height: height,
      //   antialias: true,
      //   autoResize: true,
      //   resolution: 2,
      //   backgroundColor: 0xffffff,
      // });
      const context = new PIXI.Graphics();
      app.stage.addChild(context);

      const handleMouseover = (node) => {
        console.log(node);
        // setTooltipData({ data: d, position: { x, y } })
        // node.gfx.tint = 0x666666;
        app.renderer.render(app.stage);
      };

      const handleMouseout = (node) => {
        // setTooltipData({ data: null, position: { x: 0, y: 0 } })
        node.gfx.tint = 0xffffff;
        app.renderer.render(app.stage);
      };

      data.forEach((d) => {
        const x = xScale(new Date(d.date));
        const y = yScale(d.cleaned_fight_type);
        const r = nodeRadiusScale(d.total_fight_minutes);
        d.gfx = new PIXI.Graphics();
        d.gfx.beginFill(asHexNumber(colorScale(d.win_by)));
        d.gfx.drawCircle(x, y, r);
        d.gfx.interactive = true;
        d.gfx.buttonMode = true;
        d.gfx.on("pointerover", () => handleMouseover(d));
        d.gfx.on("pointerout", () => handleMouseout(d));
        app.stage.addChild(d.gfx);
      });

      // Add app to DOM
      ref.current.appendChild(app.view);
      // app.stage.interactive = true;

      // Start the PixiJS app
      app.start();

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

export default PixiChart;
