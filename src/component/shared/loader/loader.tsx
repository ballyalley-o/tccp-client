import { CircularProgress, Stack } from '@mui/material'
import { PageCentered, MonoText } from 'design/styled'

const Loader = () => {
  const _TEXT = '[ loading ]'
  return (
    <PageCentered maxWidth={'lg'}>
      <Stack alignItems={'center'} spacing={2}>
        <CircularProgress aria-label={'loading_circular'} />
        <MonoText color={'text.secondary'} variant={'body2'}>{_TEXT}</MonoText>
      </Stack>
    </PageCentered>
  )
}

export default Loader
