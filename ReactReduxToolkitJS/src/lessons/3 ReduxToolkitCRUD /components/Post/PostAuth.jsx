import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUsers } from '../../redux/features/users/user.slice'

const PostAuth = ({userId}) => {

    const users=useSelector(selectAllUsers)
    const author=users.find(user=>user.id===userId)
  return (
    <span>
        By {author ? author.name:"Unkown author"}
    </span>
  )
}

export default PostAuth