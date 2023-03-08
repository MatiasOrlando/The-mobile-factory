import { createAction,createReducer } from "@reduxjs/toolkit";

export const getItemsAction=createAction('GETITEMSACTION')

const initialstate={
    items:[]
}
 
const itemsReducer=createReducer(initialstate,{
    [getItemsAction]:(state,action)=>{
        
    }
})

export default itemsReducer;