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
    likeBlog(state, action) {
      return state.map((b) => (b.id === action.payload.id ? action.payload : b))
    },
    removeBlog(state, action) {
      return state.filter((b) => b.id !== action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const create = (blog) => async (dispatch) => {
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

export const initializeBlogs = () => async (dispatch) => {
  try {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  } catch {
    dispatch(notify({ type: 'error', message: 'failed to fetch blogs' }))
  }
}

export const like = (blog) => async (dispatch) => {
  const likedBlog = {
    ...blog,
    likes: blog.likes + 1,
    user: blog.user.id,
  }
  const updatedBlog = await blogService.update(blog.id, likedBlog)
  dispatch(likeBlog(updatedBlog))
}

export const remove = (id) => async (dispatch) => {
  await blogService.remove(id)
  dispatch(removeBlog(id))
}

export const { createBlog, likeBlog, removeBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer
