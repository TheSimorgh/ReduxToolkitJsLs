import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counter.slice";
import postSlice from "./features/post/post.slice";
import userSlice from "./features/users/user.slice";



export const store = configureStore({
    reducer:{
        counter:counterReducer,
        posts:postSlice,
        users:userSlice
    }
})