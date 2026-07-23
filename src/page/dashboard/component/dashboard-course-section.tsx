import { Box, Button, Chip, Divider, Grid2, LinearProgress, Stack, Typography } from '@mui/material'
import { NavigateNext as NextIcon } from '@mui/icons-material'
import { FillCard, FillCardContent } from 'design/styled'
import type { DashboardCourse } from 'page/dashboard/dashboard'
import { transl, type LocaleKey } from 'lib/tool'

interface DashboardCourseSectionProps {
  title    : LocaleKey
  ctaLabel : string
  courses  : DashboardCourse[]
  onViewAll: () => void
}

const DashboardCourseSection = ({ title, ctaLabel, courses, onViewAll }: DashboardCourseSectionProps) => (
  <Box>
    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 2 }}>
      <Typography variant={'h2'}>{transl(title)}</Typography>
      <Button variant='text' endIcon={<NextIcon />} onClick={onViewAll}>
        {transl('view_all')}
      </Button>
    </Stack>

    <Grid2 container spacing={2}>
      {courses.map((course) => (
        <Grid2 key={course.id} size={{ xs: 12, md: 6 }}>
          <FillCard>
            <FillCardContent>
              <Stack direction='row' justifyContent='space-between' alignItems='flex-start' spacing={2}>
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant={'h3'}>{course.title}</Typography>
                  <Typography variant={'body2'} color={'text.secondary'} sx={{ mt: 0.5 }}>
                    {course.meta}
                  </Typography>
                </Box>
                <Chip label={course.status} color={'primary'} size={'small'} />
              </Stack>

              <Stack spacing={1}>
                <Stack direction={'row'} justifyContent={'space-between'}>
                  <Typography variant={'body2'} color={'text.secondary'}>
                  {transl('progress')}
                  </Typography>
                  <Typography variant={'body2'} sx={{ fontWeight: 700 }}>
                    {course.progress}%
                  </Typography>
                </Stack>
                <LinearProgress variant={'determinate'} value={course.progress} />
              </Stack>

              <Divider />
              <Button variant='outlined' size='small'>
                {ctaLabel}
              </Button>
            </FillCardContent>
          </FillCard>
        </Grid2>
      ))}
    </Grid2>
  </Box>
)

export default DashboardCourseSection
