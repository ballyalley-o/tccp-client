import { useEffect, useState, type FormEvent } from 'react'
import type { Bootcamp, Feedback } from 'types'
import { useAppDispatch, useAppSelector } from 'app/hook'
import { createFeedback, fetchFeedbacks } from 'app/store/slice'
import { Alert, CardContent, Stack, Typography } from '@mui/material'
import { FeedbackTransparentcard } from 'design/styled'
import { transl } from 'lib/tool'

import BootcampFeedbackBox from './bootcamp-feedback-box'
import BootcampFeedbackFormCard from './bootcamp-feedback-form-card'

interface BootcampFeedbackCardProps {
  selected: Bootcamp
}

const getFeedbackAuthor = (feedback: Feedback) => {
  if (!feedback.user || typeof feedback.user === 'string') return 'Learner'
  return feedback.user.firstname || feedback.user.email
}

const BootcampFeedbackCard = ({ selected }: BootcampFeedbackCardProps) => {
  const { user, token, isAuthenticated }       = useAppSelector((state) => state.auth)
  const { items, status, createStatus, error } = useAppSelector((state) => state.feedback)
  const [title, setTitle]                      = useState('')
  const [body, setBody]                        = useState('')
  const [rating, setRating]                    = useState<number | null>(8)
  const dispatch                               = useAppDispatch()

  const isAuthor        = (_feedback: Feedback) => user && _feedback.user?._id === user._id
  const authorFeedbacks = user && items.filter((_i) => _i.user?._id === user?._id)
  const hasFeedback     = authorFeedbacks && authorFeedbacks?.length > 0

  useEffect(() => {
    dispatch(fetchFeedbacks({ bootcampId: selected._id }))
  }, [dispatch, selected._id])

  const canSubmit = Boolean(isAuthenticated && user && title.trim() && body.trim() && rating)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const userId = user?._id || user?.id
    if (!canSubmit || !userId || !rating) return

    try {
      await dispatch(createFeedback({
        bootcampId: selected._id,
        token,
        draft: {
          title: title.trim(),
          body : body.trim(),
          rating,
          bootcamp: selected._id,
          user    : userId,
        },
      })).unwrap()

      setTitle('')
      setBody('')
      setRating(8)
      await dispatch(fetchFeedbacks({ bootcampId: selected._id })).unwrap()
    } catch {
      // The feedback slice exposes the request error below the heading.
    }
  }

  return (
    <FeedbackTransparentcard>
      <CardContent>
        <Stack spacing={2}>
          {error && <Alert severity={'error'}>{error}</Alert>}

          {isAuthenticated && !hasFeedback ? (
            <BootcampFeedbackFormCard title={title} setTitle={setTitle} body={body} setBody={setBody} handleSubmit={handleSubmit} rating={rating} setRating={setRating} canSubmit={canSubmit} createStatus={createStatus} />
          ) : hasFeedback ? null : (
            <Alert severity={'info'}>{transl('log_in_add_feedback')}</Alert>
          )}

          <Stack spacing={2}>
            <Typography variant={'h3'}>{transl('feedbacks')}</Typography>
            {status === 'loading' && <Typography color={'text.secondary'}></Typography>}
            {status !== 'loading' && !items.length && <Typography color={'text.secondary'}>{transl('no_feedback_bootcamp')}</Typography>}

            {items.map((feedback) => {
              const author = getFeedbackAuthor(feedback)
              return (
                <BootcampFeedbackBox feedback={feedback} author={author} isAuthor={isAuthor} />
              )
            })}
          </Stack>
        </Stack>
      </CardContent>
    </FeedbackTransparentcard>
  )
}

export default BootcampFeedbackCard
