import React from "react";
import {createRoot} from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./app/App";
import { ThemeProvider } from "@emotion/react";
import theme from "./app/MaterialTheme";
import {
  BrowserRouter as Router,

} from "react-router-dom";
import { CssBaseline } from "@mui/material";
import "./css/index.css";
import ContextProvider from "./app/context/ContextProvider";


const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
      </ContextProvider>
    </Provider>
  </React.StrictMode>,
);
