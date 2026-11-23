import { Alert, Button, CircularProgress, Typography } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { EmptyState, StatusCenter } from 'design/styled'
import { transl } from 'lib/tool'

interface StatusViewProps {
  status : AppStateStatusType
  error ?: string | null
  onRetry?: () => void
}

const StatusView = ({ status, error, onRetry }: StatusViewProps) => {
  if (status === 'loading') {
    return (
      <StatusCenter>
        <CircularProgress aria-label="Loading" />
      </StatusCenter>
    )
  }

  if (status === 'failed') {
    return (
      <Alert
        severity="error"
        icon={<ErrorOutlineIcon />}
        action={onRetry ? <Button color={'inherit'} onClick={onRetry}>{transl('retry')}</Button> : undefined}
      >
        {error || transl('error.unable_load_page')}
      </Alert>
    )
  }

  return (
    <EmptyState>
      <Typography color="text.secondary">{transl('no_records_yet')}</Typography>
    </EmptyState>
  )
}

export default StatusView
