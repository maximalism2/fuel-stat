import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import reducers from "../reducers/reducers";

const composeStore = () => {
  const middlewares = [thunk];

  if (process.env.NODE_ENV === "development") {
    const logger = createLogger({
      collapsed: true,
    });

    middlewares.push(logger);
  }

  return createStore(reducers, applyMiddleware(...middlewares));
};

const store = composeStore();
export default store;
