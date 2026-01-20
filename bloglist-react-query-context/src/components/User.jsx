import React from 'react'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <React.Fragment>
      <td>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </td>
      <td style={{ paddingLeft: '20px' }}>{user.blogs.length}</td>
    </React.Fragment>
  )
}

export default User
