import BookIcon from '@mui/icons-material/Book'
import PersonIcon from '@mui/icons-material/Person'
import { Box, TableCell, TableRow } from '@mui/material'

import { AppLink, IconTextWrapper } from '../styles/StyledComponents'

const Blog = ({ blog }) => {
  return (
    <TableRow hover>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <BookIcon fontSize="small" color="action" />
          <AppLink to={`/blogs/${blog.id}`}>{blog.title}</AppLink>
        </Box>
      </TableCell>
      <TableCell align="right" sx={{ color: 'text.secondary' }}>
        <IconTextWrapper
          sx={{
            justifyContent: 'flex-end',
            gap: 1,
          }}
        >
          <PersonIcon fontSize="small" sx={{ color: 'text.disabled' }} />
          <span style={{ color: 'rgba(0, 0, 0, 0.6)' }}>{blog.author}</span>
        </IconTextWrapper>
      </TableCell>
    </TableRow>
  )
}

export default Blog
