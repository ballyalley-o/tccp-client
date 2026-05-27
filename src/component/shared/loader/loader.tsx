import { CircularProgress, Stack } from '@mui/material'
import { PageCentered, MonoText } from 'design/styled'
import { transl } from 'lib/tool'

const Loader = () => {
  const _TEXT = `[ ${transl('loading')} ]`
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
