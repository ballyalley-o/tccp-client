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
  DashboardQuickActions,
  DashboardRecommendations,
  DashboardStatCard,
  DashboardWelcome,
} from './component'
import { DASHBOARD_MODELS, getDashboardAudience } from './config/dashboard.config'

const DashboardPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.auth)
  const { items: bootcamps, status } = useAppSelector((state) => state.bootcamps)
  const model = DASHBOARD_MODELS[getDashboardAudience(user)]

  useEffect(() => {
    dispatch(fetchTopBootcamps())
  }, [dispatch])

  return (
    <Stack spacing={4}>
      <DashboardWelcome model={model} user={user} />

      <Grid2 container spacing={2}>
        {model.stats.map((stat) => (
          <Grid2 key={stat.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <DashboardStatCard {...stat} />
          </Grid2>
        ))}
      </Grid2>

      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, lg: 7 }}>
          <DashboardChartCard
            title={model.audience === 'guest' ? 'Catalogue Interest' : 'Weekly Activity'}
            subtitle={model.audience === 'trainer' ? 'Average class progress by day.' : 'Engagement trend across the week.'}
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

      <DashboardQuickActions actions={model.actions} />

      <DashboardCourseSection
        title={model.currentCourseTitle}
        ctaLabel={model.currentCourseCta}
        courses={model.courses}
        onViewAll={() => navigate(model.audience === 'guest' ? PATH.BOOTCAMP.ROOT : PATH.COURSE.ROOT)}
      />

      <DashboardFeaturedBootcamps
        title={model.featuredTitle}
        description={model.featuredDescription}
        bootcamps={bootcamps}
        status={status}
        onViewAll={() => navigate(PATH.BOOTCAMP.ROOT)}
      />

      <DashboardRecommendations
        title={model.recommendationTitle}
        message={model.recommendationMessage}
        recommendations={model.recommendations}
      />
    </Stack>
  )
}

export default DashboardPage
