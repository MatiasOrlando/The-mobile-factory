import { createAction, createReducer } from "@reduxjs/toolkit";

export const addReview = createAction("ADD_REVIEW");
export const loginReview = createAction("LOGIN_REVIEW");

const initialState = [];

const reducer = createReducer(initialState, {
  [addReview]: (state, action) => {
    const find = state.find((item) => item.id == action.payload.id);
    if (find) {
      find.review = action.payload.review;
      localStorage.setItem("valoraciones", JSON.stringify(state));
      return state;
    }
    state.push(action.payload);
    localStorage.setItem("valoraciones", JSON.stringify(state));
    return state;
  },
  [loginReview]: (state, action) => {
    return action.payload;
  },
});

export default reducer;
