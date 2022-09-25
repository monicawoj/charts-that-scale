import { useEffect } from "react";
import { select } from "d3-selection";
import { axisBottom, axisLeft, axisTop, axisRight } from "d3-axis";
import { ScaleLinear, ScaleBand, ScaleTime } from "d3-scale";

type AxisPosition = "bottom" | "top" | "left" | "right";
type AxisMethod =
  | typeof axisBottom
  | typeof axisTop
  | typeof axisLeft
  | typeof axisRight;

const getAxisMethod = (type: AxisPosition): AxisMethod => {
  switch (type) {
    case "left":
      return axisLeft;
    case "right":
      return axisRight;
    case "top":
      return axisTop;
    case "bottom":
    default: {
      return axisBottom;
    }
  }
};

export function useAxis(
  element: SVGGElement | null,
  translation: [number, number],
  position: AxisPosition,
  scale:
    | ScaleLinear<number, number>
    | ScaleTime<number, number>
    | ScaleBand<number | Date>,
  fontFamily?: string,
  fontSize?: string
): void {
  useEffect(() => {
    if (element && element !== null) {
      const createAxis = getAxisMethod(position);
      select(element)
        .call(createAxis(scale))
        .attr("transform", `translate(${translation[0]}, ${translation[1]})`)
        .selectAll("text")
        .style("font-family", fontFamily ?? "'Gaegu', cursive")
        .style("font-size", fontSize ?? "20px");
    }
  }, [element, translation, position, scale, fontFamily, fontSize]);
}
