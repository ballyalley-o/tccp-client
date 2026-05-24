import type { Bootcamp } from 'types/model'
import { Link as RouterLink } from 'react-router-dom'
import { Button, Chip, Divider, Stack, Typography } from '@mui/material'
import BusinessIcon from '@mui/icons-material/Business'
import PaidIcon from '@mui/icons-material/Paid'
import StarIcon from '@mui/icons-material/Star'
import { CardTitle, FillCard, FillCardContent, GrowText, IconTile, TruncateBox } from 'design/styled'
import { transl } from 'lib/tool'

interface BootcampCardProps {
  bootcamp: Bootcamp
}

const BootcampCard = ({ bootcamp }: BootcampCardProps) => {
  const location = bootcamp.location?.city
    ? `${bootcamp.location.city}${bootcamp.location.state ? `, ${bootcamp.location.state}` : ''}`
    : bootcamp.location?.formattedAddress

  return (
    <FillCard>
      <FillCardContent>
        <Stack direction="row" spacing={1.5} alignItems="flex-start">
          <IconTile>
            <BusinessIcon />
          </IconTile>
          <TruncateBox>
            <CardTitle variant={"h3"}>
              {bootcamp.name}
            </CardTitle>
            <Typography variant="body2" color={"text.secondary"} noWrap>
              {location || transl('remote_or_pending')}
            </Typography>
          </TruncateBox>
        </Stack>

        <GrowText color={"text.secondary"}>
          {bootcamp.description}
        </GrowText>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {bootcamp.careers.slice(0, 3).map((career) => (
            <Chip key={career} label={career} size="small" variant="outlined" />
          ))}
        </Stack>

        <Divider />

        <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <StarIcon color="warning" fontSize="small" />
            <Typography variant="body2" fontWeight={700}>
              {bootcamp.rating?.toFixed?.(1) ?? '0.0'}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <PaidIcon color="success" fontSize="small" />
            <Typography variant="body2" fontWeight={700}>
              ${bootcamp.averageCost?.toLocaleString() ?? '0'}
            </Typography>
          </Stack>
          <Button component={RouterLink} to={`/bootcamp/${bootcamp.slug}`} size="small" variant="contained">
            {transl('view')}
          </Button>
        </Stack>
      </FillCardContent>
    </FillCard>
  )
}


export default BootcampCard