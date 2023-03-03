import React from 'react'
import PostAuth from './PostAuth'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

const PostItem = ({post}) => {
   
  return (
    <div 
    style={{display:"flex",flexDirection:"column", justifyContent:"space-between", border:"2px solid white ", padding:"3px",margin:"10px"}}
    >
   
      <p>Title:{post.title}</p>
      <p>Content:{post.context}</p>
      <p>Author:{post.userId}</p>
      <PostAuth userId={post.userId}/>
      <TimeAgo timestamp={post.date}/>
      <ReactionButtons post={post }/>

    </div>
  )
}

export default PostItem
