import { useNavigate }                from 'react-router-dom'
import { PATH }                       from 'route/path'
import { Link }                       from '@mui/material'
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'
import { transl }                     from 'lib/tool'
import { Flex100Button }              from 'design/styled'

const BackButton = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate(PATH.BOOTCAMP.ROOT)
    }
  }


  return (
    <Flex100Button
      component={Link}
      onClick={handleBack}
      rel={'noreferrer'}
      startIcon={<ArrowBackIcon />}
      variant={'text'}
    >
      {transl('go_back')}
    </Flex100Button>
  )
}

export default BackButton