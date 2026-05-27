import { useRouteError, isRouteErrorResponse } from 'react-router-dom'
import { Typography, Alert, Button, Stack } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { AppLogo } from 'component/app'
import { AlertBlock, FallbackBgContainer, MonoText, LogoBox } from 'design/styled'
import { transl } from 'lib/tool'
import { GLOBAL } from 'config/global.config'

const FallbackErrorPage = () => {
  const error    = useRouteError()
  const dateTime = new Date().toISOString()
  const message  = isRouteErrorResponse(error)
    ? error.statusText || error.data?.message
    : error instanceof Error
      ? error.message
      : transl('error.generic')

  return (
    <FallbackBgContainer maxWidth={'xl'}>
      <Stack spacing={4} width={'100%'} alignItems={'center'}>
        <LogoBox flexDirection={'column'}>
          <AppLogo/>
        </LogoBox>
        <AlertBlock sx={{ width: '100%', maxWidth: 520 }}>
          <Alert
            action={<Button color='inherit' onClick={() => window.location.reload()} size={'small'}>{transl('retry')}</Button>}
            icon={<ErrorOutlineIcon />}
            severity={'error'}>
            <Typography component='h1' fontWeight={700} gutterBottom variant='subtitle1'>
              {transl('error.unable_load_page')}
            </Typography>
            <Typography variant={'body2'}>{message}</Typography>
          </Alert>
          <Stack width={'100%'}>
            <MonoText variant={'caption'} color={'primary'}>{GLOBAL.APP_VERSION}</MonoText>
            <MonoText variant={'caption'} color={'primary'}>{dateTime}</MonoText>
          </Stack>
        </AlertBlock>
      </Stack>
    </FallbackBgContainer>
  )
}

export default FallbackErrorPage
