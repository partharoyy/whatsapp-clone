import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StylesProvider } from "@material-ui/core/styles";
import reducer, { initialState } from "./reducer";
import { StateProvider } from "./StateProvider";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <StylesProvider injectFirst>
        <App />
      </StylesProvider>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
