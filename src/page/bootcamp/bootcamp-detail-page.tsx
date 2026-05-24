import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'app/hook'
import { clearSelectedBootcamp, fetchBootcampBySlug } from 'app/store/slice'
import type { Course } from 'types'
import { Box, Button, Card, CardContent, Chip, Grid2, Link, List, ListItem, ListItemText, Stack, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import LanguageIcon from '@mui/icons-material/Language'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PaidIcon from '@mui/icons-material/Paid'
import StarIcon from '@mui/icons-material/Star'
import { StatusView } from 'component/shared/loader'
import { CompactListIcon, IntroText, MetaStack, OffsetCard, SmallOffsetText, SpacedDivider, TagStack } from 'design/styled'
import { transl } from 'lib/tool'

const BootcampDetailPage = () => {
  const { slug }                          = useParams()
  const dispatch                          = useAppDispatch()
  const { selected, detailStatus, error } = useAppSelector((state) => state.bootcamps)

  useEffect(() => {
    if (slug) {
      dispatch(fetchBootcampBySlug(slug))
    }

    return () => {
      dispatch(clearSelectedBootcamp())
    }
  }, [dispatch, slug])

  if (detailStatus === 'loading' || detailStatus === 'failed' || !selected) {
    return <StatusView status={detailStatus} error={error} />
  }

  const traits = [
    ['Housing', selected.housing],
    ['Job assistance', selected.jobAssistance],
    ['Job guarantee', selected.jobGuarantee],
    ['GI bill accepted', selected.acceptGi],
  ]

  return (
    <Stack spacing={3}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'} spacing={2}>
        <Box>
          <Typography variant='h1'>{selected.name}</Typography>
          <MetaStack direction='row' spacing={2} alignItems='center' flexWrap='wrap' useFlexGap>
            <Stack direction='row' spacing={0.5} alignItems='center'>
              <LocationOnIcon color='action' fontSize='small' />
              <Typography color='text.secondary'>{selected.location?.formattedAddress || selected.location?.city || 'Location pending'}</Typography>
            </Stack>
            <Stack direction='row' spacing={0.5} alignItems='center'>
              <StarIcon color='warning' fontSize='small' />
              <Typography fontWeight={700}>{selected.rating.toFixed(1)}</Typography>
            </Stack>
            <Stack direction='row' spacing={0.5} alignItems='center'>
              <PaidIcon color='success' fontSize='small' />
              <Typography fontWeight={700}>${selected.averageCost.toLocaleString()}</Typography>
            </Stack>
          </MetaStack>
        </Box>
        {selected.website ? (
          <Button component={Link} href={selected.website} target='_blank' rel='noreferrer' startIcon={<LanguageIcon />} variant='contained'>
           {transl('website')}
          </Button>
        ) : null}
      </Stack>

      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Typography variant='h2'>Overview</Typography>
              <IntroText color='text.secondary'>{selected.description}</IntroText>
              <TagStack direction='row' spacing={1} flexWrap='wrap' useFlexGap>
                {selected.careers.map((career: string) => (
                  <Chip key={career} label={career} color='primary' variant='outlined' />
                ))}
              </TagStack>
            </CardContent>
          </Card>

          <OffsetCard>
            <CardContent>
              <Typography variant='h2'>Courses</Typography>
              <SpacedDivider />
              <Stack spacing={2}>
                {selected.courses?.length ? (
                  selected.courses.map((course: Course) => (
                    <Box key={course._id}>
                      <Stack direction='row' justifyContent='space-between' spacing={2}>
                        <Typography variant='h3'>{course.title}</Typography>
                        <Chip label={course.minimumSkill} size='small' />
                      </Stack>
                      <SmallOffsetText color='text.secondary'>{course.description}</SmallOffsetText>
                    </Box>
                  ))
                ) : (
                  <Typography color='text.secondary'>No courses published yet.</Typography>
                )}
              </Stack>
            </CardContent>
          </OffsetCard>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant='h2'>Program Fit</Typography>
              <List dense>
                {traits.map(([label, enabled]) => (
                  <ListItem key={String(label)} disableGutters>
                    <CompactListIcon>
                      <CheckCircleIcon color={enabled ? 'success' : 'disabled'} />
                    </CompactListIcon>
                    <ListItemText primary={label} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Stack>
  )
}


export default BootcampDetailPage