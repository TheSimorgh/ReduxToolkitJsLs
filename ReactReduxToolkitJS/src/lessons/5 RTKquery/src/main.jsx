import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { apiSlice } from './redux/features/todo/api.slice';
// import { Provider } from 'react-redux'
// import { store } from './redux/store'

// import { fetchUsers } from './redux/features/users/user.slice'
// import { fetchPosts } from './redux/features/post/post.slice';


// store.dispatch(fetchPosts());
// store.dispatch(fetchUsers());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  {/* <Provider store={store}> */}
   <ApiProvider api={apiSlice}>

   
     <App />
      
     </ApiProvider>
  {/* </Provider> */}
</React.StrictMode>,

)
