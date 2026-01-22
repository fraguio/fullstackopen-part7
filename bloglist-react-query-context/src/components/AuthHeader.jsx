import { useContext } from 'react'
import UserContext from '../UserContext'
import { Button, Typography, Box, Chip } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'

const AuthHeader = ({ handleLogout }) => {
  const { user } = useContext(UserContext)

  if (!user) return null

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
        {user.name || user.username} logged In
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={handleLogout}
        startIcon={<LogoutIcon />}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' },
        }}
      >
        logout
      </Button>
    </Box>
  )
}

export default AuthHeader
