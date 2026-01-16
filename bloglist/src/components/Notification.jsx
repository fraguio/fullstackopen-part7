import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => {
    return state.notification
  })
  if (!notification) return null

  return (
    <div className={`notification ${notification.type}`}>
      {notification.message}
    </div>
  )
}

export default Notification
