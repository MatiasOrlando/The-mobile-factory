import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import itemsReducer from "./items";

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(logger),
  reducer: {
    items:itemsReducer
  },
});

export default store;