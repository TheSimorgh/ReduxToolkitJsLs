import "./App.css";

import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from "./components/Global/Layout";
import PostsList from "./components/Post/PostsList";
import AddPostForm from "./components/Post/AddPostForm";
import EditPostForm from "./components/Post/EditPostForm";
import SinglePostPage from "./components/Post/SinglePostPage";
import UserList from "./components/User/UserList";
import UserPage from "./components/User/UserPage";
function App() {
  
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<PostsList />} />

        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>

        <Route path="user">
          <Route index element={<UserList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>

        {/* Catch all - replace with 404 component if you want */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Route>
    </Routes>
    </div>
  );
}

export default App;
