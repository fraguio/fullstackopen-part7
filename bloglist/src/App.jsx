import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'

import { create, initializeBlogs, like, remove } from './reducers/blogSlice'
import { initializeUser, login, logout } from './reducers/userSlice'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs())
    }
  }, [dispatch, user])

  const handleBlogFormSubmit = async (newBlog) => {
    dispatch(create(newBlog))
    blogFormRef.current.toggleVisibility()
  }

  const handleDelete = async (blog) => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (!ok) return
    dispatch(remove(blog.id))
  }

  const handleLike = async (blog) => {
    dispatch(like(blog))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login(username, password))
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const blogs = useSelector((state) => state.blog)

  return (
    <div>
      {!user && (
        <div>
          <h2>log in to application</h2>
          <Notification />
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            password={password}
            handlePasswordChange={({ target }) => setPassword(target.value)}
          />
        </div>
      )}

      {user && (
        <div>
          <h2>blogs</h2>
          <Notification />

          <p>
            {user.username} logged in{' '}
            <button onClick={handleLogout}>logout</button>
          </p>

          <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
            <BlogForm createBlog={handleBlogFormSubmit} />
          </Togglable>

          <div>
            {[...blogs]
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => {
                return (
                  <Blog
                    key={blog.id}
                    user={user}
                    blog={blog}
                    handleDelete={handleDelete}
                    handleLike={handleLike}
                  />
                )
              })}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
