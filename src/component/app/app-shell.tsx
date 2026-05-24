import { GLOBAL } from 'config/global.config'
import { Link as RouterLink, Outlet, useNavigate } from 'react-router-dom'
import { logout } from 'app/store/slice/auth/auth-slice'
import { useAppDispatch, useAppSelector } from 'app/hook'
import { AppBar, Button, IconButton, Stack, Toolbar, Tooltip, Typography } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import SchoolIcon from '@mui/icons-material/School'
import ShieldIcon from '@mui/icons-material/Shield'
import { AppContent, AppRootBox, BrandLink } from 'design/styled'
import { transl } from 'lib/tool'

const AppShell = () => {
  const dispatch  = useAppDispatch()
  const navigate  = useNavigate()
  const { user }  = useAppSelector((state) => state.auth)
  const canManage = user?.role === 'admin' || user?.role === 'trainer'

  const handleLogout = async () => {
    await dispatch(logout())
    navigate('/')
  }

  return (
    <AppRootBox>
      <AppBar position='sticky' color={'transparent'} elevation={0}>
        <Toolbar>
          <BrandLink to='/'>
            <SchoolIcon />
            <Typography variant={'h5'} fontWeight={800} noWrap fontStyle={'italic'}>
              {GLOBAL.APP_NAME}
            </Typography>
          </BrandLink>

          <Stack direction='row' spacing={1} alignItems='center'>
            <Button component={RouterLink} to='/' startIcon={<MenuBookIcon />} color='inherit'>
              {transl('bootcamps')}
            </Button>
            {canManage ? (
              <Button component={RouterLink} to='/manage' startIcon={<ShieldIcon />} color='inherit'>
                {transl('manage')}
              </Button>
            ) : null}
            {user ? (
              <Tooltip title='Sign out'>
                <IconButton aria-label='Sign out' onClick={handleLogout}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Button component={RouterLink} to='/login' variant='contained'>
                {transl('log_in')}
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      <AppContent maxWidth={false}>
        <Outlet />
      </AppContent>
    </AppRootBox>
  )
}

export default AppShell