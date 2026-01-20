import Notification from './Notification'
import UserContext from '../UserContext'

const Header = ({ handleLogout }) => {
  const { user } = useContext(UserContext)
  return (
    <>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </p>
    </>
  )
}

export default Header
