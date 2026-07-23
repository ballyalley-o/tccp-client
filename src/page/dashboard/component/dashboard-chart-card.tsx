import { Card, CardContent, Stack, Typography } from '@mui/material'
import { transl, type LocaleKey } from 'lib/tool'

import type { DashboardChartPoint } from '../dashboard'

interface DashboardChartCardProps {
  title   : LocaleKey
  subtitle: LocaleKey
  points  : DashboardChartPoint[]
}

const DashboardChartCard = ({ title, subtitle, points }: DashboardChartCardProps) => {
  const max = Math.max(...points.map((point) => point.value), 1)

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack spacing={2.5}>
          <Stack spacing={0.5}>
            <Typography variant={'h3'}>{transl(title)}</Typography>
            <Typography variant={'body2'} color={'text.secondary'}>
              {transl(subtitle)}
            </Typography>
          </Stack>

          <Stack direction={'row'} spacing={1.25} alignItems={'flex-end'} sx={{ minHeight: 184 }}>
            {points.map((point) => (
              <Stack key={point.label} spacing={1} alignItems={'center'} sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant='caption' sx={{ fontWeight: 700 }}>
                  {point.value}%
                </Typography>
                <Stack
                  justifyContent={'flex-end'}
                  sx={{
                    bgcolor     : 'action.hover',
                    borderRadius: 1,
                    height      : 124,
                    overflow    : 'hidden',
                    width       : '100%',
                  }}
                >
                  <Stack
                    sx={{
                      bgcolor   : 'primary.main',
                      height    : `${Math.max((point.value / max) * 100, 8)}%`,
                      transition: 'height 180ms ease',
                    }}
                  />
                </Stack>
                <Typography variant={'caption'} color={'text.secondary'} noWrap>
                  {transl(point.label)}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default DashboardChartCard
