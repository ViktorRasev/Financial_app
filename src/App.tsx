import "./App.css";
import { FC } from "react";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/styled/GlobalStyles";
import ApiFetch from "./components/ApiFetch";
import Header from "./components/Layout/Header";
import Content from "./components/Layout/Content"
import { darkTheme, lightTheme } from "./components/styled/Theme";
import Playground from "./components/Layout/Playground";

const App: FC = () => {
  const [themeValue, setThemeValue] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
      setThemeValue(themeValue === "light" ? "dark" : "light");
  };

  return (
    <ThemeProvider theme={themeValue === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <div className="App">
        <Header themeValue={themeValue} toggleTheme={toggleTheme} />
        <Content />

        <ApiFetch />

      </div>
        <Playground/>
    </ThemeProvider>
  );
};

export default App;
