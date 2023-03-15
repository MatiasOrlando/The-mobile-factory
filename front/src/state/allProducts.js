import { createAction, createReducer } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const addAllP = createAction("ADD_ALL_P");
export const removeAllP = createAction("REMOVE_ALL_P");
export const resetAllP = createAction("RESET_ALL_P");
export const loginAllP = createAction("LOGIN_ALL_P");
export const updateAllP = createAction("UPDATE_ALL_P");

const initialstate = [];

const reducer = createReducer(initialstate, {
  [addAllP]: (state, action) => {
    const obj = state.find((e) => e.id === action.payload.id);

    if (obj) {
      toast.error("Ya existe ese producto", {
        duration: "180",
        style: {
          background: "white",
          color: "black",
        },
      });
      return state;
    }

    return [...state, action.payload];
  },
  [resetAllP]: (state, action) => {
    return initialstate;
  },
  [loginAllP]: (state, action) => {
    return action.payload;
  },
  [removeAllP]: (state, action) => {
    action.payload.forEach((element) => {
      state = state.filter((producto) => producto.id !== element);
    });
    return state;
  },
  [updateAllP]: (state, action) => {
    const obj = state.find((e) => e.id === action.payload.id);
    Object.assign(obj, action.payload)
    return state;
  },
});

export default reducer;
