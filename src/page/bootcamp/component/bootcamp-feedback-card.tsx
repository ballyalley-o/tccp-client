import { useEffect, useState, type FormEvent } from 'react'
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Rating,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import { useAppDispatch, useAppSelector } from 'app/hook'
import { createFeedback, fetchFeedbacks } from 'app/store/slice'
import type { Bootcamp, Feedback } from 'types'

interface BootcampFeedbackCardProps {
  selected: Bootcamp
}

const getFeedbackAuthor = (feedback: Feedback) => {
  if (!feedback.user || typeof feedback.user === 'string') return 'Learner'
  return feedback.user.firstname || feedback.user.email
}

const getFeedbackRole = (feedback: Feedback) => {
  if (!feedback.user || typeof feedback.user === 'string') return 'user'
  return feedback.user.role
}

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

const BootcampFeedbackCard = ({ selected }: BootcampFeedbackCardProps) => {
  const dispatch = useAppDispatch()
  const { user, token, isAuthenticated } = useAppSelector((state) => state.auth)
  const { items, status, createStatus, error } = useAppSelector((state) => state.feedback)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [rating, setRating] = useState<number | null>(8)

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
          body: body.trim(),
          rating,
          bootcamp: selected._id,
          user: userId,
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
    <Card>
      <CardContent>
        <Stack spacing={3}>
          <Box>
            <Typography variant='h2'>Feedbacks</Typography>
            <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
              Share what you learned and help others choose this bootcamp.
            </Typography>
          </Box>

          {error && <Alert severity='error'>{error}</Alert>}

          {isAuthenticated ? (
            <Stack component='form' spacing={2} onSubmit={handleSubmit}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <TextField
                  label='Feedback title'
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  inputProps={{ maxLength: 100 }}
                  sx={{ flex: 1 }}
                />
                <Stack spacing={0.5} sx={{ minWidth: { xs: '100%', md: 180 } }}>
                  <Typography variant='caption' color='text.secondary'>Rating</Typography>
                  <Rating
                    value={rating ? rating / 2 : null}
                    precision={0.5}
                    icon={<StarIcon fontSize='inherit' />}
                    emptyIcon={<StarIcon fontSize='inherit' />}
                    onChange={(_, value) => setRating(value ? value * 2 : null)}
                  />
                  <Typography variant='caption' color='text.secondary'>
                    {rating ? `${rating}/10` : 'Choose a rating'}
                  </Typography>
                </Stack>
              </Stack>
              <TextField
                label='Your feedback'
                value={body}
                onChange={(event) => setBody(event.target.value)}
                multiline
                minRows={3}
              />
              <Button
                type='submit'
                variant='contained'
                disabled={!canSubmit || createStatus === 'loading'}
                sx={{ alignSelf: { xs: 'stretch', sm: 'flex-start' } }}
              >
                {createStatus === 'loading' ? 'Submitting' : 'Add Feedback'}
              </Button>
            </Stack>
          ) : (
            <Alert severity='info'>Log in to add feedback. You can still read feedback from bootcamp participants below.</Alert>
          )}

          <Divider />

          <Stack spacing={2}>
            <Typography variant='h3'>All Feedbacks</Typography>

            {status === 'loading' && (
              <Typography color='text.secondary'>Loading feedback...</Typography>
            )}
            {status !== 'loading' && !items.length && (
              <Typography color='text.secondary'>No feedback yet for this bootcamp.</Typography>
            )}

            {items.map((feedback) => {
              const author = getFeedbackAuthor(feedback)
              return (
                <Box
                  key={feedback._id ?? `${feedback.title}-${feedback.rating}`}
                  sx={{
                    position: 'relative',
                    borderRadius: '18px 18px 18px 0',
                    backgroundColor: 'action.hover',
                    p: { xs: 2, sm: 2.5 },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      borderStyle: 'solid',
                      borderWidth: '0 16px 16px 0',
                      borderColor: 'transparent',
                      borderRightColor: 'background.paper',
                    },
                  }}
                >
                  <Stack direction='row' spacing={1.5} alignItems='flex-start'>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 38, height: 38 }}>
                      {getInitials(author)}
                    </Avatar>
                    <Stack spacing={0.75} sx={{ minWidth: 0, flex: 1 }}>
                      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent='space-between' spacing={1}>
                        <Box>
                          <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
                            {feedback.title}
                          </Typography>
                          <Typography variant='caption' color='text.secondary'>
                            {author} · {getFeedbackRole(feedback)}
                          </Typography>
                        </Box>
                        <Typography variant='body2' sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
                          {feedback.rating}/10
                        </Typography>
                      </Stack>
                      {feedback.body && <Typography variant='body2'>{feedback.body}</Typography>}
                    </Stack>
                  </Stack>
                </Box>
              )
            })}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default BootcampFeedbackCard
