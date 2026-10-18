import { useEffect, useState }                           from 'react'
import { useNavigate }                                   from 'react-router-dom'
import { ACTIVE_LOCALE_KEY }                             from 'config/locale.config'
import { useAppDispatch, useAppSelector }                from 'app/hook'
import { fetchTopBootcamps }                             from 'app/store/slice'
import { PATH }                                          from 'route/path'
import { Alert, Button, CircularProgress, Grid2, Stack } from '@mui/material'
import { apiRequest, asQueryString }                     from 'lib/api'
import { transl }                                        from 'lib/tool'

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
import { toDashboardModel, getDashboardAudience, type DashboardResponse } from './config/dashboard.config'

import type { DashboardModel }       from './dashboard'

const DashboardPage = () => {
  const dispatch                         = useAppDispatch()
  const navigate                         = useNavigate()
  const { user, isAuthenticated, token } = useAppSelector((state) => state.auth)
  const { items: bootcamps, status }     = useAppSelector((state) => state.bootcamps)
  const audience                         = getDashboardAudience(user)
  const requestKey                       = JSON.stringify([user?._id, audience, token])
  const [result, setResult]              = useState<{ key: string; model?: DashboardModel; error?: string } | null>(null)
  const [attempt, setAttempt]            = useState(0)
  const model                            = result?.key       === requestKey ? result.model : undefined
  const isStudent                        = user && audience === 'user'
  const currentCourse                    = model?.course && model.course[0]

  useEffect(() => {
    dispatch(fetchTopBootcamps())
  }, [dispatch])

  useEffect(() => {
    const controller = new AbortController()
    setResult(null)
    apiRequest<DashboardResponse>(`/dashboard${asQueryString({ locale: ACTIVE_LOCALE_KEY })}`, {
      token,
      signal: controller.signal,
    }).then((response) => {
      if (!response.success) throw new Error(transl('error.generic'))
      if (!controller.signal.aborted) setResult({ key: requestKey, model: toDashboardModel(response.data) })
    }).catch((error: unknown) => {
      if (!controller.signal.aborted) setResult({ key: requestKey, error: error instanceof Error ? error.message : transl('error.generic') })
    })
    return () => controller.abort()
  }, [audience, token, requestKey, attempt])

  if (result?.key === requestKey && result.error) {
    return <Alert severity="error" action={<Button color="inherit" onClick={() => setAttempt((value) => value + 1)}>Retry</Button>}>{result.error}</Alert>
  }
  if (!model) return <Stack alignItems="center" sx={{ py: 8 }}><CircularProgress /></Stack>

  return (
    <Stack spacing={4}>
      <DashboardWelcome model={model} user={user} />

      {model?.stat && (
        <Grid2 container spacing={2}>
        {currentCourse && (
          <Grid2 key={currentCourse.id} size={{ xs: 12, sm: 6, md: 3 }}>
            {isStudent && <DashboardLearningProgressCard course={currentCourse} />}
          </Grid2>
          )}
        {model?.stat.map((stat) => (
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
