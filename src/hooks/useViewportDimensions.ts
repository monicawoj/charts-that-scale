import { useMemo } from "react";
import { Margin } from "../types/chart";

export function useViewportDimensions(
  width: number,
  height: number,
  Margin: Margin
): [number, number] {
  const vpWidth = useMemo(
    () => width - Margin.left - Margin.right,
    [width, Margin.left, Margin.right]
  );
  const vpHeight = useMemo(
    () => height - Margin.top - Margin.bottom,
    [height, Margin.top, Margin.bottom]
  );
  return [vpWidth, vpHeight];
}
