import './App.css'
import Counter from './components/Counter/Counter'
import AddPostForm from './components/Post/AddPostForm'
import PostList from './components/Post/PostList'

function App() {

  return (
    <div className="App">
      <Counter/>
      <AddPostForm/>
      <PostList/>
    </div>
  )
}

export default App
