import "./App.css";

import { Routes, Route } from 'react-router-dom';
import Layout from "./components/Global/Layout";
import PostsList from "./components/Post/PostsList";
import AddPostForm from "./components/Post/AddPostForm";
import EditPostForm from "./components/Post/EditPostForm";
import SinglePostPage from "./components/Post/SinglePostPage";
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
        </Route>
      </Routes>
    </div>
  );
}

export default App;
