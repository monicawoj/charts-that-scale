import {
  createContext,
  useState,
  FC,
  ReactNode,
  Dispatch,
  useContext,
} from "react";
import { FightStats } from "../types/data";
import rawData from "../data/ufc-historical-data/raw_total_fight_data.json";
import { DATA_SUBSET_SIZE } from "../constants";

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

const getTotalFightMinutes = (d: FightStats) => {
  const [lastRoundFullMinutes, lastRoundSeconds] = d.last_round_time.split(":");
  const lastRoundMinutes =
    Number(lastRoundFullMinutes) + Number(lastRoundSeconds) / 60;
  const previousRoundMinutes = 5 * (Number(d.last_round) - 1);
  const totalMinutes = previousRoundMinutes + lastRoundMinutes;

  return totalMinutes;
};

const getModifiedFightType = (d: FightStats) => {
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

  const weights = orderedFightTypes
    .map((weight) => {
      if (d.Fight_type.includes(weight)) {
        return weight;
      }

      return null;
    })
    .filter((weight) => weight != null);

  return weights.length ? weights[0] : "Other";
};

export const DataProvider: FC<Props> = ({ children }: Props) => {
  const fullData = (rawData as FightStats[])
    .map((d: FightStats) => ({
      ...d,
      total_fight_minutes: getTotalFightMinutes(d),
      cleaned_fight_type: getModifiedFightType(d),
    }))
    .filter((d) => d.cleaned_fight_type !== "Other")
    .filter(
      (d) => d.total_fight_minutes && d.total_fight_minutes <= 15
    ) as FightStats[];

  const slicedData = fullData.slice(1, DATA_SUBSET_SIZE + 1);

  const [data, setData] = useState<FightStats[]>(slicedData as FightStats[]);

  return (
    <DataContext.Provider value={{ data, fullData, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
