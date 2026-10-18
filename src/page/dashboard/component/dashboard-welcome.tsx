import { Box, Stack, Typography } from '@mui/material'
import { transl }                 from 'lib/tool'
import type { DashboardModel }    from 'page/dashboard/dashboard'
import type { User }              from 'types'

interface DashboardWelcomeProps {
  model: DashboardModel
  user : User | null
}

const DashboardWelcome = ({ model, user }: DashboardWelcomeProps) => {
  const name = user?.firstname || user?.username || 'Guest'
  const welcome = model.audience === 'guest'
    ? transl('message.welcome')
    : transl('dashboard.welcome_back')

  // const roleId   = user?.role
  // const userRole = AuthUser

  return (
    <Box>
      <Stack spacing={1}>
        <Typography variant={'h1'}>
          {welcome || model.welcomeTitleFallback}, {name}!
        </Typography>
        <Typography variant={'body1'} color={'text.secondary'}>
          {transl('dashboard.welcome_message_user')}
        </Typography>
      </Stack>
    </Box>
  )
}

export default DashboardWelcome
