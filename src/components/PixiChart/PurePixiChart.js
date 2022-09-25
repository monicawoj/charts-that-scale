import React, { useRef, useEffect } from "react";
import * as PIXI from "pixi.js";
import { asHexNumber, interpolateCubicBezierAngle } from "../LineChart/utils";
import { max as d3max, min as d3min } from "d3-array";
import { scaleLinear } from "d3-scale";

const createTriangle = ({ x, y, angle, width, color, app }) => {
  const triangle = new PIXI.Graphics();
  triangle.x = x;
  triangle.y = y;
  triangle.angle = angle;

  const triangleWidth = width;
  const triangleHeight = triangleWidth;
  const triangleHalfway = triangleWidth / 2;

  // draw triangle
  triangle.beginFill(color, 1);
  triangle.lineStyle(0, color, 1);
  triangle.moveTo(triangleWidth, 0);
  triangle.lineTo(triangleHalfway, triangleHeight);
  triangle.lineTo(0, 0);
  triangle.lineTo(triangleHalfway, 0);
  triangle.endFill();

  triangle.interactive = true;
  triangle.buttonMode = true;
  triangle.on("pointertap", function (e) {
    console.log("triangle tap test");
  });

  app.stage.addChild(triangle);
};

const drawBezierCurve = (app, d, xScale, yScale) => {
  const [startX, startY, cp1X, cp1Y, cp2X, cp2Y, endX, endY] = d.points;
  const g = new PIXI.Graphics();
  g.clear();
  g.lineStyle(4, asHexNumber(d.color), 1);
  g.moveTo(xScale(startX), yScale(startY));
  g.bezierCurveTo(
    xScale(cp1X),
    yScale(cp1Y),
    xScale(cp2X),
    yScale(cp2Y),
    xScale(endX),
    yScale(endY)
  );
  app.stage.addChild(g);

  const a = new PIXI.Graphics();
  const arrowHeight = 16;
  const arrowWidth = 10;
  // const container = new PIXI.Container();

  a.lineStyle(4, asHexNumber(d.color), 1);
  a.beginFill(asHexNumber(d.color));
  a.moveTo(xScale(endX), yScale(endY));
  a.lineTo(xScale(endX - arrowWidth / 2), yScale(endY - arrowHeight / 2));
  a.lineTo(xScale(endX - arrowWidth / 2), yScale(endY + arrowHeight / 2));
  a.endFill();

  const cubicAngleInterpolator = interpolateCubicBezierAngle(
    [startX, startY],
    [cp1X, cp1Y],
    [cp2X, cp2Y],
    [endX, endY]
  );

  // angle is in degrees, rotation is in radians
  // a.position.set(xScale(endX), yScale(endY));
  a.position.set(xScale(endX), yScale(endY));
  a.pivot.set(xScale(endX), yScale(endY));
  // a.angle = cubicAngleInterpolator(60);

  // this is the angle that the curve points in
  // but we have a triangle positioned "up"
  // a.angle = 0;
  a.angle = -45 + Math.abs(cubicAngleInterpolator(1));

  app.stage.addChild(a);
};

const PixiContainer = ({ width, height, data, margin }) => {
  const ref = useRef(null);
  // scales
  const max = d3max(data, (d) => d3max([d.points[0], d.points[1]]));
  const min = d3min(data, (d) => d3min([d.points[0], d.points[1]]));
  const yScale = scaleLinear().domain([min, max]).range([height, -50]);
  const xScale = scaleLinear().domain([min, max]).range([0, width]);

  useEffect(() => {
    // On first render create our application
    const app = new PIXI.Application({
      width: width + margin.left + margin.right,
      height: height + margin.top + margin.bottom,
      backgroundColor: asHexNumber("white"),
      antialias: true,
    });

    // Add app to DOM
    ref.current.appendChild(app.view);
    app.stage.interactive = true;

    // draw a graphic for each data point
    data.forEach((d) => {
      drawBezierCurve(app, d, xScale, yScale);
    });

    // Start the PixiJS app
    app.start();

    return () => {
      // On unload completely destroy the application and all of it's children
      app.destroy(true, true);
    };
  }, [data, width, height]);

  return <div ref={ref} />;
};

export default PixiContainer;
