import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PostItem from './PostItem'
import { selectAllPosts } from '../../redux/features/post/post.slice'
import { selectAllUsers } from '../../redux/features/users/user.slice'

const PostList = () => {
    const posts=useSelector(state=>state.posts)
    // const {users}=useSelector(state=>state.users)
     const users=useSelector(selectAllUsers)
    // const orderedPosts =posts.slice().sort((a,b)=>b.date.localeCompare(a.date))
    console.log(users);
    const posts2=useSelector(selectAllPosts)

   
  return (
    <div style={{display:"flex", justifyContent:"start",gap:"4px"}}>
        <div>
        <h1>POSTS</h1>
        {posts.map((post,i)=>(
            <PostItem post={post} key={i} />

        ))}
                <h2>Users</h2>
        
          <h1>POSTS 2</h1>
           {posts2.map((post,i)=>(
            <PostItem post={post} key={i} />
        ))}

        </div>
        <div>
        <h1>USERS</h1>

        {users.map((e,i)=>(
<div key={e.id} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
<span>ID: {e.id} ||</span>
                <p > Name: {e.name}</p>
</div>
            ))}
        </div>

    </div>
  )
}

export default PostList