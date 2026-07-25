import type { Feedback }          from 'types'
import { Stack, Box, Typography } from '@mui/material'
import { AppUserAvatar }          from 'component/app'
import { FeedbackBubbleBox }      from 'design/styled'

interface BootcampFeedbackBoxProps {
    feedback: Feedback
    author  : string
    isAuthor: (feedback: Feedback) => boolean | null
}

const getFeedbackRole = (feedback: Feedback) => {
  if (!feedback.user || typeof feedback.user === 'string') return 'user'
  return feedback.user.role
}

const BootcampFeedbackBox = ({ feedback, author, isAuthor }: BootcampFeedbackBoxProps) => {
  return (
    <FeedbackBubbleBox key={feedback._id} isAuthor={isAuthor(feedback)}>
        <Stack direction={'row'} spacing={1.5} alignItems={'flex-start'}>
           {feedback.user && <AppUserAvatar user={feedback.user} />}
        {/* <Avatar sx={{ bgcolor: 'primary.main', width: 38, height: 38 }}>{getInitial(author)}</Avatar> */}
        <Stack spacing={0.75} sx={{ minWidth: 0, flex: 1 }} border={'red'}>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent={'space-between'} spacing={1}>
            <Box>
                <Typography variant={'subtitle1'} sx={{ fontWeight: 700 }}>
                {feedback.title}
                </Typography>
                <Typography variant={'caption'} color={'text.secondary'}>
                {author} · {getFeedbackRole(feedback)}
                </Typography>
            </Box>
            <Typography variant={'body2'} sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
                {feedback.rating}/10
            </Typography>
            </Stack>
            {feedback.body && <Typography variant={'body2'}>{feedback.body}</Typography>}
        </Stack>
        </Stack>
    </FeedbackBubbleBox>
  )
}

export default BootcampFeedbackBox