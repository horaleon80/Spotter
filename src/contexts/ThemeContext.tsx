import React, { createContext, useState, useMemo, ReactNode } from "react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

const ThemeContext = createContext({
  toggleTheme: () => {},
});

const ThemeContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
          primary: {
            main: isDarkMode ? "#ffffff" : "#000000",
          },
          secondary: {
            main: isDarkMode ? "#b0b0b0" : "#505050",
          },
          background: {
            default: isDarkMode ? "#000000" : "#ffffff",
            paper: isDarkMode ? "#121212" : "#f5f5f5",
          },
          text: {
            primary: isDarkMode ? "#ffffff" : "#000000",
            secondary: isDarkMode ? "#b0b0b0" : "#505050",
          },
        },
      }),
    [isDarkMode]
  );

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };
