import { createAsyncThunk, createSlice,  nanoid } from "@reduxjs/toolkit";
import axios from "axios";

// const initialState ={
//   users:[  {id:"1",name:"AAAAA"}]
// }
const initialState ={
  users:[ ],
  status: "idle", //`idle`| `loading | `succeeded` | `failed,
  error: null,
}
const url = `https://jsonplaceholder.typicode.com/users`;
  

export const fetchUsers = createAsyncThunk(`posts/fetchUsers`, async () => {
  try {
    const { data } = await axios.get(url);
    return data
  } catch (error) {
    return error.message;
  }
});

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
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
             const loadedUsers = action.payload
          state.users = state.users.concat(loadedUsers);
      }).addCase(fetchUsers.rejected,(state,action)=>{
        state.status="failed"
        state.error=action.error.message
      })
  },

});
export const selectAllUsers=(state)=>state.users.users
export const getUsersStatus = (state) => state.users.status;
export const getUsersError = (state) => state.users.error;


export const selectUserById = (state, userId) =>
  state.users.users.find((user) => user.id === userId);


export const { userAdded } =
userSlice.actions;
export default userSlice.reducer;
