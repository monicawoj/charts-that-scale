import Layout from "../Layout";
import ChartContainer from "../ChartContainer";
import Header from "../Header";
import { CHART_MARGIN, CHART_HEIGHT } from "../../constants";
import { DataProvider } from "../../hooks/useData";
import { DimensionsProvider } from "../../hooks/useDimensions";

function App() {
  return (
    <DataProvider>
      <div className="App">
        <Layout>
          <Header />
          <DimensionsProvider height={CHART_HEIGHT} margin={CHART_MARGIN}>
            <ChartContainer />
          </DimensionsProvider>
        </Layout>
      </div>
    </DataProvider>
  );
}

export default App;
