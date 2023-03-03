import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../../redux/features/users/user.slice'
import { Link } from 'react-router-dom'

const UsersList = () => {
    const users = useSelector(selectAllUsers)

    const renderedUsers = users.map(user => (
        <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
        </li>
    ))

    return (
        <section>
               <h2 style={{textAlign:"center"}}>Users</h2>

            <ul style={{display:'flex',flexDirection:"column", alignItems:"center",justifyContent:"flex-start"}}>{renderedUsers}</ul>
        </section>
    )
}

export default UsersList