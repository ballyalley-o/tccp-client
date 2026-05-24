import { useRouteError, isRouteErrorResponse } from 'react-router-dom'
import { Typography, Alert, Button } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { AlertBlock, PageCentered } from '../../design/styled'
import { transl } from 'lib/tool'

const FallbackErrorPage = () => {
  const error = useRouteError()

  const message = isRouteErrorResponse(error)
    ? error.statusText || error.data?.message
    : error instanceof Error
      ? error.message
      : transl('error.generic')

  return (
    <PageCentered maxWidth={'sm'}>
      <AlertBlock>
        <Alert
          action={
            <Button color='inherit' onClick={() => window.location.reload()} size='small'>
              Retry
            </Button>
          }
          icon={<ErrorOutlineIcon />}
          severity='error'
        >
          <Typography component='h1' fontWeight={700} gutterBottom variant='subtitle1'>
            {transl('error.unable_load_page')}
          </Typography>
          <Typography variant='body2'>{message}</Typography>
        </Alert>
      </AlertBlock>
    </PageCentered>
  )
}

export default FallbackErrorPage
