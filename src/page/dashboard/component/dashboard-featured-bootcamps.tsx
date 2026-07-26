import { Box, Button, Grid2, Stack, Typography } from '@mui/material'
import { NavigateNext as NextIcon } from '@mui/icons-material'
import { BootcampCard } from 'component/shared/card'
import { StatusView } from 'component/shared/loader'
import { transl, type LocaleKey } from 'lib/tool'
import type { Bootcamp } from 'types'

interface DashboardFeaturedBootcampsProps {
  title    ?: LocaleKey
  bootcamps : Bootcamp[]
  status    : AppStateStatusType
  onViewAll : () => void
}

const DashboardFeaturedBootcamps = ({ title, bootcamps, status, onViewAll }: DashboardFeaturedBootcampsProps) => (
  <Box>
    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ mb: 2 }}>
     {title && (
        <Box>
          <Typography variant={'h2'}>{transl(title)}</Typography>
        </Box>
      )}
      <Button variant={'text'} endIcon={<NextIcon />} onClick={onViewAll}>
        {transl('view_all')}
      </Button>
    </Stack>

    {status === 'loading' || status === 'failed' ? (
      <StatusView status={status} />
    ) : (
      <Grid2 container spacing={2}>
        {bootcamps.slice(0, 3).map((bootcamp) => (
          <Grid2 key={bootcamp._id} size={{ xs: 12, md: 6, lg: 4 }}>
            <BootcampCard bootcamp={bootcamp} />
          </Grid2>
        ))}
      </Grid2>
    )}
  </Box>
)

export default DashboardFeaturedBootcamps
