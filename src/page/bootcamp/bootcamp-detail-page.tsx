import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'app/hook'
import { clearSelectedBootcamp, fetchBootcampBySlug } from 'app/store/slice'
import { Grid2, Stack, Typography } from '@mui/material'
import { StatusView } from 'component/shared/loader'
import { BackButton } from 'component/shared/button'

import { BootcampCourseCard, BootcampFeedbackCard, BootcampSelectedCoursesCard, BootcampMainCard, BootcampProgramFitStack } from './component'

const BootcampDetailPage = () => {
  const { bootcampSlug }                  = useParams()
  const dispatch                          = useAppDispatch()
  const { selected, detailStatus, error } = useAppSelector((state) => state.bootcamps)

  useEffect(() => {
    if (bootcampSlug) {
      dispatch(fetchBootcampBySlug(bootcampSlug))
    }

    return () => {
      dispatch(clearSelectedBootcamp())
    }
  }, [dispatch, bootcampSlug])

  if (detailStatus === 'loading' || detailStatus === 'failed' || !selected) {
    return <StatusView status={detailStatus} error={error} />
  }

  return (
    <Stack spacing={3}>
      <BackButton />
      <BootcampProgramFitStack selected={selected} />
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <BootcampMainCard selected={selected} />
          <BootcampSelectedCoursesCard selected={selected} />
        </Grid2>
        <BootcampCourseCard selected={selected} />
      <Typography variant={'h3'}>{'Feedbacks'}</Typography>
      </Grid2>
        <BootcampFeedbackCard selected={selected} />
    </Stack>
  )
}


export default BootcampDetailPage