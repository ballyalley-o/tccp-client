import { useEffect, useState } from 'react'
import { Alert, Box, Button, Card, CardContent, Chip, CircularProgress, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { apiRequest } from 'lib/api'
import type { ApiCollection, Bootcamp, Course } from 'types/model'

const getId = (value: Course['bootcamp']) => typeof value === 'string' ? value : value?._id || ''
const validId = (id: string) => /^[0-9a-fA-F]{24}$/.test(id)

export default function CourseBootcampManager({ courses, token, onUpdated }: {
  courses: Course[]
  token: string | null
  onUpdated: () => Promise<void>
}) {
  const [bootcamps, setBootcamps] = useState<Bootcamp[]>([])
  const [selected, setSelected] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    apiRequest<ApiCollection<Bootcamp>>('/bootcamp')
      .then(response => { if (active) setBootcamps(response.data || []) })
      .catch(err => { if (active) setError(err instanceof Error ? err.message : 'Unable to load bootcamps') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  const assign = async (course: Course) => {
    const id = selected[course._id] ?? getId(course.bootcamp)
    if (!validId(id)) { setError('Choose a valid bootcamp before saving.'); return }
    setError(''); setSuccess(''); setSaving(course._id)
    try {
      await apiRequest('/course/' + course._id, {
        method: 'PUT', token, body: JSON.stringify({ bootcamp: id })
      })
      await onUpdated()
      setSuccess('Updated bootcamp for ' + course.title)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not update course')
    } finally { setSaving('') }
  }

  return <Card variant="outlined"><CardContent><Stack spacing={2}>
    <Box><Typography variant="h5">Course and bootcamp assignments</Typography>
      <Typography color="text.secondary">Admin only · Assign each course to its parent bootcamp. Enrollment requires this association.</Typography>
    </Box>
    {error && <Alert severity="error">{error}</Alert>}
    {success && <Alert severity="success">{success}</Alert>}
    {loading ? <CircularProgress size={24} /> : courses.length === 0 ? <Alert severity="info">No courses to assign.</Alert> :
      courses.map(course => {
        const current = getId(course.bootcamp)
        const value = selected[course._id] ?? current
        return <Stack key={course._id} direction={{ xs: 'column', md: 'row' }} alignItems={{ md: 'center' }} spacing={2} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}><Typography fontWeight={600}>{course.title}</Typography>
            <Chip size="small" color={validId(current) ? 'success' : 'warning'} label={validId(current) ? 'Assigned' : 'Unassigned'} />
          </Box>
          <TextField select label="Bootcamp" size="small" sx={{ minWidth: { md: 260 } }} value={bootcamps.some(b => b._id === value) ? value : ''} onChange={e => setSelected(prev => ({ ...prev, [course._id]: e.target.value }))}>
            <MenuItem value="">Select bootcamp</MenuItem>
            {bootcamps.map(bootcamp => <MenuItem key={bootcamp._id} value={bootcamp._id}>{bootcamp.name}</MenuItem>)}
          </TextField>
          <Button variant="contained" disabled={!!saving || !validId(value) || value === current} onClick={() => assign(course)}>{saving === course._id ? 'Saving…' : 'Save assignment'}</Button>
        </Stack>
      })}
  </Stack></CardContent></Card>
}
