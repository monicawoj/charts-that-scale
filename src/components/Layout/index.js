import * as React from "react";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>Creating Charts that Scale - React + D3 + PixiJS</Toolbar>
      </AppBar>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 4,
          pb: 4,
        }}
      >
        {children}
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
