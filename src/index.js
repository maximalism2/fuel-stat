import React from "react";
import { Provider } from "react-redux";
import store from "./lib/store";

import { App } from "./components/main";
import "./style/index.css";

export default function Entry() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
