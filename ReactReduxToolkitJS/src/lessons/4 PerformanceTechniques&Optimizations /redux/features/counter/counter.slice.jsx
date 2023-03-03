import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.count += action.payload;
    },
    incrementByOne: (state) => {
      state.count += 1;
    },
    decrement: (state, action) => {
      state.count -= action.payload;
    },
    decrementByOne: (state) => {
      state.count -= 1;
    },
    reset:(state)=>{
        state.count = 0
    }
  },
});

export const { reset,increment, incrementByOne, decrement, decrementByOne } =
  counterSlice.actions;
export default counterSlice.reducer;
