import { createContext, useCallback, FC, ReactNode, useContext } from "react";
import { FightStats } from "../types/data";

interface TooltipData {
  data: FightStats | null;
  position: { x: number; y: number };
}
interface Props {
  initialData: TooltipData;
  children?: ReactNode;
}

interface Context {
  setTooltipData: (data: TooltipData) => void;
}

const TooltipDataContext = createContext<Context | null>(null);

export const TooltipDataProvider: FC<Props> = ({ children }: Props) => {
  const setTooltipData = useCallback(async (valueObject: TooltipData) => {
    await localStorage.setItem(
      "tooltipData",
      valueObject
        ? JSON.stringify(valueObject)
        : JSON.stringify({ data: null, position: { x: 0, y: 0 } })
    );
    await window.dispatchEvent(new Event("tooltipDataChange"));
  }, []);

  return (
    <TooltipDataContext.Provider value={{ setTooltipData }}>
      {children}
    </TooltipDataContext.Provider>
  );
};

export const useTooltipData = () => useContext(TooltipDataContext);
