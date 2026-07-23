import type { Bootcamp, User } from 'types'
import { Box, Button, Link } from '@mui/material'
import { Language as LanguageIcon, ImportContactsSharp as EnrollIcon } from '@mui/icons-material'
import { transl } from 'lib/tool'

interface BootcampCtaGroupBoxProps {
    selected : Bootcamp
    user    ?: User
}

const BootcampCtaGroupBox = ({ selected, user }: BootcampCtaGroupBoxProps) => {
    const isTrainer = user && user?.role === 'trainer'
    return (
   <Box display={'flex'} justifyContent={'flex-end'} gap={2}>
    {selected.website && (
        <Button component={Link} href={selected.website} target={'_blank'} rel={'noreferrer'} startIcon={<LanguageIcon />} variant={'contained'} color={'primary'}>
            {transl('website')}
        </Button>
    )}
    {!isTrainer && (
        <Button component={Link} href={selected.website} target={'_blank'} rel={'noreferrer'} startIcon={<EnrollIcon />} variant={'contained'} color={'warning'}>
            {transl('enroll')}
        </Button>
    )}
    </Box>
  )
}

export default BootcampCtaGroupBox