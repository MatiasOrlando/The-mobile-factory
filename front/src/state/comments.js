import { createAction, createReducer } from "@reduxjs/toolkit";

export const addComment = createAction("ADD_COMMENT");
export const loginComment = createAction("LOGIN_COMMENT");

const initialState = [];

const reducer = createReducer(initialState, {
  [addComment]: (state, action) => {
    const find = state.find((item) => item.id == action.payload.id);
    if (find) {
      find.commentaries.push(action.payload.commentaries[0]);
      localStorage.setItem("comentarios", JSON.stringify(state));
      return state;
    }
    state.push(action.payload);
    localStorage.setItem("comentarios", JSON.stringify(state));
    return state;
  },
  [loginComment]: (state, action) => {
    return action.payload;
  },
});

export default reducer;
