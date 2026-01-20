const UserView = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <>
      <h2>{user.name}</h2>
      <p>
        <b>added blogs</b>
      </p>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </>
  )
}

export default UserView
