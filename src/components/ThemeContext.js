import React, { createContext, useContext, useState, useMemo } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                // Light Mode
                background: {
                  default: "#ffffff",
                  paper: "#ffffff",
                },
                text: {
                  primary: "#121212",
                  secondary: "gray",
                  sec: "white",
                },
                footer: {
                  main: "#ffffff",
                },
                hero: {
                  main: "#000000",
                },
                border: {
                  main: "black",
                },
              }
            : {
                // Dark Mode
                background: {
                  default: "#000000",
                  paper: "#000000",
                },
                text: {
                  primary: "#ffffff",
                },
                footer: {
                  main: "#000000",
                },
                hero: {
                  main: "#3a3a3a",
                },
                border: {
                  main: "white",
                },
              }),
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
