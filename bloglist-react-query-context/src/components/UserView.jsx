import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Divider,
} from '@mui/material'
import BookIcon from '@mui/icons-material/Book'

const UserView = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <>
      <Typography variant="h4" component="h2" sx={{ my: 3 }}>
        {user.name}
      </Typography>

      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        added blogs
      </Typography>

      <Paper elevation={2}>
        <List>
          {user.blogs.map((b, index) => (
            <div key={b.id}>
              <ListItem>
                <ListItemIcon>
                  <BookIcon color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={b.title}
                  primaryTypographyProps={{ variant: 'body1', fontWeight: 500 }}
                />
              </ListItem>

              {index < user.blogs.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </div>
          ))}
        </List>
      </Paper>
    </>
  )
}

export default UserView
