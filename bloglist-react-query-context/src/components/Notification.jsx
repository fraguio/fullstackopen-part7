import { useContext } from 'react'
import NotificationContext from '../NotificationContext'
import { Snackbar, Alert } from '@mui/material'

const Notification = () => {
  const { notification } = useContext(NotificationContext)

  const open = Boolean(notification)

  if (!notification) return null

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        severity={notification.type}
        variant="filled"
        sx={{ width: '100%', boxShadow: 3 }}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  )
}

export default Notification
