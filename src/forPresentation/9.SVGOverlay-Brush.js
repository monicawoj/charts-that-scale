import { memo, useEffect, useRef } from "react";
import { select } from "d3-selection";
import { transition } from "d3-transition";
import { brush as d3brush } from "d3-brush";
import { axisLeft, axisBottom } from "d3-axis";
import { legendColor, legendSize } from "d3-svg-legend";
import { format } from "d3-format";
import { useData } from "../../hooks/useData";
import { useDimensions } from "../../hooks/useDimensions";
import { useScales } from "../../hooks/useScales";
import { NODE_RADIUS } from "../../constants";

const SVGOverlay = ({ isBrushEnabled, isPixiTooltipEnabled }) => {
  const { width, height, margin } = useDimensions();
  const { data, setData } = useData();
  const { xScale, yScale, colorScale, nodeRadiusScale } = useScales();

  const viewportRef = useRef(null);
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);
  const legendRef = useRef(null);

  useEffect(() => {
    if (xAxisRef.current) {
      const xAxis = axisBottom(xScale);
      select(xAxisRef.current).call(xAxis);
    }
  }, [xScale, width]);

  useEffect(() => {
    if (yAxisRef.current) {
      const yAxis = axisLeft(yScale).tickSize(0);
      select(yAxisRef.current).call(yAxis);
    }
  }, [yScale, width]);

  useEffect(() => {
    if (legendRef.current) {
      const colorLegend = legendColor()
        .title("Win By")
        .shape("circle")
        .shapeRadius(NODE_RADIUS)
        .shapePadding(10)
        .scale(colorScale);

      const sizeLegend = legendSize()
        .title("Total Fight Time (minutes)")
        .scale(nodeRadiusScale)
        .shape("circle")
        .shapePadding(30)
        .labelOffset(30)
        .labelFormat(format(".0f"))
        .orient("horizontal");

      select(legendRef.current).select(".colorLegend").call(colorLegend);
      select(legendRef.current).select(".sizeLegend").call(sizeLegend);
    }
  }, [colorScale, nodeRadiusScale]);

  useEffect(() => {
    if (viewportRef.current && isBrushEnabled) {
      const brushed = ({ selection }) => {
        if (selection) {
          const [[x0, y0], [x1, y1]] = selection;
          const filteredData = data.filter(
            (d) =>
              x0 <= xScale(new Date(d.date)) &&
              xScale(new Date(d.date)) < x1 &&
              y0 <= yScale(d.cleaned_fight_type) &&
              yScale(d.cleaned_fight_type) < y1
          );
          setData(filteredData);
          select(viewportRef.current).select(".brush").call(brush.clear);
        }
      };

      const brush = d3brush().on("end", brushed);
      select(viewportRef.current).select(".brush").call(brush);
    }
  }, [data, setData, xScale, yScale, width, isBrushEnabled]);

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: isPixiTooltipEnabled ? "none" : "auto",
      }}
      width={width}
      height={height}
      role="img"
    >
      <g
        className="title"
        transform={`translate(${
          margin.left + (width - margin.left - margin.right) / 2
        }, ${margin.top / 2})`}
      >
        <text textAnchor="middle" fontSize={24}>
          UFC Historical Data (1993 - 2021) - What Wins Fights?
        </text>
      </g>
      <g
        ref={viewportRef}
        className="viewport"
        width={width - margin.left - margin.right}
        height={height - margin.top - margin.bottom}
        transform={`translate(${margin.left}, ${margin.top})`}
      >
        <g className="brush" />
      </g>
      <g
        ref={xAxisRef}
        className="axis"
        transform={`translate(${margin.left}, ${height - margin.bottom})`}
      />
      <g
        ref={yAxisRef}
        className="axis"
        transform={`translate(${margin.left}, ${margin.top})`}
      />
      <g
        ref={legendRef}
        transform={`translate(${width - margin.right + 20}, ${margin.top})`}
      >
        <g className="sizeLegend" />
        <g className="colorLegend" transform={`translate(0, ${margin.top})`} />
      </g>
    </svg>
  );
};

export default memo(SVGOverlay);
