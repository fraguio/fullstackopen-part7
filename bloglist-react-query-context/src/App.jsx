import { useContext, useEffect, useRef, useState } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Notification from './components/Notification'
import NotificationContext from './NotificationContext'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const { notification, notificationDispatch } = useContext(NotificationContext)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    // Define y llama a una función asíncrona dentro del callback.
    // useEffect no puede ser async
    const fetchBlogs = async () => {
      try {
        // Uso de await dentro de la función asíncrona
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      } catch (error) {
        showNotification('error', `failed to fetch blogs ${error}`)
      }
    }

    if (user) {
      fetchBlogs()
    }
  }, [user])

  const clearLoginForm = () => {
    setUsername('')
    setPassword('')
  }

  const handleBlogFormSubmit = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(createdBlog))

      blogFormRef.current.toggleVisibility()

      showNotification(
        'success',
        `a new blog "${createdBlog.title}" by ${createdBlog.author} added`
      )
    } catch (error) {
      showNotification('error', error.response.data.error)
    }
  }

  const handleDelete = async (blog) => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (!ok) return

    await blogService.remove(blog.id)
    setBlogs((blogs) => blogs.filter((b) => b.id !== blog.id))
  }

  const handleLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    const returnedBlog = await blogService.update(blog.id, updatedBlog)

    setBlogs((blogs) => blogs.map((b) => (b.id === blog.id ? returnedBlog : b)))
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
    notificationDispatch({
      type: 'SHOW_NOTIFICATION',
      payload: {
        type,
        message,
      },
    })
    setTimeout(
      () =>
        notificationDispatch({
          type: 'HIDE_NOTIFICATION',
        }),
      5000
    )
  }

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
