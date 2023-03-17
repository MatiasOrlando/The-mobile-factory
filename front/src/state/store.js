import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userReducer from "./user";
import productsReducer from "./products";

import commentsReducer from "./comments";
import reviewsReducer from "./reviews";

import categoriesReducer from "./categories";
import queryReducer from "./querySearch"
import allProductsReducer from "./allProducts";
import allCustomersReducer from "./allCustomers";


const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user: userReducer,
    products: productsReducer,
    comments: commentsReducer,
    reviews: reviewsReducer,
    categories: categoriesReducer,
    queryData:queryReducer,
    allProducts: allProductsReducer,
    allCustomers: allCustomersReducer
  },
});

export default store;
