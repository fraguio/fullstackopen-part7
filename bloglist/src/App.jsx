import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { notify } from './reducers/notificationSlice'
import {
  afterDelete,
  afterLike,
  create,
  initializeBlogs,
} from './reducers/blogSlice'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const dispatch = useDispatch()
  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs())
    }
  }, [user])

  const clearLoginForm = () => {
    setUsername('')
    setPassword('')
  }

  const handleBlogFormSubmit = async (newBlog) => {
    dispatch(create(newBlog))
    blogFormRef.current.toggleVisibility()
  }

  const handleDelete = async (blog) => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (!ok) return

    await blogService.remove(blog.id)
    dispatch(afterDelete(blogs, blog.id))
  }

  const handleLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    const returnedBlog = await blogService.update(blog.id, updatedBlog)
    dispatch(afterLike(blogs, returnedBlog))
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      clearLoginForm()
    } catch (error) {
      showNotification('error', error.response.data.error)
      clearLoginForm()
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const showNotification = (type, message) => {
    dispatch(notify({ type, message }, 5))
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
