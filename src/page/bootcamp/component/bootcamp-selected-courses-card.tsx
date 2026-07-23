import type { Bootcamp, Course } from 'types'
import { Box, Stack, CardContent, Typography, Chip } from '@mui/material'
import { OffsetCard, SpacedDivider, SmallOffsetText } from 'design/styled'
import { formatText, transl, type LocaleKey } from 'lib/tool'

const BootcampSelectedCoursesCard = ({ selected }: { selected: Bootcamp }) => {
  return (
    <OffsetCard>
        <CardContent>
            <Typography variant={'h2'}>{transl('courses')}</Typography>
            <SpacedDivider />
            <Stack spacing={2}>
            {selected.course?.length ? (
                selected.course.map((course: Course) => (
                <Box key={course._id}>
                    <Stack direction={'row'} justifyContent={'space-between'} spacing={2}>
                        <Typography variant={'h3'}>{course.title}</Typography>
                        <Chip label={formatText((transl(course.minimumSkill as LocaleKey)), 'capitalize')} size={'small'}  />
                    </Stack>
                    <SmallOffsetText color={'text.secondary'}>{course.description}</SmallOffsetText>
                </Box>
                ))
            ) : (
                <Typography color={'text.secondary'}>{transl('message.no_courses_published_yet')}</Typography>
            )}
            </Stack>
        </CardContent>
    </OffsetCard>
)
}

export default BootcampSelectedCoursesCard