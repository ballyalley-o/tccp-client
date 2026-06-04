import type { ReactNode } from 'react'
import { Box, Card, CardContent, Stack, Typography, useTheme } from '@mui/material'
import type { DashboardTone } from 'page/dashboard/config/dashboard.config'

interface DashboardStatCardProps {
  icon     : ReactNode
  label    : string
  value    : string
  tone     : DashboardTone
  subtitle : string
}

const DashboardStatCard = ({ icon, label, value, tone, subtitle }: DashboardStatCardProps) => {
  const theme = useTheme()
  const color = theme.palette[tone].main

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack spacing={1.5}>
          <Box
            sx={{
              alignItems     : 'center',
              backgroundColor: color,
              color          : 'primary.contrastText',
              display        : 'flex',
              height         : 44,
              justifyContent : 'center',
              borderRadius   : 1,
              width          : 44,
            }}
          >
            {icon}
          </Box>
          <Stack>
            <Typography variant='body2' color='text.secondary'>
              {label}
            </Typography>
            <Typography variant='h4' sx={{ fontWeight: 700 }}>
              {value}
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              {subtitle}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default DashboardStatCard
