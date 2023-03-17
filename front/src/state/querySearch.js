import { createAction, createReducer } from "@reduxjs/toolkit";

export const queryProducts = createAction("QUERY_PRODUCTS");
export const queryReset = createAction("QUERY_RESET");

const initialstate = [];

const reducer = createReducer(initialstate, {
    [queryProducts]: (state, action) => {
        return action.payload
    },
    [queryReset]: (state, action) => {
        return initialstate
    },
})
export default reducer