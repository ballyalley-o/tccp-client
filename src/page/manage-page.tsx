import { useState } from 'react'
import { KEY } from 'config'
import { useAppDispatch, useAppSelector } from 'app/hook'
import { createBootcamp, createCourse } from 'app/store/slice'
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
import type { BootcampDraft, CourseDraft } from 'types/model'

const initialBootcamp: BootcampDraft = {
  name         : '',
  description  : '',
  website      : '',
  phone        : '',
  email        : '',
  address      : '',
  duration     : '',
  careers      : ['Web Development'],
  housing      : false,
  jobAssistance: false,
  jobGuarantee : false,
  acceptGi     : false
}

const initialCourse: CourseDraft = {
  title               : '',
  description         : '',
  duration            : '',
  tuition             : 0,
  minimumSkill        : 'beginner',
  scholarshipAvailable: false
}

 const ManagePage = () => {
  const dispatch                = useAppDispatch()
  const token                   = useAppSelector((state) => state.auth.token)
  const selected                = useAppSelector((state) => state.bootcamps.selected)
  const [bootcamp, setBootcamp] = useState<BootcampDraft>(initialBootcamp)
  const [course, setCourse]     = useState<CourseDraft>(initialCourse)
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
      setNotice('Bootcamp created.')
      setBootcamp(initialBootcamp)
    } else {
      setError(result.error.message || 'Unable to create bootcamp')
    }
  }

  const handleCourseSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setNotice(null)
    setError(null)
    const bootcampId = selected?._id
    if (!bootcampId) {
      setError('Create or open a bootcamp before adding courses.')
      return
    }

    const result = await dispatch(createCourse({ bootcampId, draft: course, token }))
    if (createCourse.fulfilled.match(result)) {
      setNotice('Course added.')
      setCourse(initialCourse)
    } else {
      setError(result.error.message || 'Unable to create course')
    }
  }

  return (
    <Stack spacing={3}>
      <Stack spacing={0.5}>
        <Typography variant="h1">Trainer workspace</Typography>
        <Typography color="text.secondary">
          Create bootcamp listings and attach courses with trainer/admin protected API calls.
        </Typography>
      </Stack>

      {notice ? <Alert severity="success">{notice}</Alert> : null}
      {error ? <Alert severity="error">{error}</Alert> : null}

      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, lg: 7 }}>
          <Card>
            <CardContent>
              <Stack component="form" spacing={2} onSubmit={handleBootcampSubmit}>
                <Typography variant="h2">New bootcamp</Typography>
                <TextField
                  label="Name"
                  value={bootcamp.name}
                  onChange={(event) => setBootcamp({ ...bootcamp, name: event.target.value })}
                  required
                />
                <TextField
                  label="Description"
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
                      label="Website"
                      value={bootcamp.website}
                      onChange={(event) => setBootcamp({ ...bootcamp, website: event.target.value })}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={bootcamp.email}
                      onChange={(event) => setBootcamp({ ...bootcamp, email: event.target.value })}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Phone"
                      value={bootcamp.phone}
                      onChange={(event) => setBootcamp({ ...bootcamp, phone: event.target.value })}
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Duration"
                      value={bootcamp.duration}
                      onChange={(event) => setBootcamp({ ...bootcamp, duration: event.target.value })}
                      required
                    />
                  </Grid2>
                </Grid2>
                <TextField
                  label="Address"
                  value={bootcamp.address}
                  onChange={(event) => setBootcamp({ ...bootcamp, address: event.target.value })}
                  required
                />
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {KEY.CAREER_OPTION.map((career) => (
                    <Chip
                      key={career}
                      label={career}
                      color={bootcamp.careers.includes(career) ? 'primary' : 'default'}
                      variant={bootcamp.careers.includes(career) ? 'filled' : 'outlined'}
                      onClick={() => toggleCareer(career)}
                    />
                  ))}
                </Stack>
                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                  {(['housing', 'jobAssistance', 'jobGuarantee', 'acceptGi'] as const).map((field) => (
                    <FormControlLabel
                      key={field}
                      control={
                        <Checkbox checked={bootcamp[field]} onChange={(event) => setBootcamp({ ...bootcamp, [field]: event.target.checked })} />
                      }
                      label={field.replace(/([A-Z])/g, ' $1')}
                    />
                  ))}
                </Stack>
                <Button type={"submit"} variant={"contained"} startIcon={<SaveIcon />}>
                  Save bootcamp
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid2>

        <Grid2 size={{ xs: 12, lg: 5 }}>
          <Card>
            <CardContent>
              <Stack component="form" spacing={2} onSubmit={handleCourseSubmit}>
                <Typography variant="h2">Add course</Typography>
                <Typography color="text.secondary">
                  Target bootcamp: {selected?.name || 'newly created bootcamp will appear here'}
                </Typography>
                <Divider />
                <TextField
                  label="Title"
                  value={course.title}
                  onChange={(event) => setCourse({ ...course, title: event.target.value })}
                  required
                />
                <TextField
                  label="Description"
                  value={course.description}
                  onChange={(event) => setCourse({ ...course, description: event.target.value })}
                  required
                  multiline
                  minRows={3}
                  inputProps={{ minLength: 20, maxLength: 250 }}
                />
                <TextField
                  label="Duration"
                  value={course.duration}
                  onChange={(event) => setCourse({ ...course, duration: event.target.value })}
                  required
                />
                <TextField
                  label="Tuition"
                  type="number"
                  value={course.tuition}
                  onChange={(event) => setCourse({ ...course, tuition: Number(event.target.value) })}
                  required
                />
                <TextField
                  select
                  label="Minimum skill"
                  value={course.minimumSkill}
                  onChange={(event) =>
                    setCourse({ ...course, minimumSkill: event.target.value as CourseDraft['minimumSkill'] })
                  }
                >
                  <MenuItem value="beginner">Beginner</MenuItem>
                  <MenuItem value="intermediate">Intermediate</MenuItem>
                  <MenuItem value="advanced">Advanced</MenuItem>
                </TextField>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={course.scholarshipAvailable}
                      onChange={(event) => setCourse({ ...course, scholarshipAvailable: event.target.checked })}
                    />
                  }
                  label="Scholarship available"
                />
                <Button type="submit" variant="contained" startIcon={<AddIcon />} disabled={!selected}>
                  Add course
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