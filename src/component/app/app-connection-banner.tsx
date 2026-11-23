import { useEffect, useState } from 'react'
import { Alert, Button, Snackbar } from '@mui/material'
import { API_CONNECTION_EVENT, checkApiConnection } from 'lib/api'
import { transl } from 'lib/tool'

type ConnectionState = 'connected' | 'offline' | 'unavailable'

const AppConnectionBanner = () => {
  const [state, setState]       = useState<ConnectionState>('connected')
  const [hadFailure, setHadFailure] = useState(false)
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    const update = (event: Event) => {
      const next = (event as CustomEvent<ConnectionState>).detail
      if (next !== 'connected') setHadFailure(true)
      setState(next)
    }
    const offline = () => update(new CustomEvent(API_CONNECTION_EVENT, { detail: 'offline' }))
    const online  = () => {
      void checkApiConnection().catch(() => undefined)
    }

    window.addEventListener(API_CONNECTION_EVENT, update)
    window.addEventListener('offline', offline)
    window.addEventListener('online', online)
    return () => {
      window.removeEventListener(API_CONNECTION_EVENT, update)
      window.removeEventListener('offline', offline)
      window.removeEventListener('online', online)
    }
  }, [])

  const retry = async () => {
    setChecking(true)
    try {
      await checkApiConnection()
    } catch {
      // apiRequest reports the connection state globally.
    } finally {
      setChecking(false)
    }
  }

  const restored = state === 'connected' && hadFailure
  const open     = state !== 'connected' || restored
  const message  = state === 'offline' ? transl('error.offline')
    : state === 'unavailable' ? transl('error.server_unavailable')
      : transl('message.connection_restored')

  return (
    <Snackbar
      open={open}
      autoHideDuration={restored ? 4000 : null}
      onClose={() => restored && setHadFailure(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{ mt: 1 }}
    >
      <Alert
        severity={restored ? 'success' : 'warning'}
        variant={'filled'}
        action={!restored ? (
          <Button color={'inherit'} size={'small'} onClick={retry} disabled={checking}>
            {transl('retry')}
          </Button>
        ) : undefined}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default AppConnectionBanner
