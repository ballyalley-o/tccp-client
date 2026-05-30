import type { Bootcamp } from 'types'
import { Stack, Box, Typography, Button, Link } from '@mui/material'
import { LocationOnSharp as LocationOnIcon, Language as LanguageIcon, PaidSharp as PaidIcon, Star as StarIcon } from '@mui/icons-material'
import { MetaStack } from 'design/styled'
import { transl } from 'lib/tool'

const BootcampProgramFitStack = ({ selected }: { selected: Bootcamp }) => {
  return (
     <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'} spacing={2}>
        <Box>
          <Typography variant={'h1'}>{selected.name}</Typography>
          <MetaStack direction={'row'} spacing={2} alignItems={'center'} flexWrap='wrap' useFlexGap>
            <Stack direction={'row'} spacing={0.5} alignItems={'center'}>
              <LocationOnIcon color={'action'} fontSize={'small'} />
              <Typography color='text.secondary'>{selected.location?.formattedAddress || selected.location?.city || 'Location pending'}</Typography>
            </Stack>
            <Stack direction={'row'} spacing={0.5} alignItems={'center'}>
              <StarIcon color='warning' fontSize={'small'} />
              <Typography fontWeight={700}>{selected.rating.toFixed(1)}</Typography>
            </Stack>
            <Stack direction={'row'} spacing={0.5} alignItems={'center'}>
              <PaidIcon color='success' fontSize={'small'} />
              <Typography fontWeight={700}>${selected.averageCost.toLocaleString()}</Typography>
            </Stack>
          </MetaStack>
        </Box>
        {selected.website ? (
          <Button component={Link} href={selected.website} target={'_blank'} rel={'noreferrer'} startIcon={<LanguageIcon />} variant={'contained'} color={'warning'}>
           {transl('website')}
          </Button>
        ) : null}
      </Stack>
  )
}

export default BootcampProgramFitStack