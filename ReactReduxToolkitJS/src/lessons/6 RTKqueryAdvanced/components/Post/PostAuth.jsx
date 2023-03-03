import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUsers } from '../../redux/features/users/user.slice'
import { Link } from 'react-router-dom'

const PostAuth = ({userId}) => {

    const users=useSelector(selectAllUsers)
    const author=users.find(user=>user.id===userId)
  return (
    
    // <span>
    //     By {author ? author.name:"Unkown author"}
    // </span>
    <span>
      By {author ? <Link to={`/user/${userId}`}>{author.name}</Link>: "Unknown author"}
    </span>
  )
}

export default PostAuth