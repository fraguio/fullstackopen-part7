import CommentForm from './CommentForm'

const BlogView = ({ blog, handleCommentFormSubmit, handleLike }) => {
  if (!blog) {
    return null
  }

  return (
    <>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </div>
      <div>
        likes <span data-testid="likes-count">{blog.likes}</span>{' '}
        <button onClick={() => handleLike(blog)}>like</button>
      </div>
      <div>{`added by ${blog.user?.name}`}</div>
      <h2>comments</h2>
      <CommentForm
        blog={blog}
        handleCommentFormSubmit={handleCommentFormSubmit}
      />
      <ul>
        {blog.comments.map((c, index) => (
          <li key={index}>{c}</li>
        ))}
      </ul>
    </>
  )
}

export default BlogView
