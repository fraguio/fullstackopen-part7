import { Link } from 'react-router-dom'

import BookIcon from '@mui/icons-material/Book'
import PersonIcon from '@mui/icons-material/Person'
import { Box, TableCell, TableRow } from '@mui/material'

const Blog = ({ blog }) => {
  return (
    <TableRow hover>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <BookIcon fontSize="small" color="action" />
          <Link
            to={`/blogs/${blog.id}`}
            style={{
              textDecoration: 'none',
              color: '#1976d2',
              fontWeight: 500,
            }}
          >
            {blog.title}
          </Link>
        </Box>
      </TableCell>
      <TableCell align="right" sx={{ color: 'text.secondary' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 1,
          }}
        >
          <PersonIcon fontSize="small" sx={{ color: 'text.disabled' }} />
          <span style={{ color: 'rgba(0, 0, 0, 0.6)' }}>{blog.author}</span>
        </Box>
      </TableCell>
    </TableRow>
  )
}

export default Blog
