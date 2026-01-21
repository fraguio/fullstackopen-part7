import { useState } from 'react'

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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          data-testid="comment"
          type="text"
          value={comment}
          onChange={({ target }) => {
            const value = target.value
            if (value.trim().length > 0) {
              setError(null)
            }
            setComment(value)
          }}
        />
        <button type="submit">add comment</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  )
}

export default CommentForm
