
import { Link as RouterLink } from 'react-router-dom'
import { PATH } from 'route/path'
import type { User } from 'types'
import { Toolbar, Stack, Button } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import LoginSharpIcon from '@mui/icons-material/LoginSharp'
import { AppLogo, AppAccountMenu } from 'component/app'
import { StandardAppbar } from 'design/styled'
import { transl } from 'lib/tool'

const AppRootAppbar = ({ user }: { user: User | null }) => {
  return (
    <StandardAppbar position={'sticky'} elevation={0}>
        <Toolbar>
        <AppLogo />

        <Stack direction='row' spacing={1} alignItems='center'>
            <Button component={RouterLink} to={PATH.DASHBOARD} startIcon={<DashboardIcon />} color='inherit'>
            {transl('nav.dashboard')}
            </Button>
            <Button component={RouterLink} to={PATH.BOOTCAMP.ROOT} startIcon={<MenuBookIcon />} color='inherit'>
            {transl('bootcamps')}
            </Button>
            {user ? (
            <AppAccountMenu user={user} />
            ) : (
            <Button component={RouterLink} to={PATH.AUTH.LOG_IN} variant={'outlined'} color={'primary'}>
                <LoginSharpIcon />
            </Button>
            )}
        </Stack>
        </Toolbar>
    </StandardAppbar>
  )
}

export default AppRootAppbar