import { useState } from 'react'
import { KEY } from 'config'
import type { BootcampDraft, CourseDraft } from 'types/model'
import { useAppDispatch, useAppSelector } from 'app/hook'
import { createBootcamp, createCourse } from 'app/store/slice'
import { bootcampDefaultValue, courseDefaultValue } from 'lib/form'
import {
  Alert,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  Grid2,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save'
import { transl, type LocaleKey } from 'lib/tool'

const _FORM_KEY = {
  NAME         : 'name',
  DESCRIPTION  : 'description',
  WEBSITE      : 'website',
  EMAIL        : 'email',
  PHONE        : 'phone',
  DURATION     : 'duration',
  ADDRESS      : 'address',
  CAREER_OPTION: KEY.CAREER_OPTION,
  TRAIT        : KEY.TRAIT
}

const ManagePage = () => {
  const dispatch                = useAppDispatch()
  const token                   = useAppSelector((state) => state.auth.token)
  const selected                = useAppSelector((state) => state.bootcamps.selected)
  const [bootcamp, setBootcamp] = useState<BootcampDraft>(bootcampDefaultValue)
  const [course, setCourse]     = useState<CourseDraft>(courseDefaultValue)
  const [notice, setNotice]     = useState<string | null>(null)
  const [error, setError]       = useState<string | null>(null)

  const toggleCareer = (career: string) => {
    const careers = bootcamp.careers.includes(career)
      ? bootcamp.careers.filter((item) => item !== career)
      : [...bootcamp.careers, career]
    setBootcamp({ ...bootcamp, careers })
  }

  const handleBootcampSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setNotice(null)
    setError(null)
    const result = await dispatch(createBootcamp({ draft: bootcamp, token }))
    if (createBootcamp.fulfilled.match(result)) {
      setNotice(transl('success.bootcamp_created'))
      setBootcamp(bootcampDefaultValue)
    } else {
      setError(result.error.message || transl('error.unable_create_bootcamp'))
    }
  }

  const handleCourseSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setNotice(null)
    setError(null)
    const bootcampId = selected?._id
    if (!bootcampId) {
      setError(transl('error.bootcamp_required'))
      return
    }

    const result = await dispatch(createCourse({ bootcampId, draft: course, token }))
    if (createCourse.fulfilled.match(result)) {
      setNotice(transl('success.course_added'))
      setCourse(courseDefaultValue)
    } else {
      setError(result.error.message || transl('error.unable_create_course'))
    }
  }

  return (
    <Stack spacing={3}>
      <Stack spacing={0.5}>
        <Typography variant={'h1'}>{transl('bootcamp_para.trainer_workspace')}</Typography>
      </Stack>

      {notice ? <Alert severity={'success'}>{notice}</Alert> : null}
      {error ? <Alert severity={'error'}>{error}</Alert> : null}

      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, lg: 7 }}>
          <Card>
            <CardContent>
              <Stack component={'form'} spacing={2} onSubmit={handleBootcampSubmit}>
                <Typography variant={'h2'}>{transl('new_bootcamp')}</Typography>
                <TextField
                  label={transl(_FORM_KEY.NAME as LocaleKey)}
                  value={bootcamp.name}
                  onChange={(event) => setBootcamp({ ...bootcamp, name: event.target.value })}
                  required
                />
                <TextField
                  label={transl(_FORM_KEY.DESCRIPTION as LocaleKey)}
                  value={bootcamp.description}
                  onChange={(event) => setBootcamp({ ...bootcamp, description: event.target.value })}
                  required
                  multiline
                  minRows={3}
                  inputProps={{ maxLength: 250 }}
                />
                <Grid2 container spacing={2}>
                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label={transl(_FORM_KEY.WEBSITE as LocaleKey)}
                      value={bootcamp.website}
                      onChange={(event) => setBootcamp({ ...bootcamp, website: event.target.value })}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label={transl(_FORM_KEY.EMAIL as LocaleKey)}
                      type={_FORM_KEY.EMAIL}
                      value={bootcamp.email}
                      onChange={(event) => setBootcamp({ ...bootcamp, email: event.target.value })}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label={transl(_FORM_KEY.PHONE as LocaleKey)}
                      value={bootcamp.phone}
                      onChange={(event) => setBootcamp({ ...bootcamp, phone: event.target.value })}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label={transl(_FORM_KEY.DURATION as LocaleKey)}
                      value={bootcamp.duration}
                      onChange={(event) => setBootcamp({ ...bootcamp, duration: event.target.value })}
                      required
                    />
                  </Grid2>
                </Grid2>
                <TextField
                  label={transl(_FORM_KEY.ADDRESS as LocaleKey)}
                  value={bootcamp.address}
                  onChange={(event) => setBootcamp({ ...bootcamp, address: event.target.value })}
                  required
                />
                <Stack direction={'row'} spacing={1} flexWrap={'wrap'} useFlexGap>
                  {_FORM_KEY.CAREER_OPTION.map((career: LocaleKey) => (
                    <Chip
                      key={career}
                      label={transl(career)}
                      color={bootcamp.careers.includes(transl(career)) ? 'primary' : 'default'}
                      variant={bootcamp.careers.includes(transl(career)) ? 'filled' : 'outlined'}
                      onClick={() => toggleCareer(transl(career))}
                    />
                  ))}
                </Stack>
                <Stack direction={'row' }spacing={2} flexWrap={'wrap'} useFlexGap>
                  {_FORM_KEY.TRAIT.map((field) => (
                    <FormControlLabel
                      key={field}
                      control={
                        <Checkbox checked={bootcamp[field]} onChange={(event) => setBootcamp({ ...bootcamp, [field]: event.target.checked })} />
                      }
                      label={field.replace(/([A-Z])/g, ' $1')}
                    />
                  ))}
                </Stack>
                <Button type={'submit'} variant={'contained'} startIcon={<SaveIcon />}>
                  {transl('save_bootcamp')}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid2>

        <Grid2 size={{ xs: 12, lg: 5 }}>
          <Card>
            <CardContent>
              <Stack component={'form'} spacing={2} onSubmit={handleCourseSubmit}>
                <Typography variant={'h2'}>{transl('add_course')}</Typography>
                <Typography color={'text.secondary'}>
                  {transl('target_bootcamp')}: {selected?.name || transl('message.newly_created_bootcamp')}
                </Typography>
                <Divider />
                <TextField
                  label={transl('title')}
                  value={course.title}
                  onChange={(event) => setCourse({ ...course, title: event.target.value })}
                  required
                />
                <TextField
                  label={transl('description')}
                  value={course.description}
                  onChange={(event) => setCourse({ ...course, description: event.target.value })}
                  required
                  multiline
                  minRows={3}
                  inputProps={{ minLength: 20, maxLength: 250 }}
                />
                <TextField
                  label={transl('duration')}
                  value={course.duration}
                  onChange={(event) => setCourse({ ...course, duration: event.target.value })}
                  required
                />
                <TextField
                  label={transl('tuition')}
                  type={'number'}
                  value={course.tuition}
                  onChange={(event) => setCourse({ ...course, tuition: Number(event.target.value) })}
                  required
                />
                <TextField
                  select
                  label={transl('minimum_skill_')}
                  value={course.minimumSkill}
                  onChange={(event) => setCourse({ ...course, minimumSkill: event.target.value as CourseDraft['minimumSkill'] })}
                >
                  {KEY.MINIMUM_SKILL.map((_s) => (
                    <MenuItem value={_s}>{transl(`minimum_skill.${_s}` as LocaleKey)}</MenuItem>
                  ))}
                </TextField>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={course.scholarshipAvailable}
                      onChange={(event) => setCourse({ ...course, scholarshipAvailable: event.target.checked })}
                    />
                  }
                  label={transl('scholarship_available')}
                />
                <Button type={'submit'} variant={'contained'} startIcon={<AddIcon />} disabled={!selected}>
                  {transl('add_course')}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Stack>
  )
}

export default ManagePage