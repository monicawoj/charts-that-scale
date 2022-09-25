import { createContext, useMemo, FC, ReactNode, useContext } from "react";
import { ScaleLinear, ScaleTime, ScaleOrdinal } from "d3-scale";
import { extent } from "d3-array";
import { scaleTime, scaleLinear, scaleOrdinal } from "d3-scale";
import { schemeAccent } from "d3-scale-chromatic";

import { FightStats } from "../types/data";
import { Margin } from "../types/chart";

interface Props {
  data: FightStats[];
  width: number;
  height: number;
  margin: Margin;
  children?: ReactNode;
}

interface Context {
  xScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
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
  const xRange = useMemo(
    () => extent(data, (d) => new Date(d.date)),
    [data]
  ) as [Date, Date];
  const yRange = useMemo(
    () => extent(data, (d) => d.total_fight_minutes),
    [data]
  ) as [number, number];

  const xScale = useMemo(
    () =>
      scaleTime()
        .domain(xRange)
        .range([0, width - margin.left - margin.right])
        .nice(),
    [width, margin.left, margin.right, xRange]
  );
  const yScale = useMemo(
    () =>
      scaleLinear()
        .domain(yRange)
        .range([height - margin.top - margin.bottom, 0])
        .nice(),
    [height, margin.top, margin.bottom, yRange]
  );
  const colorScale = useMemo(() => {
    const winByTypes = [...new Set(data.map((d) => d.win_by))];
    return scaleOrdinal(schemeAccent).domain(winByTypes);
  }, [data]);

  return (
    <ScalesContext.Provider
      value={{
        xScale,
        yScale,
        colorScale,
      }}
    >
      {children}
    </ScalesContext.Provider>
  );
};

export const useScales = () => useContext(ScalesContext);
