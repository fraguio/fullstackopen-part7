import Blog from './Blog'

const BlogList = ({ blogs, user, handleDelete, handleLike }) => {
  return (
    <>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            user={user}
            blog={blog}
            handleDelete={handleDelete}
            handleLike={handleLike}
          />
        ))}
    </>
  )
}

export default BlogList
