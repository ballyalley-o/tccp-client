import { Box, Card, CardContent, Stack, Typography, useTheme } from '@mui/material'
import type { DashboardChartPoint } from 'page/dashboard/config/dashboard.config'

interface DashboardDistributionCardProps {
  title   : string
  subtitle: string
  points  : DashboardChartPoint[]
}

const DashboardDistributionCard = ({ title, subtitle, points }: DashboardDistributionCardProps) => {
  const theme = useTheme()
  const total = points.reduce((sum, point) => sum + point.value, 0) || 1
  const palette = [
    theme.palette.primary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.info.main,
  ]
  let offset = 0
  const gradient = points
    .map((point, index) => {
      const start = offset
      offset += (point.value / total) * 100
      return `${palette[index % palette.length]} ${start}% ${offset}%`
    })
    .join(', ')

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack spacing={2.5}>
          <Stack spacing={0.5}>
            <Typography variant='h3'>{title}</Typography>
            <Typography variant='body2' color='text.secondary'>
              {subtitle}
            </Typography>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems='center'>
            <Box
              aria-hidden
              sx={{
                aspectRatio    : '1 / 1',
                background     : `conic-gradient(${gradient})`,
                borderRadius   : '50%',
                flexShrink     : 0,
                maxWidth       : 164,
                position       : 'relative',
                width          : '52%',
                '&::after'     : {
                  backgroundColor: 'background.paper',
                  borderRadius   : '50%',
                  content        : '""',
                  inset          : 24,
                  position       : 'absolute',
                },
              }}
            />

            <Stack spacing={1.25} sx={{ width: '100%' }}>
              {points.map((point, index) => (
                <Stack key={point.label} direction='row' alignItems='center' justifyContent='space-between' spacing={2}>
                  <Stack direction='row' spacing={1} alignItems='center' sx={{ minWidth: 0 }}>
                    <Box
                      sx={{
                        bgcolor     : palette[index % palette.length],
                        borderRadius: 0.75,
                        height      : 10,
                        width       : 10,
                      }}
                    />
                    <Typography variant='body2' noWrap>
                      {point.label}
                    </Typography>
                  </Stack>
                  <Typography variant='body2' sx={{ fontWeight: 700 }}>
                    {point.value}%
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default DashboardDistributionCard
