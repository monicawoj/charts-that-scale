import { useState, useMemo } from "react";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Chart from "../Chart";
import Settings from "../Settings";
import { DataProvider } from "../../hooks/useData";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#3949ab",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: { fontFamily: "Lato, -apple-system, sans-serif" },
});

function App() {
  const [chartVersion, setChartVersion] = useState("pure-svg");
  const handleChartVersionChange = useMemo(() => setChartVersion, []);

  return (
    <DataProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            margin: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <AppBar position="relative" sx={{ height: "36px" }}>
            <Toolbar variant="dense" sx={{ minHeight: "36px" }}>
              <Typography sx={{ flexGrow: 1 }}>
                Creating Charts that Scale - React + D3 + PixiJS
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography>Monica Wojciechowska</Typography>
                <IconButton
                  component="a"
                  href="https://github.com/monicawoj/charts-that-scale"
                  target="_blank"
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="github"
                  sx={{ ml: 2 }}
                >
                  <GitHubIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          <Box
            sx={{
              bgcolor: "background.paper",
              // height: "100%",
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <Settings
              chartVersion={chartVersion}
              handleChartVersionChange={handleChartVersionChange}
            />
            <Chart version={chartVersion} />
          </Box>
        </Box>
      </ThemeProvider>
    </DataProvider>
  );
}

export default App;
