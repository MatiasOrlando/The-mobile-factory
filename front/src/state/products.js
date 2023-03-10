import { createAction, createReducer } from "@reduxjs/toolkit";

export const cartProducts = createAction("CART_PRODUCTS");
export const addToCart = createAction("ADD_TO_CART");
export const removeFromCart = createAction("REMOVE_FROM_CART");

const initialstate = [];

const reducer = createReducer(initialstate, {
  [cartProducts]: (state, action) => {
    state.push(action.payload);
    localStorage.setItem("cart", JSON.stringify(state));
    return state;
  },
  [addToCart]: (state, action) => {
    if (
      state.addedProducts.find((product) => product.id === action.payload.id)
    ) {
      state.message = "Flight already in favorites";
    } else {
      state.addedProducts.push(action.payload);
      state.message = "product added to cart";
    }
  },
  [removeFromCart]: (state, action) => {
    state.addedProducts = state.addedProducts.filter(
      (producto) => producto.id !== action.payload.id
    );
    state.message = "Product removed from cart";
  },
});

export default reducer;
