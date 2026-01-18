import { configureStore } from '@reduxjs/toolkit'

import blogSlice from './reducers/blogSlice'
import notificationSlice from './reducers/notificationSlice'
import userSlice from './reducers/userSlice'

const store = configureStore({
  reducer: {
    notification: notificationSlice,
    user: userSlice,
  },
})

export default store
