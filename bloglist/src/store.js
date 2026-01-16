import { configureStore } from '@reduxjs/toolkit'

import notificationSlice from './reducers/notificationSlice'

const store = configureStore({
  reducer: {
    notification: notificationSlice,
  },
})

export default store
