const BlogView = ({ blog, handleLike }) => {
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
    </>
  )
}

export default BlogView
