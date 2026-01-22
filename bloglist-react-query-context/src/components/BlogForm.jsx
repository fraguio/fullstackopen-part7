import { useState } from 'react'
import { TextField, Button, Typography, Box, Paper } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    createBlog({
      title,
      author,
      url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Paper sx={{ p: 3, mb: 3, maxWidth: 400 }} variant="outlined">
      <Typography variant="h6" sx={{ mb: 2 }}>
        Create new blog
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label="Title"
          variant="outlined"
          size="small"
          fullWidth
          data-testid="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          required
        />
        <TextField
          label="Author"
          variant="outlined"
          size="small"
          fullWidth
          data-testid="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          required
        />
        <TextField
          label="URL"
          variant="outlined"
          size="small"
          fullWidth
          data-testid="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          sx={{ mt: 1 }}
        >
          create
        </Button>
      </Box>
    </Paper>
  )
}

export default BlogForm
