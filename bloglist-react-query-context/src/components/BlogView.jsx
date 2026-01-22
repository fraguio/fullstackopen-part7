import {
  Typography,
  Button,
  Link,
  Box,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import CommentIcon from '@mui/icons-material/Comment'
import CommentForm from './CommentForm'

const BlogView = ({ blog, handleCommentFormSubmit, handleLike }) => {
  if (!blog) return null

  return (
    <Box sx={{ mt: 4 }}>
      <Card variant="outlined" sx={{ mb: 4, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {blog.title}
          </Typography>

          <Link
            href={blog.url}
            target="_blank"
            rel="noopener"
            sx={{ display: 'block', mb: 2 }}
          >
            {blog.url}
          </Link>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography variant="body1">
              likes <b>{blog.likes}</b>
            </Typography>
            <Button
              variant="contained"
              size="small"
              startIcon={<ThumbUpIcon />}
              onClick={() => handleLike(blog)}
            >
              like
            </Button>
          </Box>

          <Typography variant="body2" color="text.secondary">
            added by <b>{blog.user?.name}</b>
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        comments
      </Typography>

      <CommentForm
        blog={blog}
        handleCommentFormSubmit={handleCommentFormSubmit}
      />

      <List sx={{ mt: 2 }}>
        {blog.comments.map((c, index) => (
          <div key={index}>
            <ListItem>
              <ListItemIcon>
                <CommentIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={c} />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    </Box>
  )
}

export default BlogView
