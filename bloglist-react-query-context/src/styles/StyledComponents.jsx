import { styled } from '@mui/material/styles'
import { Link as RouterLink } from 'react-router-dom'

import { Box, Typography } from '@mui/material'

export const AppLink = styled(RouterLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
  fontWeight: 500,
  '&:hover': {
    textDecoration: 'underline',
    color: theme.palette.primary.dark,
  },
}))

export const IconTextWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
}))

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}))

export const PageTitle = (props) => (
  <StyledTypography variant="h4" component="h1" gutterBottom {...props} />
)
