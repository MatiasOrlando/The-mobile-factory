import { createAction, createReducer, current } from "@reduxjs/toolkit";

export const queryProducts = createAction("QUERY_PRODUCTS");

const initialstate = [];

const reducer = createReducer(initialstate, {
    [queryProducts]: (state, action) => {
        return action.payload
    }
})
export default reducer