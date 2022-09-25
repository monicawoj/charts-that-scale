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
  initialData: FightStats[];
  fullData: FightStats[];
  children?: ReactNode;
}

interface Context {
  data: FightStats[];
  fullData: FightStats[];
  setData: Dispatch<FightStats[]>;
}

const DataContext = createContext<Context | null>(null);

export const DataProvider: FC<Props> = ({
  initialData,
  fullData,
  children,
}: Props) => {
  const [data, setData] = useState(initialData);

  return (
    <DataContext.Provider value={{ data, fullData, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
