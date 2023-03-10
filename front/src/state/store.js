import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import itemsReducer from "./items";
import userReducer from "./user";
import productsReducer from "./products";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    items: itemsReducer,
    user: userReducer,
    products: productsReducer,
  },
});

export default store;
