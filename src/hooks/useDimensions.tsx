import {
  createContext,
  useState,
  useRef,
  useEffect,
  FC,
  ReactNode,
  useContext,
} from "react";
import { CHART_MARGIN } from "../constants";
import { Margin } from "../types/chart";

interface Props {
  width?: number;
  height?: number;
  margin?: Margin;
  children?: ReactNode;
}

interface Context {
  width: number;
  height: number;
  margin: Margin;
}

const DimensionsContext = createContext<Context | null>(null);

export const DimensionsProvider: FC<Props> = ({
  width: fixedWidth,
  height: fixedHeight,
  margin: fixedMargin,
  children,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(fixedWidth ?? 800);
  const [height, setHeight] = useState(fixedHeight ?? 600);

  useEffect(() => {
    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      if (!fixedWidth) setWidth(clientWidth);
      if (!fixedHeight) setHeight(clientHeight);
    }
  }, [containerRef, fixedHeight, fixedWidth]);

  return (
    <DimensionsContext.Provider
      value={{
        width: fixedWidth ?? width,
        height: fixedHeight ?? height,
        margin: fixedMargin ?? CHART_MARGIN,
      }}
    >
      <div ref={containerRef}>{children}</div>
    </DimensionsContext.Provider>
  );
};

export const useDimensions = () => useContext(DimensionsContext);
