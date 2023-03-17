import { createAction, createReducer } from "@reduxjs/toolkit";

export const cartProducts = createAction("CART_PRODUCTS");
export const removeProduct = createAction("REMOVE_PRODUCT");
export const resetProducts = createAction("RESET_PRODUCTS");
export const loginProducts = createAction("LOGIN_PRODUCTS");

const initialstate = [];

const reducer = createReducer(initialstate, {
  [cartProducts]: (state, action) => {
    const obj = state.find((e) => e.id === action.payload.id);

    if (obj) {
      obj.shopQuantity = action.payload.shopQuantity;
      return state;
    }

    return [...state, action.payload];
  },
  [resetProducts]: (state, action) => {
    return initialstate;
  },
  [loginProducts]: (state, action) => {
    return action.payload;
  },
  [removeProduct]: (state, action) => {
    state = state.filter((producto) => producto.id !== action.payload.productId);
    return state;
  },
});

export default reducer;
