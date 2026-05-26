import { Link as RouterLink, Outlet } from 'react-router-dom'
import { useAppSelector } from 'app/hook'
import { PATH } from 'route/path'
import { Button, Stack, Toolbar, Typography } from '@mui/material'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import { AppLogo, AppFooter, AppAccountMenu } from 'component/app'
import { AppContent, AppRootBox, StandardAppBar } from 'design/styled'
import { formatText, transl } from 'lib/tool'

const RootLayout = () => {
  const { user }  = useAppSelector((state) => state.auth)

  return (
    <AppRootBox>
      <StandardAppBar position={'sticky'} elevation={0}>
        <Toolbar>
          <AppLogo />

          <Stack direction='row' spacing={1} alignItems='center'>
            <Button component={RouterLink} to={PATH.BOOTCAMP.ROOT} startIcon={<MenuBookIcon />} color='inherit'>
              {transl('bootcamps')}
            </Button>
            {user ? (
              <AppAccountMenu user={user} />
            ) : (
              <Button component={RouterLink} to={PATH.AUTH.LOG_IN} variant={'contained'} color={'warning'}>
                <Typography variant={'body1'}>{formatText(transl('log_in'), 'uppercase')}</Typography>
              </Button>
            )}
          </Stack>
        </Toolbar>
      </StandardAppBar>

      <AppContent maxWidth={false}>
        <Outlet />
      </AppContent>
      <AppFooter />
    </AppRootBox>
  )
}

export default RootLayout
