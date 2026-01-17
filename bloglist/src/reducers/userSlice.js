import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { notify } from './notificationSlice'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const initializeUser = () => async (dispatch) => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}

export const login = (username, password) => async (dispatch) => {
  try {
    const user = await loginService.login({ username, password })
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch(setUser(user))
  } catch (error) {
    dispatch(notify({ type: 'error', message: error.response.data.error }))
  }
}

export const logout = () => async (dispatch) => {
  window.localStorage.removeItem('loggedBlogAppUser')
  blogService.setToken(null)
  dispatch(setUser(null))
}

export const { setUser } = userSlice.actions
export default userSlice.reducer
