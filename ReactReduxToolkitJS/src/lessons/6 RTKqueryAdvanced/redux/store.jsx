import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/api.slice";



export const store = configureStore({
    reducer:{
 
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware:getDefaultMiddleware=>getDefaultMiddleware().concat(apiSlice.middleware)
})