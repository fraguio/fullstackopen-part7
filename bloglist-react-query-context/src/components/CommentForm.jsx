import { useState } from 'react'
import { TextField, Button, Box } from '@mui/material'

const CommentForm = ({ blog, handleCommentFormSubmit }) => {
  const [comment, setComment] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (comment.trim().length === 0) {
      setError('Comment cannot be empty')
      return
    }
    handleCommentFormSubmit(blog.id, comment)
    setComment('')
    setError(null)
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', mb: 3 }}
    >
      <TextField
        label="write a comment..."
        variant="outlined"
        size="small"
        fullWidth
        value={comment}
        error={!!error}
        helperText={error}
        onChange={({ target }) => {
          if (target.value.trim().length > 0) setError(null)
          setComment(target.value)
        }}
      />
      <Button type="submit" variant="outlined" sx={{ height: '40px' }}>
        add comment
      </Button>
    </Box>
  )
}

export default CommentForm
