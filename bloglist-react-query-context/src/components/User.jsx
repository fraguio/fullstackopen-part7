import { Link } from 'react-router-dom'
import { TableCell, TableRow } from '@mui/material'

const User = ({ user }) => {
  if (!user) return null

  return (
    <TableRow hover>
      <TableCell>
        <Link
          to={`/users/${user.id}`}
          style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 500 }}
        >
          {user.name}
        </Link>
      </TableCell>
      <TableCell align="right">{user.blogs.length}</TableCell>
    </TableRow>
  )
}

export default User
