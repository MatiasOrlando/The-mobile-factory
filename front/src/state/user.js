import { createAction,createReducer } from "@reduxjs/toolkit";

export const setUser=createAction('SET_USER')

const initialstate={}
 
const reducer = createReducer(initialstate,{
    [setUser]: (state,action)=>{
        return action.payload;
    }
})

export default reducer;