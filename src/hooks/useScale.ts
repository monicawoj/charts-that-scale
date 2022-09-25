import { useMemo } from "react";
import { scaleLinear, ScaleLinear, ScaleBand, scaleBand } from "d3-scale";

export function useScaleLinear(
  domain: [number, number],
  range: [number, number]
): ScaleLinear<number, number> {
  return useMemo(() => {
    return scaleLinear().domain(domain).range(range);
  }, [domain, range]);
}
