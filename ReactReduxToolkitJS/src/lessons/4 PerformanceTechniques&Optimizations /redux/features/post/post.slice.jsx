import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

// const initialState =[
//     {id:"1",title:"AAAAA",context:"BBBBB",data:sub(new Date,{minutes:10}).toISOString(),reactions:{thumbsUp:0,wow:0,heart:0,rocker:0,coffee:0}},
//     {id:"2",title:"BBBB",context:"CCCC",data:sub(new Date,{minutes:5}).toISOString(),reactions:{thumbsUp:0,wow:0,heart:0,rocker:0,coffee:0}},

// ]
const url = `https://jsonplaceholder.typicode.com/posts`;
const postsAdapter = createEntityAdapter({sortComparer:(a,b)=>b.date.localeCompare(a.date)})
// const initialState = {
//   posts: [],
//   status: "idle", //`idle`| `loading | `succeeded` | `failed,
//   error: null,
//   count:0
// };

const initialState =postsAdapter.getInitialState( {

  status: "idle", //`idle`| `loading | `succeeded` | `failed,
  error: null,
  count:0
})

export const fetchPosts = createAsyncThunk(`posts/fetchPosts`, async () => {
  try {
    const { data } = await axios.get(url);
    return [...data];
  } catch (error) {
    return error.message;
  }
});
export const addNewPost = createAsyncThunk(
  `posts/addNewPost`,
  async (userdata) => {
    try {
      const { data } = await axios.post(url, userdata);
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const updatePost = createAsyncThunk(
  `posts/updatePost`,
  async (userdata) => {
    const { id } = userdata;
    try {
      const { data } = await axios.put(`${url}/${id}`, userdata);
      return data;
    } catch (error) {
      //return error.message
      return userdata;
    }
  }
);
export const deletePost = createAsyncThunk(
  `posts/deletePost`,
  async (userdata) => {
    const { id } = userdata;
    try {
      const response = await axios.delete(`${url}/${id}`);
      if (response?.status === 200) return userdata;
      return `${response?.status}: ${response?.statusText}`;
    } catch (error) {
      return error.message;
    }
  }
);
export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // postAdded: (state, action) => {
    //   state.push(action.payload)
    // },
    increaseCount(state, action) {
      state.count = state.count + 1
  },
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      // const existingPost = state.posts.find((post) => post.id === postId);
      const existingPost=state.entities[postId]
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });
        //add any getched posts to the array
        // state.posts = state.posts.concat(loadedPosts);
        postsAdapter.upsertMany(state,loadedPosts)
        
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        // Fix for API post IDs:
        // Creating sortedPosts & assigning the id
        // would be not be needed if the fake API
        // returned accurate new post IDs
        const sortedPosts = state.posts.sort((a, b) => {
          if (a.id > b.id) return 1;
          if (a.id < b.id) return -1;
          return 0;
        });
        action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
        // End fix for fake API post IDs

        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          hooray: 0,
          heart: 0,
          rocket: 0,
          eyes: 0,
        };
        console.log(action.payload);
        // state.posts.push(action.payload);
        postsAdapter.addOne(state,action.payload)
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload) {
          console.log(`Update could not complete`);
          console.log(action.payload);
        }
        // const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        // const posts = state.posts.filter((post) => post.id !== id);
        // state.posts = [...posts, action.payload];
        postsAdapter.updateOne(state,action.payload)

      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        // const posts = state.posts.filter((post) => post.id !== id);
        // state.posts = posts;
        postsAdapter.removeOne(state,id)
      });
  },
});


export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const getCount = (state) => state.posts.count;

// export const selectAllPosts = (state) => state.posts.posts;
// export const selectPostById = (state, postId) =>
//   state.posts.posts.find((post) => post.id === postId);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {selectAll:selectAllPosts,selectById:selectPostById,selectIds:selectPostIds}=postsAdapter.getSelectors(state=>state.posts)

  export const selectPostsByUser = createSelector(
    [selectAllPosts, (state, userId) => userId],
    (posts, userId) => posts.filter(post => post.userId === userId)
)

export const { postAdded, reactionAdded,increaseCount } = postSlice.actions;
export default postSlice.reducer;
