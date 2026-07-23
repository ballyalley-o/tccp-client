import { Box, Card, CardContent, Stack, Typography, useTheme } from '@mui/material'
import { AssignmentIndSharp } from '@mui/icons-material'
import { transl, type LocaleKey } from 'lib/tool'
import type { Course } from 'types'

interface DashboardLearningProgressCardProps {
  course  : Course
  value   : string
  tone    : AppThemeType
  subtitle: LocaleKey
}

const DashboardLearningProgressCard = ({ course, value, tone, subtitle }: DashboardLearningProgressCardProps) => {
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
            {(<AssignmentIndSharp />)}
          </Box>
          <Stack>
            <Typography variant={'body2'} color={'text.secondary'}>
              {course.title}
            </Typography>
            <Typography variant='h4' sx={{ fontWeight: 700 }}>
              {value}
            </Typography>
            <Typography variant={'caption'} color={'text.secondary'}>
              {transl(subtitle)}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default DashboardLearningProgressCard
