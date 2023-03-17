import { createAction, createReducer } from "@reduxjs/toolkit";

export const removeAllCust = createAction("REMOVE_ALL_CUST");
export const resetAllCust = createAction("RESET_ALL_CUST");
export const loginAllCust = createAction("LOGIN_ALL_CUST");
export const updateAllCust = createAction("UPDATE_ALL_CUST");

const initialstate = [];

const reducer = createReducer(initialstate, {
  [resetAllCust]: (state, action) => {
    return initialstate;
  },
  [loginAllCust]: (state, action) => {
    return action.payload;
  },
  [removeAllCust]: (state, action) => {
    
    state = state.filter((producto) => producto.id !== action.payload.id);
    
    return state;
  },
  [updateAllCust]: (state, action) => {
    const obj = state.find((e) => e.id === action.payload.id);
    Object.assign(obj, action.payload)
    return state;
  },
});

export default reducer;
