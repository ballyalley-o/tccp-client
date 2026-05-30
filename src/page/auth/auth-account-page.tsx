import { Link as RouterLink } from 'react-router-dom'
import { FIELD } from 'config/field.config'
import { useAppDispatch, useAppSelector } from 'app/hook'
import { fetchAccount } from 'app/store/slice'
import { PATH } from 'route/path'
import { Button, Card, CardContent, Divider, Stack, Typography } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import SettingsIcon from '@mui/icons-material/Settings'
import ShieldIcon from '@mui/icons-material/Shield'
import { AppUserAvatar } from 'component/app'
import { RoleChip } from 'component/shared'
import { transl } from 'lib/tool'

const AuthAccountPage = () => {
  const dispatch         = useAppDispatch()
  const { user, status } = useAppSelector((state) => state.auth)
  const canManage        = user?.role === 'admin' || user?.role === 'trainer'
  const displayName      = user ? [user.firstname, user.lastname].filter(Boolean).join(' ') || user.username : ''

  return (
    <Stack spacing={3}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent='space-between' spacing={2}>
        <Stack spacing={0.5}>
          <Typography variant={'h1'}>{transl('nav.user.account')}</Typography>
        </Stack>
        <Button onClick={() => dispatch(fetchAccount())} startIcon={<RefreshIcon />} variant='outlined' disabled={status === 'loading'}>
          {transl('refresh')}
        </Button>
      </Stack>

      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', sm: 'center' }}>
              {user ? <AppUserAvatar user={user} size={72} /> : null}
              <Stack spacing={2} direction={'row'} alignItems={'flex-start'}>
                <Stack>
                  <Typography variant={'h2'}>{displayName}</Typography>
                  <Typography color={'text.secondary'}>{user?.email}</Typography>
                </Stack>
                <RoleChip userRole={user?.role} />
              </Stack>
            </Stack>

            <Divider />

            <Stack spacing={1}>
              {user && FIELD.ACCOUNT(user).map((_u) => (
                <Typography>
                  <strong>{transl(_u.label)}:</strong> {_u.value}
                </Typography>
              ))}
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
              <Button component={RouterLink} to={PATH.AUTH.SETTING} startIcon={<SettingsIcon />} variant={'contained'}>
                {transl('nav.user.setting')}
              </Button>
              {canManage ? (
                <Button component={RouterLink} to={PATH.AUTH.MANAGE} startIcon={<ShieldIcon />} variant={'outlined'}>
                  {transl('nav.user.manage')}
                </Button>
              ) : null}
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}

export default AuthAccountPage
