import { Link } from 'react-router-dom'

const User = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <>
      <td>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </td>
      <td style={{ paddingLeft: '20px' }}>{user.blogs.length}</td>
    </>
  )
}

export default User
