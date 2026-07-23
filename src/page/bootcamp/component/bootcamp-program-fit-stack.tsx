import type { Bootcamp, User } from 'types'
import { Stack, Box, Typography, Button, Link } from '@mui/material'
import { LocationOnSharp as LocationOnIcon, Language as LanguageIcon, PaidSharp as PaidIcon, Star as StarIcon } from '@mui/icons-material'
import { MetaStack } from 'design/styled'
import { transl } from 'lib/tool'

const BootcampProgramFitStack = ({ selected, user }: { selected: Bootcamp, user?: User }) => {
  const averageCost = selected?.averageCost                === 0 ? 'N/A' : `${transl('typically_starts_from')} $${selected.averageCost?.toLocaleString()}`
  const rating      = Number(selected?.rating?.toFixed(1)) === 0 ? 'N/A' : transl('not_yet_rated')
  const isTrainer   = user && user?.role                   === 'trainer'
  return (
     <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'} spacing={2}>
          <Box display={{ xs: 'flex', sm: 'none' }} justifyContent={'flex-end'} gap={2} >
            {selected.website && (
              <Button component={Link} href={selected.website} target={'_blank'} rel={'noreferrer'} startIcon={<LanguageIcon />} variant={'contained'} color={'primary'}>
                {transl('website')}
              </Button>)}
            {!isTrainer && (
              <Button component={Link} href={selected.website} target={'_blank'} rel={'noreferrer'} startIcon={<LanguageIcon />} variant={'contained'} color={'warning'}>
                {transl('enroll')}
              </Button>)}
          </Box>
        <Box>
          <Typography variant={'h1'}>{selected.name}</Typography>
          <MetaStack direction={'row'} spacing={2} alignItems={'center'} flexWrap={'wrap'} useFlexGap>
            <Stack direction={'row'} spacing={0.5} alignItems={'center'}>
              <LocationOnIcon color={'action'} fontSize={'small'} />
              <Typography color={'text.secondary'}>{selected.location?.formattedAddress || selected.location?.city || transl('location_pending')}</Typography>
            </Stack>
            <Stack direction={'row'} spacing={0.5} alignItems={'center'}>
              <StarIcon color={'warning'} fontSize={'small'} />
              <Typography fontWeight={700}>{rating}</Typography>
            </Stack>
            <Stack direction={'row'} spacing={0.5} alignItems={'center'}>
              <PaidIcon color={'success'} fontSize={'small'} />
              <Typography fontWeight={700}>{averageCost}</Typography>
            </Stack>
          </MetaStack>
        </Box>
        <Box display={{ xs: 'none', sm: 'flex' }} justifyContent={'flex-end'} gap={2} >
          {selected.website && (
            <Button component={Link} href={selected.website} target={'_blank'} rel={'noreferrer'} startIcon={<LanguageIcon />} variant={'contained'} color={'primary'}>
              {transl('website')}
            </Button>
          )}
          {!isTrainer && (
            <Button component={Link} href={selected.website} target={'_blank'} rel={'noreferrer'} startIcon={<LanguageIcon />} variant={'contained'} color={'warning'}>
              {transl('enroll')}
            </Button>
          )}
        </Box>
      </Stack>
  )
}

export default BootcampProgramFitStack