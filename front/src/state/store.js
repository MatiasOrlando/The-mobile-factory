import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import itemsReducer from "./items";
import userReducer from "./user";

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(logger),
  reducer: {
    items:itemsReducer,
    user: userReducer
  },
});

export default store;