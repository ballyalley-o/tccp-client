import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'app/hook'
import { fetchTopBootcamps } from 'app/store/slice'
import { PATH } from 'route/path'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid2,
  LinearProgress,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import {
  AssignmentIndSharp,
  BookmarkBorder as BookmarkIcon,
  EmojiEvents as AchievementIcon,
  MoreHoriz as MoreIcon,
  NavigateNext as NextIcon,
  PersonAdd as PersonIcon,
  School as SchoolIcon,
  Speed as SpeedIcon,
  TrendingUp as TrendingIcon,
} from '@mui/icons-material'
import { FillCard, FillCardContent } from 'design/styled'
import { BootcampCard } from 'component/shared/card'
import { StatusView } from 'component/shared/loader'
import { transl } from 'lib/tool'

interface StatCardProps {
  icon     : React.ReactNode
  label    : string
  value    : string | number
  color   ?: string
  subtitle?: string
}

const StatCard = ({ icon, label, value, color = 'primary', subtitle }: StatCardProps) => {
  const theme = useTheme()

  return (
    <Card>
      <CardContent>
        <Stack spacing={1.5}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                borderRadius: 1,
                backgroundColor:
                  color === 'primary'
                    ? theme.palette.primary.main
                    : color === 'success'
                      ? theme.palette.success.main
                      : color === 'warning'
                        ? theme.palette.warning.main
                        : theme.palette.info.main,
                color: 'white',
              }}
            >
              {icon}
            </Box>
          </Stack>
          <Stack>
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

const DashboardPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.auth)
  const { items: bootcamps, status } = useAppSelector((state) => state.bootcamps)

  useEffect(() => {
    dispatch(fetchTopBootcamps())
  }, [dispatch])

  const isStudent = user?.role === 'student'
  const isTrainer = user?.role === 'trainer'

  const firstName = user?.firstname || user?.username || 'Guest'

  return (
    <Stack spacing={4}>
      {/* Welcome Section */}
      <Box>
        <Typography variant='h1' sx={{ mb: 1 }}>
          {transl('message.welcome_back') || 'Welcome back'}, {firstName}!
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          {isStudent ? transl('message.welcome_description_student') : transl('message.welcome_description_trainer')}
        </Typography>
      </Box>

      {/* Stats Section */}
      {isStudent && (
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard icon={<AssignmentIndSharp />} label={'Learning Progress'} value={'45%'} color={'primary'} subtitle={'2 courses active'} />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard icon={<AchievementIcon />} label={'Courses Completed'} value='3' color='success' subtitle='Keep it up!' />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard icon={<TrendingIcon />} label='Study Streak' value='12' color='warning' subtitle='days in a row' />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard icon={<SpeedIcon />} label='Avg. Speed' value='95%' color='info' subtitle='of target pace' />
          </Grid2>
        </Grid2>
      )}

      {isTrainer && (
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard icon={<SchoolIcon />} label='Active Courses' value='4' color='primary' />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard icon={<PersonIcon />} label='Total Students' value='124' color='success' subtitle='across all courses' />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard icon={<AchievementIcon />} label='Avg. Rating' value='4.8' color='warning' subtitle='out of 5.0' />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard icon={<TrendingIcon />} label='Completion Rate' value='87%' color='info' />
          </Grid2>
        </Grid2>
      )}

      {/* Quick Actions */}
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant='h3'>Quick Actions</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              {isStudent && (
                <>
                  <Button variant='contained' startIcon={<SchoolIcon />} onClick={() => navigate(PATH.BOOTCAMP.ROOT)} sx={{ flex: 1 }}>
                    Browse Bootcamps
                  </Button>
                  <Button variant='outlined' startIcon={<BookmarkIcon />} onClick={() => navigate(PATH.COURSE.ROOT)} sx={{ flex: 1 }}>
                    Browse Courses
                  </Button>
                  <Button variant='outlined' startIcon={<MoreIcon />} onClick={() => navigate(PATH.AUTH.ACCOUNT.ROOT)} sx={{ flex: 1 }}>
                    View Profile
                  </Button>
                </>
              )}
              {isTrainer && (
                <>
                  <Button variant='contained' startIcon={<BookmarkIcon />} onClick={() => navigate(PATH.AUTH.ACCOUNT.ROOT)} sx={{ flex: 1 }}>
                    Create Course
                  </Button>
                  <Button variant='outlined' startIcon={<PersonIcon />} onClick={() => navigate(PATH.AUTH.ACCOUNT.ROOT)} sx={{ flex: 1 }}>
                    View Students
                  </Button>
                  <Button variant='outlined' startIcon={<MoreIcon />} onClick={() => navigate(PATH.AUTH.ACCOUNT.ROOT)} sx={{ flex: 1 }}>
                    Analytics
                  </Button>
                </>
              )}
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* Current Learning / Teaching Section */}
      <Box>
        <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 2 }}>
          <Typography variant='h2'>{isStudent ? 'Your Current Courses' : 'Your Courses'}</Typography>
          <Button variant='text' endIcon={<NextIcon />} onClick={() => navigate(PATH.COURSE.ROOT)}>
            {transl('view_all')}
          </Button>
        </Stack>

        <Grid2 container spacing={2}>
          {[1, 2].map((idx) => (
            <Grid2 key={idx} size={{ xs: 12, md: 6 }}>
              <FillCard>
                <FillCardContent>
                  <Stack direction='row' justifyContent='space-between' alignItems='start'>
                    <Box>
                      <Typography variant='h3'>Advanced React Patterns</Typography>
                      <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
                        {isStudent ? 'TechBoot Academy' : '32 students enrolled'}
                      </Typography>
                    </Box>
                    <Chip label={isStudent ? 'In Progress' : 'Active'} color='primary' size='small' />
                  </Stack>

                  <Stack spacing={1}>
                    <Stack direction='row' justifyContent='space-between'>
                      <Typography variant='body2' color='text.secondary'>
                        {isStudent ? 'Progress' : 'Completion'}
                      </Typography>
                      <Typography variant='body2' sx={{ fontWeight: 700 }}>
                        {idx === 1 ? '65%' : '89%'}
                      </Typography>
                    </Stack>
                    <LinearProgress variant='determinate' value={idx === 1 ? 65 : 89} />
                  </Stack>

                  <Divider />

                  <Stack direction='row' spacing={1}>
                    <Button variant='outlined' size='small' sx={{ flex: 1 }}>
                      {isStudent ? 'Continue' : 'View'}
                    </Button>
                  </Stack>
                </FillCardContent>
              </FillCard>
            </Grid2>
          ))}
        </Grid2>
      </Box>

      {/* Featured Bootcamps */}
      <Box>
        <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 2 }}>
          <Box>
            <Typography variant='h2'>{isStudent ? 'Featured Bootcamps' : 'Popular Bootcamps'}</Typography>
            <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
              {isStudent ? 'Discover top-rated bootcamps in your area' : 'See what others are teaching'}
            </Typography>
          </Box>
          <Button variant='text' endIcon={<NextIcon />} onClick={() => navigate(PATH.BOOTCAMP.ROOT)}>
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

      {/* Recommendations Section */}
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Box>
              <Typography variant='h3'>Recommended For You</Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
                {isStudent ? 'Based on your interests and learning goals' : 'Content popular in your teaching areas'}
              </Typography>
            </Box>

            <Stack spacing={1.5}>
              {['Full Stack Web Development', 'Mobile App Development', 'Cloud & DevOps'].map((rec, idx) => (
                <Card key={idx} variant='outlined'>
                  <CardContent>
                    <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
                      <Box>
                        <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
                          {rec}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          {isStudent ? `${12 - idx * 2} students interested` : `${45 + idx * 10} similar bootcamps`}
                        </Typography>
                      </Box>
                      <Button variant='outlined' size='small'>
                        Explore
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  )
}

export default DashboardPage