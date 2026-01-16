import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { notify } from './notificationSlice'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const afterDelete = (blogs, id) => {
  return async (dispatch) => {
    dispatch(setBlogs(blogs.filter((b) => b.id !== id)))
  }
}

export const afterLike = (blogs, likedBlog) => {
  return async (dispatch) => {
    dispatch(
      setBlogs(blogs.map((b) => (b.id === likedBlog.id ? likedBlog : b)))
    )
  }
}

export const create = (blog) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogService.create(blog)
      dispatch(createBlog(createdBlog))
      dispatch(
        notify({
          type: 'success',
          message: `a new blog "${createdBlog.title}" by ${createdBlog.author} added`,
        })
      )
    } catch (error) {
      dispatch(notify({ type: 'error', message: error.response.data.error }))
    }
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    } catch {
      dispatch(notify({ type: 'error', message: 'failed to fetch blogs' }))
    }
  }
}

export const { createBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer
