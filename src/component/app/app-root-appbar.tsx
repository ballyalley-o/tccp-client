
import { Link as RouterLink } from 'react-router-dom'
import { PATH } from 'route/path'
import type { User } from 'types'
import { Toolbar, Stack, Button, Typography } from '@mui/material'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import { AppLogo, AppAccountMenu } from 'component/app'
import { StandardAppbar } from 'design/styled'
import { formatText, transl } from 'lib/tool'

const AppRootAppbar = ({ user }: { user: User | null }) => {
  return (
    <StandardAppbar position={'sticky'} elevation={0}>
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
    </StandardAppbar>
  )
}

export default AppRootAppbar