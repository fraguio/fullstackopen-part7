import { useContext, useEffect, useRef, useState } from 'react'

import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import Header from './components/Header'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Notification from './components/Notification'
import NotificationContext from './NotificationContext'
import { Routes, Route, useMatch } from 'react-router-dom'
import Togglable from './components/Togglable'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import UserContext from './UserContext'
import UserList from './components/UserList'
import userService from './services/users'
import UserView from './components/UserView'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { notificationDispatch } = useContext(NotificationContext)
  const { user, userDispatch } = useContext(UserContext)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (!loggedUserJSON) return

    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    userDispatch({ type: 'LOGIN', payload: user })
  }, [userDispatch])

  const resultBlogs = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    enabled: !!user,
  })

  const resultUsers = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    enabled: !!user,
  })

  const blogs = resultBlogs.data || []
  const users = resultUsers.data || []

  const match = useMatch('/users/:id')
  const selectedUser = match
    ? users.find((u) => u.id === match.params.id)
    : null

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

  const likeMutation = useMutation({
    mutationFn: ({ id, updatedBlog }) => blogService.update(id, updatedBlog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const removeMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const clearLoginForm = () => {
    setUsername('')
    setPassword('')
  }

  const handleBlogFormSubmit = (newBlog) => {
    createBlogMutation.mutate(newBlog)
  }

  const handleDelete = async (blog) => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (!ok) return

    removeMutation.mutate(blog.id)
  }

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
    // Anular el token del usuario
    blogService.setToken(null)
    // Limpiar el estado cacheado por React Query
    queryClient.clear()
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

  if (user && (resultBlogs.isLoading || resultUsers.isLoading)) {
    return <div>loading data...</div>
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
          <Header handleLogout={handleLogout} />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
                    <BlogForm createBlog={handleBlogFormSubmit} />
                  </Togglable>
                  <BlogList
                    blogs={blogs}
                    user={user}
                    handleDelete={handleDelete}
                    handleLike={handleLike}
                  />
                </>
              }
            />
            <Route path="/users" element={<UserList users={users} />} />
            <Route
              path="/users/:id"
              element={<UserView user={selectedUser} />}
            />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
