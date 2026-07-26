import type { DashboardCourse } from 'page/dashboard/dashboard'
import { Card, CardContent, Stack, Typography, useTheme } from '@mui/material'
import { AssignmentIndSharp } from '@mui/icons-material'
import { transl } from 'lib/tool'
import { DashboardIconBox } from 'design/styled'

interface DashboardLearningProgressCardProps {
  course  : DashboardCourse
}

const DashboardLearningProgressCard = ({ course }: DashboardLearningProgressCardProps) => {
  const theme = useTheme()
  const color = theme.palette[course.tone].main

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack spacing={1.5}>
          <DashboardIconBox color={color}>
            {(<AssignmentIndSharp />)}
          </DashboardIconBox>
          <Stack>
            <Typography variant={'body2'} color={'text.secondary'}>
              {course.title}
            </Typography>
            <Typography variant={'h4'} sx={{ fontWeight: 700 }}>
              {course.progress}
            </Typography>
            <Typography variant={'caption'} color={'text.secondary'}>
              {transl(course.subtitle)}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default DashboardLearningProgressCard
