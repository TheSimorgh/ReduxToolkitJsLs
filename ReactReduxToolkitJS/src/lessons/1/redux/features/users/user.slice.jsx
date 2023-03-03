import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState ={
  users:[  {id:"1",name:"AAAAA"}]
}
   



export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // userAdded: (state, action) => {
    //   state.push(action.payload)
    // },
    userAdded: {
       reducer (state, action) {
            state.users.push(action.payload)
          },
          prepare(name){
            return{
                payload:{
                    id:nanoid(),
                    name,
                }
            }
          }
    }

  },
});
export const selectAllUsers=(state)=>state.users.users
export const { userAdded } =
userSlice.actions;
export default userSlice.reducer;
