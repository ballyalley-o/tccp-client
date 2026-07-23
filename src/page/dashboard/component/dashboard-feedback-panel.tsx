import { useEffect, useMemo, useState, type FormEvent } from 'react'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import { useAppDispatch, useAppSelector } from 'app/hook'
import { createFeedback, fetchFeedbacks } from 'app/store/slice'
import type { Bootcamp, Feedback } from 'types'

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

const DashboardFeedbackPanel = ({ bootcamps, isAuthenticated }: DashboardFeedbackPanelProps) => {
  const dispatch = useAppDispatch()
  const { user, token } = useAppSelector((state) => state.auth)
  const { items, status, createStatus, error } = useAppSelector((state) => state.feedback)
  const [bootcampId, setBootcampId] = useState('')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [rating, setRating] = useState<number | null>(8)

  const selectedBootcamp = useMemo(
    () => bootcamps.find((bootcamp) => bootcamp._id === bootcampId),
    [bootcampId, bootcamps]
  )

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

  const canSubmit = Boolean(
    isAuthenticated &&
    user &&
    bootcampId &&
    title.trim() &&
    body.trim() &&
    rating
  )

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const userId = user?._id || user?.id

    if (!canSubmit || !userId || !rating) return

    try {
      await dispatch(createFeedback({
        bootcampId,
        token,
        draft: {
          title   : title.trim(),
          body    : body.trim(),
          rating,
          bootcamp: bootcampId,
          user    : userId,
        }
      })).unwrap()

      setTitle('')
      setBody('')
      setRating(8)
      dispatch(fetchFeedbacks({ bootcampId }))
    } catch {
      // The slice owns the user-facing error message.
    }
  }

  return (
    <Card>
      <CardContent>
        <Stack spacing={2.5}>
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent='space-between' spacing={2}>
            <Box>
              <Typography variant={'h3'}>Bootcamp Feedback</Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
                {selectedBootcamp ? `Share and review feedback for ${selectedBootcamp.name}.` : 'Share feedback for a featured bootcamp.'}
              </Typography>
            </Box>

            <FormControl size='small' sx={{ minWidth: { xs: '100%', md: 260 } }}>
              <InputLabel id='dashboard-feedback-bootcamp-label'>Bootcamp</InputLabel>
              <Select labelId={'dashboard-feedback-bootcamp-label'} value={bootcampId} label='Bootcamp'onChange={(event) => setBootcampId(event.target.value)}>
                {bootcamps.map((bootcamp) => (
                  <MenuItem key={bootcamp._id} value={bootcamp._id}>
                    {bootcamp.name}
                  </MenuItem>
                ))}
              </Select>
              {!bootcamps.length && <FormHelperText>No bootcamps loaded yet</FormHelperText>}
            </FormControl>
          </Stack>

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
                  <Typography variant='caption' color='text.secondary'>
                    Rating
                  </Typography>
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
                label='Feedback'
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
                {createStatus === 'loading' ? 'Submitting' : 'Submit Feedback'}
              </Button>
            </Stack>
          ) : (
            <Alert severity='info'>
              Create an account or log in to leave feedback. You can still read recent bootcamp feedback below.
            </Alert>
          )}

          <Divider />

          <Stack spacing={1.5}>
            <Typography variant='subtitle2' sx={{ fontWeight: 700 }}>
              Recent Feedback
            </Typography>

            {status === 'loading' && (
              <Typography variant='body2' color='text.secondary'>
                Loading feedback...
              </Typography>
            )}

            {status !== 'loading' && !items.length && (
              <Typography variant='body2' color='text.secondary'>
                No feedback yet for this bootcamp.
              </Typography>
            )}

            {items.slice(0, 3).map((feedback) => (
              <Card key={feedback._id ?? `${feedback.title}-${feedback.rating}`} variant='outlined'>
                <CardContent>
                  <Stack spacing={1}>
                    <Stack direction='row' justifyContent='space-between' alignItems='flex-start' spacing={2}>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant='subtitle2' sx={{ fontWeight: 700 }}>
                          {feedback.title}
                        </Typography>
                        <Typography variant='caption' color='text.secondary'>
                          {getFeedbackAuthor(feedback)} on {getFeedbackBootcamp(feedback)}
                        </Typography>
                      </Box>
                      <Typography variant='body2' sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
                        {feedback.rating}/10
                      </Typography>
                    </Stack>
                    {feedback.body && (
                      <Typography variant='body2' color='text.secondary'>
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
