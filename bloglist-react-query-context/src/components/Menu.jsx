import AuthHeader from './AuthHeader'
import { Link } from 'react-router-dom'

import { AppBar, Box, Button, Stack, Toolbar } from '@mui/material'

const Menu = ({ handleLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Stack direction="row" spacing={2}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
          >
            blogs
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/users"
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
          >
            users
          </Button>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        <AuthHeader handleLogout={handleLogout} />
      </Toolbar>
    </AppBar>
  )
}

export default Menu
