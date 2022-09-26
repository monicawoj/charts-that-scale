import { createContext, useMemo, FC, ReactNode, useContext } from "react";
import {
  ScaleLinear,
  ScaleTime,
  ScaleOrdinal,
  ScalePoint,
  scalePoint,
  scaleTime,
  scaleLinear,
  scaleOrdinal,
} from "d3-scale";
import { extent } from "d3-array";
import { timeMonth } from "d3-time";
import { FightStats } from "../types/data";
import { Margin } from "../types/chart";
import { NODE_RADIUS } from "../constants";

interface Props {
  data: FightStats[];
  width: number;
  height: number;
  margin: Margin;
  children?: ReactNode;
}

interface Context {
  xScale: ScaleTime<number, number>;
  yScale: ScalePoint<string>;
  nodeRadiusScale: ScaleLinear<number, number>;
  colorScale: ScaleOrdinal<string, string>;
}

const ScalesContext = createContext<Context | null>(null);

export const ScalesProvider: FC<Props> = ({
  data,
  width,
  height,
  margin,
  children,
}: Props) => {
  const dateRange = useMemo(() => {
    const range = extent(data, (d) => new Date(d.date)) as [Date, Date];
    const rangeWithPadding = [
      timeMonth.offset(range[0], -1),
      timeMonth.offset(range[1], 1),
    ];
    return rangeWithPadding;
  }, [data]) as [Date, Date];

  const totalFightMinutesRange = useMemo(
    () => extent(data, (d) => d.total_fight_minutes),
    [data]
  ) as [number, number];

  const xScale = useMemo(
    () =>
      scaleTime()
        .domain(dateRange)
        .range([0, width - margin.left - margin.right]),
    [width, margin.left, margin.right, dateRange]
  );

  const yScale = useMemo(() => {
    const orderedFightTypes = [
      "Strawweight",
      "Flyweight",
      "Bantamweight",
      "Featherweight",
      "Lightweight",
      "Welterweight",
      "Middleweight",
      "Light Heavyweight",
      "Heavyweight",
    ];

    return scalePoint()
      .domain(orderedFightTypes)
      .range([height - margin.top - margin.bottom, 0])
      .padding(0.5);
  }, [height, margin.top, margin.bottom]);

  const nodeRadiusScale = useMemo(
    () =>
      scaleLinear()
        .domain(totalFightMinutesRange)
        .range([NODE_RADIUS, NODE_RADIUS + 5]),
    [totalFightMinutesRange]
  );

  const colorScale = useMemo(() => {
    const winByTypes = [...new Set(data.map((d) => d.win_by))];
    const colors = [
      "#e60049",
      "#0bb4ff",
      "#50e991",
      "#e6d800",
      "#9b19f5",
      "#ffa300",
      "#dc0ab4",
      "#b3d4ff",
      "#00bfa0",
    ];
    return scaleOrdinal(colors).domain(winByTypes);
  }, [data]);

  return (
    <ScalesContext.Provider
      value={{
        xScale,
        yScale,
        colorScale,
        nodeRadiusScale,
      }}
    >
      {children}
    </ScalesContext.Provider>
  );
};

export const useScales = () => useContext(ScalesContext);
