import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Box, Button, Card, CardContent, Chip, CircularProgress, Divider, Grid2, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { apiRequest } from 'lib/api'
import type { ApiCollection, Bootcamp, Course } from 'types/model'
import { PATH } from 'route/path'

const idOf = (bootcamp: Course['bootcamp']) => typeof bootcamp === 'string' ? bootcamp : bootcamp?._id || ''
const validId = (id: string) => /^[a-f0-9]{24}$/i.test(id)
type Draft = { name: string; description: string; website: string; phone: string; email: string; duration: string }
const draftOf = (b: Bootcamp): Draft => ({ name: b.name || '', description: b.description || '', website: b.website || '', phone: b.phone || '', email: b.email || '', duration: b.duration || '' })

export default function BootcampCourseCms() {
  const [bootcamps, setBootcamps] = useState<Bootcamp[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [bootcampId, setBootcampId] = useState('')
  const [draft, setDraft] = useState<Draft | null>(null)
  const [selectedCourse, setSelectedCourse] = useState('')
  const [busy, setBusy] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const selectedBootcamp = bootcamps.find(b => b._id === bootcampId)
  const assigned = useMemo(() => courses.filter(c => idOf(c.bootcamp) === bootcampId), [courses, bootcampId])
  const available = useMemo(() => courses.filter(c => idOf(c.bootcamp) !== bootcampId), [courses, bootcampId])

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const [b, c] = await Promise.all([apiRequest<ApiCollection<Bootcamp>>('/bootcamp'), apiRequest<ApiCollection<Course>>('/course')])
      setBootcamps(b.data || [])
      setCourses(c.data || [])
      setBootcampId(prev => prev || b.data?.[0]?._id || '')
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to load bootcamps and courses') }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { void load() }, [load])
  useEffect(() => { setDraft(selectedBootcamp ? draftOf(selectedBootcamp) : null); setSelectedCourse('') }, [selectedBootcamp])

  const saveBootcamp = async () => {
    if (!selectedBootcamp || !draft) return
    setBusy(true); setError(''); setNotice('')
    try {
      await apiRequest('/bootcamp/' + selectedBootcamp._id, { method: 'PUT', body: JSON.stringify(draft) })
      setNotice('Bootcamp details saved.')
      await load()
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to update bootcamp') }
    finally { setBusy(false) }
  }

  const assign = async (course: Course) => {
    if (!validId(bootcampId)) return
    setBusy(true); setError(''); setNotice('')
    try {
      await apiRequest('/course/' + course._id, { method: 'PUT', body: JSON.stringify({ bootcamp: bootcampId }) })
      setNotice('Assigned ' + course.title + ' to ' + selectedBootcamp?.name)
      setSelectedCourse('')
      await load()
    } catch (err) { setError(err instanceof Error ? err.message : 'Unable to assign course') }
    finally { setBusy(false) }
  }

  return <Stack spacing={3}>
    <Box><Typography variant="h4" fontWeight={700}>Bootcamp & course management</Typography><Typography color="text.secondary">Edit existing bootcamps, browse courses and manage their assignments.</Typography></Box>
    {error && <Alert severity="error">{error}</Alert>}
    {notice && <Alert severity="success">{notice}</Alert>}
    {loading && <CircularProgress />}
    {!loading && bootcamps.length === 0 && <Alert severity="info">No bootcamps exist yet. Create one in the trainer workspace first.</Alert>}
    {bootcamps.length > 0 && <TextField select label="Select bootcamp to manage" fullWidth value={bootcampId} onChange={e => setBootcampId(e.target.value)}>
      {bootcamps.map(b => <MenuItem key={b._id} value={b._id}>{b.name}</MenuItem>)}
    </TextField>}
    {selectedBootcamp && draft && <Grid2 container spacing={3}>
      <Grid2 size={{ xs: 12, lg: 5 }}><Card><CardContent><Stack spacing={2}>
        <Typography variant="h6">Edit bootcamp</Typography>
        <TextField label="Name" value={draft.name} required onChange={e => setDraft({ ...draft, name: e.target.value })} />
        <TextField label="Description" multiline minRows={3} value={draft.description} onChange={e => setDraft({ ...draft, description: e.target.value })} />
        <TextField label="Duration" value={draft.duration} onChange={e => setDraft({ ...draft, duration: e.target.value })} />
        <TextField label="Website" value={draft.website} onChange={e => setDraft({ ...draft, website: e.target.value })} />
        <TextField label="Email" value={draft.email} onChange={e => setDraft({ ...draft, email: e.target.value })} />
        <TextField label="Phone" value={draft.phone} onChange={e => setDraft({ ...draft, phone: e.target.value })} />
        <Button variant="contained" disabled={busy || !draft.name.trim()} onClick={saveBootcamp}>Save bootcamp changes</Button>
      </Stack></CardContent></Card></Grid2>
      <Grid2 size={{ xs: 12, lg: 7 }}><Stack spacing={2}>
        <Card><CardContent><Stack spacing={2}><Typography variant="h6">Courses in {selectedBootcamp.name}</Typography>
          <Chip sx={{ alignSelf: 'start' }} label={assigned.length + ' assigned'} />
          {assigned.length === 0 && <Alert severity="info">No courses assigned. Select an available course below.</Alert>}
          {assigned.map(c => <Stack key={c._id} direction="row" alignItems="center" justifyContent="space-between" spacing={1}><Typography>{c.title}</Typography><Button component={Link} to={PATH.COURSE.ROOT + '/' + c._id} size="small">View</Button></Stack>)}
        </Stack></CardContent></Card>
        <Card><CardContent><Stack spacing={2}><Typography variant="h6">Browse and assign a course</Typography>
          <Typography color="text.secondary">Select an existing course, including unassigned courses or courses belonging to another bootcamp. Reassignment changes its parent bootcamp.</Typography>
          <TextField select label="Available courses" value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)} fullWidth>
            <MenuItem value="">Choose a course</MenuItem>
            {available.map(c => <MenuItem key={c._id} value={c._id}>{c.title} — {idOf(c.bootcamp) ? 'Assigned elsewhere' : 'Unassigned'}</MenuItem>)}
          </TextField>
          <Button variant="contained" disabled={busy || !selectedCourse} onClick={() => { const c = courses.find(x => x._id === selectedCourse); if (c) void assign(c) }}>Assign to this bootcamp</Button>
          <Divider />
          <Button component={Link} to={PATH.COURSE.ROOT}>Browse public course catalogue</Button>
        </Stack></CardContent></Card>
      </Stack></Grid2>
    </Grid2>}
  </Stack>
}
