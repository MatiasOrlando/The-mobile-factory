import { createAction, createReducer } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const addCategories = createAction("ADD_CATEGORIES");
export const removeCategories = createAction("REMOVE_CATEGORIES");
export const resetCategories = createAction("RESET_CATEGORIES");
export const loginCategories = createAction("LOGIN_CATEGORIES");
export const updateCategories = createAction("UPDATE_CATEGORIES");

const initialstate = [];

const reducer = createReducer(initialstate, {
  [addCategories]: (state, action) => {
    const obj = state.find((e) => e.id === action.payload.id);

    if (obj) {
      toast.error("Ya existe esa categoría", {
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
  [resetCategories]: (state, action) => {
    return initialstate;
  },
  [loginCategories]: (state, action) => {
    return action.payload;
  },
  [removeCategories]: (state, action) => {
    action.payload.forEach((element) => {
      state = state.filter((producto) => producto.id !== element);
    });
    return state;
  },
  [updateCategories]: (state, action) => {
    const obj = state.find((e) => e.id === action.payload.id);
    obj.name = action.payload.name;
    obj.description = action.payload.description;
    return state;
  },
});

export default reducer;
