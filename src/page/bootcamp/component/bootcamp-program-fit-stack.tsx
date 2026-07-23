import type { Bootcamp, User } from 'types'
import { Stack, Box, Typography } from '@mui/material'
import { LocationOnSharp as LocationOnIcon, PaidSharp as PaidIcon, Star as StarIcon } from '@mui/icons-material'
import { MetaStack } from 'design/styled'
import { transl } from 'lib/tool'

import BootcampCtaGroupBox from './bootcamp-cta-group-box'

const BootcampProgramFitStack = ({ selected, user }: { selected: Bootcamp, user?: User }) => {
  const averageCost = selected?.averageCost                === 0 ? 'N/A' : `${transl('typically_starts_from')} $${selected.averageCost?.toLocaleString()}`
  const rating      = Number(selected?.rating?.toFixed(1)) === 0 ? 'N/A' : transl('not_yet_rated')
  return (
     <Stack spacing={2}>
        <BootcampCtaGroupBox selected={selected} user={user} />
        <Box sx={{ order: { xs: 2, sm: 1 } }}>
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
      </Stack>
  )
}

export default BootcampProgramFitStack
