import { useEffect, useState } from 'react'
import type { Bootcamp, Feedback } from 'types'
import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'app/hook'
import { fetchFeedbacks } from 'app/store/slice'
import { transl } from 'lib/tool'

interface DashboardFeedbackPanelProps {
  bootcamps        : Bootcamp[]
  isAuthenticated  : boolean
}

const getFeedbackAuthor = (feedback: Feedback) => {
  if (!feedback.user || typeof feedback.user === 'string') return 'Learner'
  return feedback.user.firstname || feedback.user.email
}

const getFeedbackBootcamp = (feedback: Feedback) => {
  if (!feedback.bootcamp || typeof feedback.bootcamp === 'string') return 'Bootcamp'
  return feedback.bootcamp.name
}

const DashboardFeedbackPanel = ({ bootcamps }: DashboardFeedbackPanelProps) => {
  const [bootcampId, setBootcampId] = useState('')
  const dispatch                    = useAppDispatch()
  const { items }                   = useAppSelector((state) => state.feedback)

  useEffect(() => {
    if (!bootcampId && bootcamps[0]?._id) {
      setBootcampId(bootcamps[0]._id)
    }
  }, [bootcampId, bootcamps])

  useEffect(() => {
    if (bootcampId) {
      dispatch(fetchFeedbacks({ bootcampId }))
    } else {
      dispatch(fetchFeedbacks(undefined))
    }
  }, [bootcampId, dispatch])

  return (
    <Card>
      <CardContent>
        <Stack spacing={2.5}>
          <Stack spacing={1.5}>
            <Typography variant={'subtitle2'} sx={{ fontWeight: 700 }}>
              {transl(items.length > 1 ? 'dashboard.recent_feedbacks' : 'dashboard.recent_feedback')}
            </Typography>

            {items.slice(0, 3).map((feedback) => (
              <Card key={feedback._id ?? `${feedback.title}-${feedback.rating}`} variant={'outlined'}>
                <CardContent>
                  <Stack spacing={1}>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'flex-start'} spacing={2}>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant={'subtitle2'} sx={{ fontWeight: 700 }}>
                          {feedback.title}
                        </Typography>
                        <Typography variant={'caption'} color={'text.secondary'}>
                          {getFeedbackAuthor(feedback)} on {getFeedbackBootcamp(feedback)}
                        </Typography>
                      </Box>
                      <Typography variant={'body2'} sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
                        {feedback.rating}/10
                      </Typography>
                    </Stack>
                    {feedback.body && (
                      <Typography variant={'body2'} color={'text.secondary'}>
                        {feedback.body}
                      </Typography>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default DashboardFeedbackPanel
