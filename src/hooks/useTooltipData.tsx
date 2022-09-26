import {
  createContext,
  useState,
  FC,
  ReactNode,
  Dispatch,
  useContext,
} from "react";
import { FightStats } from "../types/data";

interface Props {
  children?: ReactNode;
}

interface Context {
  tooltipData: { data: FightStats | null; position: { x: number; y: number } };
  setTooltipData: Dispatch<{
    data: FightStats | null;
    position: { x: number; y: number };
  }>;
}

const TooltipDataContext = createContext<Context | null>(null);

export const TooltipDataProvider: FC<Props> = ({ children }: Props) => {
  const [tooltipData, setTooltipData] = useState<{
    data: FightStats | null;
    position: { x: number; y: number };
  }>({ data: null, position: { x: 0, y: 0 } });

  return (
    <TooltipDataContext.Provider value={{ tooltipData, setTooltipData }}>
      {children}
    </TooltipDataContext.Provider>
  );
};

export const useTooltipData = () => useContext(TooltipDataContext);
