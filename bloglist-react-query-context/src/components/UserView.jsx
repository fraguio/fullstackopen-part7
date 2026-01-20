import React from 'react'
const UserView = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <React.Fragment>
      <h2>{user.name}</h2>
      <p>
        <b>added blogs</b>
      </p>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </React.Fragment>
  )
}

export default UserView
