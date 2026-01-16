import { configureStore } from '@reduxjs/toolkit'

import blogSlice from './reducers/blogSlice'
import notificationSlice from './reducers/notificationSlice'

const store = configureStore({
  reducer: {
    blog: blogSlice,
    notification: notificationSlice,
  },
})

export default store
