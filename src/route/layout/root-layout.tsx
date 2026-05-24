import { GLOBAL } from 'config/global.config'
import { Link as RouterLink, Outlet, useNavigate } from 'react-router-dom'
import { logout } from 'app/store/slice/auth/auth-slice'
import { useAppDispatch, useAppSelector } from 'app/hook'
import { PATH } from 'route/path'
import { Button, IconButton, Stack, Toolbar, Tooltip } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import ShieldIcon from '@mui/icons-material/Shield'
import { AppContent, AppRootBox, BrandLink, StandardAppBar } from 'design/styled'
import { LogoImg } from 'design/styled'
import { transl } from 'lib/tool'
import { ASSET_DIR } from 'config/dir'

const AppShell = () => {
  const dispatch  = useAppDispatch()
  const navigate  = useNavigate()
  const { user }  = useAppSelector((state) => state.auth)
  const canManage = user?.role === 'admin' || user?.role === 'trainer'

  const handleLogout = async () => {
    await dispatch(logout())
    navigate(PATH.ROOT)
  }

  return (
    <AppRootBox>
      <StandardAppBar position={'sticky'} elevation={0}>
        <Toolbar>
          <BrandLink to={PATH.ROOT}>
            <LogoImg src={ASSET_DIR.LOGO_PNG} alt={GLOBAL.APP_NAME} />
          </BrandLink>

          <Stack direction='row' spacing={1} alignItems='center'>
            <Button component={RouterLink} to={PATH.BOOTCAMP.ROOT} startIcon={<MenuBookIcon />} color='inherit'>
              {transl('bootcamps')}
            </Button>
            {canManage ? (
              <Button component={RouterLink} to={PATH.AUTH.MANAGE} startIcon={<ShieldIcon />} color='inherit'>
                {transl('manage')}
              </Button>
            ) : null}
            {user ? (
              <Tooltip title={transl('log_out')}>
                <IconButton aria-label={'log-out'} onClick={handleLogout}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Button component={RouterLink} to={PATH.AUTH.LOG_IN} variant='contained'>
                {transl('log_in')}
              </Button>
            )}
          </Stack>
        </Toolbar>
      </StandardAppBar>

      <AppContent maxWidth={false}>
        <Outlet />
      </AppContent>
    </AppRootBox>
  )
}

export default AppShell