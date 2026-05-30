import { PATH } from 'route/path'
import { Button, Link } from '@mui/material'
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'
import { transl } from 'lib/tool'

const BackButton = () => {
  return (
    <Button
        component={Link}
        href={PATH.BOOTCAMP.ROOT}
        rel='noreferrer'
        startIcon={<ArrowBackIcon />}
        variant={'text'}
        sx={{ display: 'flex', width: '100px' }}
      >
        {transl('go_back')}
      </Button>
  )
}

export default BackButton