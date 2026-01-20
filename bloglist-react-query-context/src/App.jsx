import { useContext, useEffect, useRef, useState } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Notification from './components/Notification'
import NotificationContext from './NotificationContext'
import Togglable from './components/Togglable'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import UserContext from './UserContext'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { notificationDispatch } = useContext(NotificationContext)
  const { user, userDispatch } = useContext(UserContext)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({
        type: 'LOGIN',
        payload: user,
      })
      blogService.setToken(user.token)
    }
  }, [])

  const clearLoginForm = () => {
    setUsername('')
    setPassword('')
  }

  const queryClient = useQueryClient()

  const createBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (createdBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      blogFormRef.current.toggleVisibility()

      showNotification(
        'success',
        `a new blog "${createdBlog.title}" by ${createdBlog.author} added`
      )
    },
    onError: (error) => {
      showNotification('error', error.response.data.error)
    },
  })

  const handleBlogFormSubmit = (newBlog) => {
    createBlogMutation.mutate(newBlog)
  }

  const removeMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const handleDelete = async (blog) => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (!ok) return

    removeMutation.mutate(blog.id)
  }

  const likeMutation = useMutation({
    mutationFn: ({ id, updatedBlog }) => blogService.update(id, updatedBlog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const handleLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    likeMutation.mutate({ id: blog.id, updatedBlog })
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      userDispatch({
        type: 'LOGIN',
        payload: user,
      })
      clearLoginForm()
    } catch (error) {
      showNotification('error', error.response.data.error)
      clearLoginForm()
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    userDispatch({
      type: 'LOGOUT',
    })
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

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = result.data || []

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
