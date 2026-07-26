import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'app/hook'
import { fetchTopBootcamps } from 'app/store/slice'
import { PATH } from 'route/path'
import { Grid2, Stack } from '@mui/material'

import {
  DashboardChartCard,
  DashboardCourseSection,
  DashboardDistributionCard,
  DashboardFeaturedBootcamps,
  DashboardFeedbackPanel,
  DashboardLearningProgressCard,
  DashboardQuickAction,
  DashboardRecommendations,
  DashboardStatCard,
  DashboardWelcome,
} from './component'
import { DASHBOARD_MODELS, getDashboardAudience } from './config/dashboard.config'

const DashboardPage = () => {
  const dispatch                     = useAppDispatch()
  const navigate                     = useNavigate()
  const { user, isAuthenticated }    = useAppSelector((state) => state.auth)
  const { items: bootcamps, status } = useAppSelector((state) => state.bootcamps)
  const model                        = DASHBOARD_MODELS[getDashboardAudience(user)]
  const isStudent                    = user && user.role === 'user'
  const currentCourse                = model?.course && model.course[0]

  useEffect(() => {
    dispatch(fetchTopBootcamps())
  }, [dispatch])

  return (
    <Stack spacing={4}>
      <DashboardWelcome model={model} user={user} />

      {model.stat && (
        <Grid2 container spacing={2}>
        {currentCourse && (
          <Grid2 key={currentCourse.id} size={{ xs: 12, sm: 6, md: 3 }}>
            {isStudent && <DashboardLearningProgressCard course={currentCourse} />}
          </Grid2>
          )}
        {model.stat.map((stat) => (
          <Grid2 key={stat.id} size={{ xs: 12, sm: 6, md: 3 }}>
           <DashboardStatCard {...stat} />
          </Grid2>
        ))}
      </Grid2>)}

      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, lg: 7 }}>
          <DashboardChartCard
            title={model.audience === 'guest' ? 'dashboard.catalogue_interest' : 'dashboard.weekly_activity'}
            subtitle={model.audience === 'trainer' ? 'dashboard.average_progress_day' : 'dashboard.engagement_trend_week'}
            points={model.activity}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 5 }}>
          <DashboardDistributionCard
            title={model.audience === 'trainer' ? 'Learner Mix' : 'Focus Mix'}
            subtitle={model.audience === 'guest' ? 'Popular pathways by browsing share.' : 'Where attention is going right now.'}
            points={model.distribution}
          />
        </Grid2>
      </Grid2>

      <DashboardQuickAction actions={model.action} />

      <DashboardCourseSection
        title={model.currentCourseTitle}
        ctaLabel={model.currentCourseCta}
        courses={model.course}
        onViewAll={() => navigate(model.audience === 'guest' ? PATH.BOOTCAMP.ROOT : PATH.COURSE.ROOT)}
      />
      <DashboardFeaturedBootcamps
        title={model.featuredTitle}
        bootcamps={bootcamps}
        status={status}
        onViewAll={() => navigate(PATH.BOOTCAMP.ROOT)}
      />
      <DashboardFeedbackPanel bootcamps={bootcamps} isAuthenticated={isAuthenticated} />
      <DashboardRecommendations title={model.recommendationTitle} recommendations={model.recommendation} />
    </Stack>
  )
}

export default DashboardPage
