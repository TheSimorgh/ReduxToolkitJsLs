import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { extendedApiSlice } from './redux/features/post/post.slice';
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { usersApiSlice } from './redux/features/users/user.slice';
// import { fetchUsers } from './redux/features/users/user.slice'
// import { fetchPosts } from './redux/features/post/post.slice';
// store.dispatch(fetchPosts());
// store.dispatch(fetchUsers());
store.dispatch(extendedApiSlice.endpoints.getPosts.initiate());
store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  </Provider>
</React.StrictMode>,

)
