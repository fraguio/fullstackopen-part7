import { TableCell, TableRow } from '@mui/material'

import { AppLink } from '../styles/StyledComponents'

const User = ({ user }) => {
  if (!user) return null

  return (
    <TableRow hover>
      <TableCell>
        <AppLink to={`/users/${user.id}`}>{user.name}</AppLink>
      </TableCell>
      <TableCell align="right">{user.blogs.length}</TableCell>
    </TableRow>
  )
}

export default User
