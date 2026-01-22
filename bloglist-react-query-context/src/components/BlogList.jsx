import Blog from './Blog'

import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from '@mui/material'

const BlogList = ({ blogs }) => {
  return (
    <>
      <Typography variant="h4" sx={{ my: 3 }}>
        Blogs
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableBody>
            {[...blogs]
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Blog key={blog.id} blog={blog} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default BlogList
