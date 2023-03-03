import { configureStore } from "@reduxjs/toolkit";



export const store = configureStore({
    reducer:{
        counter:counterReducer,
        posts:postSlice,
        users:userSlice
    }
})