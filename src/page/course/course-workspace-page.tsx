import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppSelector } from 'app/hook'
import { apiRequest, asQueryString } from 'lib/api'
import { PATH } from 'route/path'
import type { ApiCollection, Course } from 'types/model'
import { Alert, Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, Chip, CircularProgress, Divider, Grid2, LinearProgress, MenuItem, Stack, TextField, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CourseContentImporter from './course-content-importer'

type Ref = string | { _id: string; title?: string; name?: string }
type Enrollment = { _id: string; course: Ref; bootcamp: Ref; status: string; progress: number; startDate: string }
type Module = { _id: string; course: string; title: string; description?: string; labelKey: string; order: number }
type Lecture = { _id: string; course: string; module: string; title: string; description?: string; content?: string; resources?: string[]; durationMinutes: number; order: number; labelKey: string }
type Question = { prompt: string; type?: string; options?: string[]; answer?: unknown; points?: number }
type Quiz = { _id: string; course: string; module: string; title: string; description?: string; questions: Question[]; passingScore: number; order: number; labelKey: string }
type Kind = 'module' | 'lecture' | 'quiz'
const refId = (ref: Ref | undefined) => typeof ref === 'string' ? ref : ref?._id || ''
const message = (error: unknown) => error instanceof Error ? error.message : 'Request failed'
const today = () => new Date().toLocaleDateString('en-CA')
const emptyForm = { title: '', labelKey: '', description: '', order: 0, module: '', content: '', resources: '', durationMinutes: 0, passingScore: 0, questions: '[]' }

export default function CourseWorkspacePage() {
  const { courseId } = useParams()
  const { user, token, isAuthenticated } = useAppSelector(state => state.auth)
  const role = typeof user?.role === 'string' ? user.role : user?.role?.name
  const canManage = role === 'trainer' || role === 'admin'
  const [courses, setCourses] = useState<Course[]>([])
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [modules, setModules] = useState<Module[]>([])
  const [lectures, setLectures] = useState<Lecture[]>([])
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [busy, setBusy] = useState(false)
  const [startDate, setStartDate] = useState(today())
  const [kind, setKind] = useState<Kind>('module')
  const [editing, setEditing] = useState('')
  const [form, setForm] = useState(emptyForm)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [quizResult, setQuizResult] = useState<Record<string, string>>({})
  const selected = courses.find(c => c._id === courseId)
  const enrollment = enrollments.find(e => refId(e.course) === courseId)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [courseResponse, enrollmentResponse] = await Promise.all([
        apiRequest<ApiCollection<Course>>('/course'),
        isAuthenticated ? apiRequest<ApiCollection<Enrollment>>('/enrollment', { token }).catch(() => ({ data: [] as Enrollment[] })) : Promise.resolve({ data: [] as Enrollment[] })
      ])
      setCourses(courseResponse.data || [])
      setEnrollments(enrollmentResponse.data || [])
      if (courseId) {
        const q = asQueryString({ course: courseId })
        const [m, l, z] = await Promise.all([
          apiRequest<ApiCollection<Module>>('/course/module' + q),
          apiRequest<ApiCollection<Lecture>>('/course/lecture' + q),
          apiRequest<ApiCollection<Quiz>>('/course/quiz' + q)
        ])
        setModules(m.data || [])
        setLectures(l.data || [])
        setQuizzes(z.data || [])
      }
    } catch (e) { setError(message(e)) }
    finally { setLoading(false) }
  }, [courseId, isAuthenticated, token])

  useEffect(() => { void load() }, [load])

  const enroll = async () => {
    if (!selected || !startDate) return
    setBusy(true); setError(''); setNotice('')
    try {
      await apiRequest('/enrollment', { method: 'POST', token, body: JSON.stringify({ course: selected._id, bootcamp: refId(selected.bootcamp), startDate }) })
      setNotice('Enrollment created successfully.')
      await load()
    } catch (e) { setError(message(e)) }
    finally { setBusy(false) }
  }

  const updateEnrollment = async (patch: Partial<Enrollment>) => {
    if (!enrollment) return
    setBusy(true); setError('')
    try {
      await apiRequest('/enrollment/' + enrollment._id, { method: 'PUT', token, body: JSON.stringify(patch) })
      setNotice('Enrollment updated.')
      await load()
    } catch (e) { setError(message(e)) }
    finally { setBusy(false) }
  }

  const recordEvent = async (eventType: 'lesson_started' | 'lesson_completed' | 'resource_viewed', lecture: Lecture) => {
    setError('')
    try {
      await apiRequest('/dashboard/event', { method: 'POST', token, body: JSON.stringify({ eventType, courseId, bootcampId: refId(selected?.bootcamp), metadata: { lectureId: lecture._id } }) })
      setNotice('Learning activity recorded.')
    } catch (e) { setError(message(e)) }
  }

  const beginEdit = (type: Kind, item?: Module | Lecture | Quiz) => {
    setKind(type); setEditing(item?._id || '')
    setForm({ ...emptyForm, ...item, module: item && 'module' in item ? item.module : '', resources: item && 'resources' in item ? (item.resources || []).join('\n') : '', questions: item && 'questions' in item ? JSON.stringify(item.questions, null, 2) : '[]' })
  }

  const save = async () => {
    if (!courseId || !form.title.trim()) return
    setBusy(true); setError(''); setNotice('')
    try {
      const base = '/course/' + kind
      const payload: Record<string, unknown> = { course: courseId, title: form.title, labelKey: form.labelKey || form.title, description: form.description, order: Number(form.order) }
      if (kind !== 'module') {
        if (!form.module) throw new Error('Select a module first.')
        payload.module = form.module
      }
      if (kind === 'lecture') {
        payload.content = form.content
        payload.durationMinutes = Number(form.durationMinutes)
        payload.resources = form.resources.split('\n').map(x => x.trim()).filter(Boolean)
      }
      if (kind === 'quiz') {
        const questions = JSON.parse(form.questions)
        if (!Array.isArray(questions)) throw new Error('Questions must be a JSON array.')
        payload.questions = questions
        payload.passingScore = Number(form.passingScore)
      }
      await apiRequest(base + (editing ? '/' + editing : ''), { method: editing ? 'PUT' : 'POST', token, body: JSON.stringify(payload) })
      setNotice(kind + (editing ? ' updated.' : ' created.'))
      beginEdit(kind)
      await load()
    } catch (e) { setError(message(e)) }
    finally { setBusy(false) }
  }

  const remove = async (type: Kind, id: string) => {
    if (!window.confirm('Delete this ' + type + '?')) return
    setBusy(true); setError('')
    try {
      await apiRequest('/course/' + type + '/' + id, { method: 'DELETE', token })
      setNotice(type + ' deleted.')
      await load()
    } catch (e) { setError(message(e)) }
    finally { setBusy(false) }
  }

  const checkQuiz = (quiz: Quiz) => {
    const supported = quiz.questions.every(q => q.type === 'multiple_choice' || !q.type)
    if (!supported || quiz.questions.some(q => q.answer === undefined || q.answer === null)) {
      setQuizResult(prev => ({ ...prev, [quiz._id]: 'This quiz cannot be graded locally. Ask your trainer.' }))
      return
    }
    const total = quiz.questions.reduce((sum, q) => sum + (q.points ?? 1), 0)
    const earned = quiz.questions.reduce((sum, q, index) => {
      const given = answers[quiz._id + ':' + index]
      const expected = q.answer
      const correct = typeof expected === 'number' ? String(expected) === given : String(expected) === given || (q.options?.[Number(given)] === expected)
      return sum + (correct ? (q.points ?? 1) : 0)
    }, 0)
    const score = total ? Math.round(earned / total * 100) : 0
    setQuizResult(prev => ({ ...prev, [quiz._id]: 'Practice result: ' + score + '% (' + (score >= quiz.passingScore ? 'pass' : 'retry') + '). Not saved to server.' }))
  }

  if (loading) return <Stack alignItems="center" py={8}><CircularProgress /></Stack>
  return <Stack spacing={3}>
    <Box><Typography variant="h4">{selected ? selected.title : 'Courses'}</Typography><Typography color="text.secondary">{selected ? selected.description : 'Browse courses and continue your learning.'}</Typography></Box>
    {error && <Alert severity="error" onClose={() => setError('')}>{error}</Alert>}
    {notice && <Alert severity="success" onClose={() => setNotice('')}>{notice}</Alert>}
    {!courseId && <Grid2 container spacing={2}>{courses.map(course => <Grid2 key={course._id} size={{ xs: 12, md: 6 }}><Card><CardContent><Stack spacing={2}><Typography variant="h6">{course.title}</Typography><Typography>{course.description}</Typography><Stack direction="row" spacing={1}><Chip label={course.duration} /><Chip label={course.minimumSkill} /></Stack><Button component={Link} to={PATH.COURSE.ROOT + '/' + course._id} variant="contained">View course</Button></Stack></CardContent></Card></Grid2>)}</Grid2>}
    {!courseId && courses.length === 0 && <Alert severity="info">No courses are available yet.</Alert>}
    {courseId && !selected && <Alert severity="warning">Course not found. <Link to={PATH.COURSE.ROOT}>Back to courses</Link></Alert>}
    {selected && <>
      <Button component={Link} to={PATH.COURSE.ROOT} sx={{ alignSelf: 'start' }}>All courses</Button>
      {isAuthenticated ? <Card><CardContent><Stack spacing={2}><Typography variant="h6">Enrollment</Typography>
        {enrollment ? <><Chip sx={{ alignSelf: 'start' }} label={enrollment.status} color="primary" /><Typography>Start date: {new Date(enrollment.startDate).toLocaleDateString()}</Typography><LinearProgress variant="determinate" value={enrollment.progress || 0} /><Typography>{enrollment.progress || 0}% complete</Typography><Stack direction="row" spacing={1}><Button disabled={busy} variant="outlined" onClick={() => updateEnrollment({ status: 'in_progress' })}>Start learning</Button><Button disabled={busy} onClick={() => updateEnrollment({ status: 'completed', progress: 100 })}>Mark course complete</Button></Stack></> :
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}><TextField label="Start date" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} slotProps={{ inputLabel: { shrink: true }, htmlInput: { min: today() } }} /><Button variant="contained" disabled={busy || !startDate || startDate < today()} onClick={enroll}>Enroll in course</Button></Stack>}
      </Stack></CardContent></Card> : <Alert severity="info">Sign in to enroll in this course.</Alert>}
      <Typography variant="h5">Course content</Typography>
      {modules.length === 0 && <Alert severity="info">No modules have been published. {canManage ? 'Use Manage course content below to create the first module, or import a JSON package.' : 'Ask your trainer to add course modules.'}</Alert>}
      {modules.map(mod => <Accordion key={mod._id}><AccordionSummary expandIcon={<ExpandMoreIcon />}><Stack direction="row" alignItems="center" spacing={2}><Typography variant="h6">{mod.title}</Typography><Chip size="small" label={'Module ' + mod.order} /></Stack></AccordionSummary><AccordionDetails><Stack spacing={2}><Typography>{mod.description}</Typography>
        {lectures.filter(l => l.module === mod._id).map(lecture => <Card variant="outlined" key={lecture._id}><CardContent><Stack spacing={1}><Typography variant="subtitle1">{lecture.title} · {lecture.durationMinutes} min</Typography><Typography>{lecture.description}</Typography><Typography sx={{ whiteSpace: 'pre-wrap' }}>{lecture.content}</Typography>{lecture.resources?.map(url => <Typography key={url} variant="body2"><a href={url} target="_blank" rel="noopener noreferrer">{url}</a></Typography>)}{isAuthenticated && enrollment && <Stack direction="row" spacing={1}><Button size="small" onClick={() => recordEvent('lesson_started', lecture)}>Start lecture</Button><Button size="small" onClick={() => recordEvent('lesson_completed', lecture)}>Mark lecture viewed</Button></Stack>}{canManage && <Stack direction="row" spacing={1}><Button onClick={() => beginEdit('lecture', lecture)}>Edit</Button><Button color="error" disabled={busy} onClick={() => remove('lecture', lecture._id)}>Delete</Button></Stack>}</Stack></CardContent></Card>)}
        {quizzes.filter(q => q.module === mod._id).map(quiz => <Card variant="outlined" key={quiz._id}><CardContent><Stack spacing={2}><Typography variant="h6">{quiz.title}</Typography><Typography>{quiz.description}</Typography><Typography variant="caption">Practice only: answers and results are not stored by the server.</Typography>{quiz.questions.map((question, index) => <Box key={index}><Typography>{index + 1}. {question.prompt}</Typography><TextField fullWidth select label="Answer" value={answers[quiz._id + ':' + index] ?? ''} onChange={e => setAnswers(prev => ({ ...prev, [quiz._id + ':' + index]: e.target.value }))} sx={{ mt: 1 }}><MenuItem value="">Select answer</MenuItem>{(question.options || []).map((option, i) => <MenuItem key={i} value={String(i)}>{option}</MenuItem>)}</TextField></Box>)}<Button variant="outlined" onClick={() => checkQuiz(quiz)} disabled={!quiz.questions.length}>Check practice answers</Button>{quizResult[quiz._id] && <Alert severity="info">{quizResult[quiz._id]}</Alert>}{canManage && <Stack direction="row" spacing={1}><Button onClick={() => beginEdit('quiz', quiz)}>Edit</Button><Button color="error" disabled={busy} onClick={() => remove('quiz', quiz._id)}>Delete</Button></Stack>}</Stack></CardContent></Card>)}
        {canManage && <Stack direction="row" spacing={1}><Button onClick={() => beginEdit('module', mod)}>Edit module</Button><Button color="error" disabled={busy} onClick={() => remove('module', mod._id)}>Delete module</Button><Button onClick={() => { beginEdit('lecture'); setForm(prev => ({ ...prev, module: mod._id })) }}>Add lecture</Button><Button onClick={() => { beginEdit('quiz'); setForm(prev => ({ ...prev, module: mod._id })) }}>Add quiz</Button></Stack>}
      </Stack></AccordionDetails></Accordion>)}
      {canManage && <CourseContentImporter courseId={selected._id} token={token} onImported={load} />}
      {canManage && <Card><CardContent><Stack spacing={2}><Typography variant="h5">Manage course content</Typography><Stack direction="row" spacing={1}>{(['module', 'lecture', 'quiz'] as Kind[]).map(k => <Button key={k} variant={kind === k ? 'contained' : 'outlined'} onClick={() => beginEdit(k)}>New {k}</Button>)}</Stack><Divider /><Typography variant="h6">{editing ? 'Edit' : 'Create'} {kind}</Typography><TextField label="Title" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /><TextField label="Translation key (optional)" value={form.labelKey} onChange={e => setForm({ ...form, labelKey: e.target.value })} /><TextField label="Description" multiline minRows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /><TextField label="Order" type="number" value={form.order} onChange={e => setForm({ ...form, order: Number(e.target.value) })} />{kind !== 'module' && <TextField select label="Module" value={form.module} onChange={e => setForm({ ...form, module: e.target.value })}>{modules.map(m => <MenuItem key={m._id} value={m._id}>{m.title}</MenuItem>)}</TextField>}{kind === 'lecture' && <><TextField label="Lecture content" multiline minRows={5} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} /><TextField label="Resources (one URL per line)" multiline minRows={2} value={form.resources} onChange={e => setForm({ ...form, resources: e.target.value })} /><TextField label="Duration (minutes)" type="number" value={form.durationMinutes} onChange={e => setForm({ ...form, durationMinutes: Number(e.target.value) })} /></>}{kind === 'quiz' && <><TextField label="Passing score (%)" type="number" value={form.passingScore} onChange={e => setForm({ ...form, passingScore: Number(e.target.value) })} /><TextField label="Questions (JSON array)" multiline minRows={6} value={form.questions} onChange={e => setForm({ ...form, questions: e.target.value })} helperText={'Example: [{"prompt":"Question?","type":"multiple_choice","options":["A","B"],"answer":0,"points":1}]'} /></>}<Stack direction="row" spacing={1}><Button variant="contained" disabled={busy || !form.title || (kind !== 'module' && !form.module)} onClick={save}>{editing ? 'Save changes' : 'Create ' + kind}</Button>{editing && <Button onClick={() => beginEdit(kind)}>Cancel editing</Button>}</Stack></Stack></CardContent></Card>}
    </>}
  </Stack>
}
