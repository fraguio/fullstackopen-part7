import AuthHeader from './AuthHeader'
import { Link } from 'react-router-dom'

const Menu = ({ handleLogout }) => {
  const menuContainer = {
    backgroundColor: '#e5e5e5',
    marginBottom: 25,
    padding: 6,
  }

  const padding = {
    paddingRight: 6,
  }

  return (
    <div style={menuContainer}>
      <Link to="/" style={padding}>
        blogs
      </Link>
      <Link to="/users" style={padding}>
        users
      </Link>
      <AuthHeader handleLogout={handleLogout} />
    </div>
  )
}

export default Menu
