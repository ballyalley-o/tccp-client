import { Card, CardContent, Stack, TextField, Typography, Button, Rating } from '@mui/material'
import { StarSharp as StarIcon } from '@mui/icons-material'
import { RatingContainerStack } from 'design/styled'
import { transl } from 'lib/tool'
import type { FormEvent } from 'react'

interface BootcampFeedbackFormCardProps {
  title       : string
  setTitle    : React.Dispatch<React.SetStateAction<string>>
  body        : string
  setBody     : React.Dispatch<React.SetStateAction<string>>
  rating      : number | null
  setRating   : React.Dispatch<React.SetStateAction<number | null>>
  createStatus: AppStateStatusType
  canSubmit   : boolean
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>
}

const BootcampFeedbackRatingStack = ({
  rating,
  setRating,
}: {
  rating: number | null
  setRating: React.Dispatch<React.SetStateAction<number | null>>
}) => {
  return (
    <RatingContainerStack spacing={0.5}>
      <Typography variant={'caption'} color={'text.secondary'}>
        {transl('rating')}
      </Typography>
      <Rating
        value={rating ? rating / 2 : null}
        precision={0.5}
        icon={<StarIcon fontSize={'inherit'} />}
        emptyIcon={<StarIcon fontSize='inherit' />}
        onChange={(_, value) => setRating(value ? value * 2 : null)}
      />
      <Typography variant={'caption'} color='text.secondary'>
        {rating ? `${rating}/10` : transl('give_rating')}
      </Typography>
    </RatingContainerStack>
  )
}

const BootcampFeedbackFormCard = ({
  title,
  setTitle,
  body,
  setBody,
  handleSubmit,
  rating,
  setRating,
  canSubmit,
  createStatus,
}: BootcampFeedbackFormCardProps) => {
  return (
    <Card>
      <CardContent>
        <Stack component={'form'} spacing={2} onSubmit={handleSubmit}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <TextField
              label={transl('title')}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              inputProps={{ maxLength: 100 }}
              sx={{ flex: 1 }}
            />
            <BootcampFeedbackRatingStack rating={rating} setRating={setRating} />
          </Stack>
          <TextField label={transl('description')} value={body} onChange={(event) => setBody(event.target.value)} multiline minRows={3} />
          <Button
            type={'submit'}
            variant={'contained'}
            disabled={!canSubmit || createStatus === 'loading'}
            sx={{ alignSelf: { xs: 'stretch', sm: 'flex-start' } }}
          >
            {transl(createStatus === 'loading' ? 'submitting' : 'add_feedback')}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default BootcampFeedbackFormCard
