import UserContext from '../UserContext'
import { useContext } from 'react'

const AuthHeader = ({ handleLogout }) => {
  const { user } = useContext(UserContext)
  return (
    <b>
      {user.username} logged in <button onClick={handleLogout}>logout</button>
    </b>
  )
}

export default AuthHeader
