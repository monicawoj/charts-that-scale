import Container from "@mui/material/Container";
import Layout from "../Layout";
import Chart from "../Chart";
import Header from "../Header";
import { DataProvider } from "../../hooks/useData";

function App() {
  return (
    <DataProvider>
      <div className="App">
        <Layout>
          <Container>
            <Header />
          </Container>
          {/* <Chart version="animated-svg" /> */}
          {/* <Chart version="static-pixi-no-svg" /> */}
          {/* <Chart version="pure-svg-overlay" /> */}
          {/* <Chart version="static-pixi-with-svg" /> */}
          {/* <Chart version="animated-pixi-with-svg" /> */}
          {/* <Chart version="animated-pixi-with-tooltip" /> */}
          {/* <Chart version="animated-pixi-with-brush" /> */}
          <Chart version="pixi-and-svg-conditional-render" />
        </Layout>
      </div>
    </DataProvider>
  );
}

export default App;
