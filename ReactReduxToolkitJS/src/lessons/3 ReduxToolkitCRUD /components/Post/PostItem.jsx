import React from 'react'
import PostAuth from './PostAuth'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { Link } from 'react-router-dom'
import { deletePost } from '../../redux/features/post/post.slice'
import { useDispatch } from 'react-redux'

const PostItem = ({post}) => {
   const dispatch=useDispatch()
  return (

    <article>

   
    <h2>{post.title}</h2>
      <p className="excerpt">Content:{post.body}</p>
      <p>ID:{post.id}</p>
      <p className="postCredit">
      <Link to={`post/${post.id}`}>View Post</Link>
       <PostAuth userId={post.userId}/>
      <TimeAgo timestamp={post.date}/>
 </p>
    <button style={{padding:"4px"}} onClick={()=>  dispatch(deletePost({ id: post.id })).unwrap()
}>Delete</button>
      <ReactionButtons post={post }/>

      </article>
  )
}

export default PostItem
