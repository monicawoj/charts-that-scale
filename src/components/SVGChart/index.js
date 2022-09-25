import { memo, useEffect, useRef } from "react";
import { select } from "d3-selection";
import { transition } from "d3-transition";
import { brush as d3brush } from "d3-brush";
import { axisLeft, axisBottom } from "d3-axis";
import { useData } from "../../hooks/useData";
import { useDimensions } from "../../hooks/useDimensions";
import { useScales } from "../../hooks/useScales";
import { NODE_RADIUS } from "../../constants";

const SVGChart = ({ isDataShown, onPointMouseover, onPointMouseout }) => {
  const { width, height, margin } = useDimensions();
  const { data, setData } = useData();
  const { xScale, yScale, colorScale } = useScales();

  console.log("svg isDataShown", isDataShown);

  const viewportRef = useRef(null);
  const titleRef = useRef(null);
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);

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
    if (titleRef.current) {
      const text = "UFC Fight Data - what it takes to win";
      select(titleRef.current)
        .append("text")
        .text(text)
        .attr("text-anchor", "middle");
    }
  }, [width]);

  useEffect(() => {
    if (viewportRef.current) {
      const brushed = ({ selection }) => {
        if (selection) {
          const [[x0, y0], [x1, y1]] = selection;
          const filteredData = data.filter(
            (d) =>
              x0 <= xScale(new Date(d.date)) &&
              xScale(new Date(d.date)) < x1 &&
              y0 <= yScale(d.total_fight_minutes) &&
              yScale(d.total_fight_minutes) < y1
          );
          setData(filteredData);
          select(viewportRef.current).call(brush.clear);
        }
      };

      const brush = d3brush().on("end", brushed);
      select(viewportRef.current).call(brush);
    }
  }, [data, setData, xScale, yScale, width]);

  useEffect(() => {
    if (isDataShown) {
      const viewport = select(viewportRef.current);

      viewport
        .selectAll(".circle")
        .data(data)
        .join("circle")
        .attr("class", "circle")
        .attr("cx", (d) => xScale(new Date(d.date)))
        .attr("cy", (d) => yScale(0))
        .attr("r", NODE_RADIUS)
        .style("fill", (d) => colorScale(d.win_by))
        .on("mouseover", (e, d) => {
          const position = { x: e.clientX, y: e.clientY };
          onPointMouseover(d, position);
          select(e.target).attr("r", NODE_RADIUS + 4);
        })
        .on("mouseout", (e, d) => {
          onPointMouseout();
          select(e.target).attr("r", NODE_RADIUS);
        })
        .transition()
        .duration(1000)
        .attr("cy", (d) => yScale(d.total_fight_minutes));
    }
  }, [
    data,
    xScale,
    yScale,
    colorScale,
    isDataShown,
    width,
    onPointMouseover,
    onPointMouseout,
  ]);

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
      }}
      width={width}
      height={height}
      role="img"
    >
      <g
        ref={titleRef}
        transform={`translate(${margin.left + width / 2}, ${margin.top / 2})`}
      />
      <g
        ref={viewportRef}
        width={width - margin.left - margin.right}
        height={height - margin.top - margin.bottom}
        transform={`translate(${margin.left}, ${margin.top})`}
      >
        <g className="brush" />
      </g>
      <g
        ref={xAxisRef}
        transform={`translate(${margin.left}, ${height - margin.bottom})`}
      />
      <g
        ref={yAxisRef}
        transform={`translate(${margin.left}, ${margin.top})`}
      />
    </svg>
  );
};

export default memo(SVGChart);
