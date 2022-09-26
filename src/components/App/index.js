// import Album from "../Album";
import ChartContainer from "../ChartContainer";
import Header from "../Header";
import { CHART_MARGIN, CHART_HEIGHT } from "../../constants";
import { DataProvider } from "../../hooks/useData";
import { DimensionsProvider } from "../../hooks/useDimensions";

function App() {
  return (
    <DataProvider>
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
