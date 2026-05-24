import { CircularProgress, Stack, Typography } from '@mui/material'
import { PageCentered } from 'design/styled'

const Loader = () => {
  return (
    <PageCentered maxWidth="sm">
      <Stack alignItems="center" spacing={2}>
        <CircularProgress aria-label="Loading page" />
        <Typography color="text.secondary" variant="body2">
          Loading...
        </Typography>
      </Stack>
    </PageCentered>
  )
}

export default Loader
