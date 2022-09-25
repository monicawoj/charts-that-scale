import { useRef, useState, useEffect } from "react";
// import Album from "../Album";
import ChartContainer from "../ChartContainer";
import Header from "../Header";
import { DATA_SUBSET_SIZE, CHART_MARGIN, CHART_HEIGHT } from "../../constants";
import rawData from "../../data/ufc-historical-data/raw_total_fight_data.json";
import { DataProvider } from "../../hooks/useData";
import { DimensionsProvider } from "../../hooks/useDimensions";

function App() {
  const calculateTotalFightMinutes = (d) => {
    const [lastRoundFullMinutes, lastRoundSeconds] =
      d.last_round_time.split(":");
    const lastRoundMinutes =
      Number(lastRoundFullMinutes) + Number(lastRoundSeconds) / 60;
    const previousRoundMinutes = 5 * (Number(d.last_round) - 1);
    const totalMinutes = previousRoundMinutes + lastRoundMinutes;

    return totalMinutes;
  };

  const fullData = rawData
    .map((d) => ({
      ...d,
      total_fight_minutes: calculateTotalFightMinutes(d),
    }))
    .filter((d) => d.total_fight_minutes <= 15);

  const slicedData = fullData.slice(1, DATA_SUBSET_SIZE + 1);

  return (
    <DataProvider initialData={slicedData} fullData={fullData}>
      <div className="App">
        {/* <Album /> */}
        <Header />
        <DimensionsProvider height={CHART_HEIGHT} margin={CHART_MARGIN}>
          <ChartContainer />
        </DimensionsProvider>
      </div>
    </DataProvider>
  );
}

export default App;
