import { useState, type ChangeEvent } from 'react'
import { Alert, Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { apiRequest } from 'lib/api'
import type { ApiSingle } from 'types/model'

type Question = { prompt: string; options: string[]; answer: number | string; points?: number; type?: string }
type QuizImport = { title: string; description?: string; passingScore?: number; questions: Question[]; order?: number }
type LectureImport = { title: string; description?: string; content?: string; resources?: string[]; durationMinutes?: number; order?: number }
type ModuleImport = { title: string; description?: string; order?: number; lectures?: LectureImport[]; quizzes?: QuizImport[] }
type ImportFile = { modules: ModuleImport[] }
type Created = { _id: string }

function validate(input: unknown): ImportFile {
  if (!input || typeof input !== 'object' || !('modules' in input) || !Array.isArray(input.modules)) {
    throw new Error('The JSON file must contain a modules array.')
  }
  const data = input as ImportFile
  if (!data.modules.length) throw new Error('At least one module is required.')
  for (const mod of data.modules) {
    if (!mod || typeof mod.title !== 'string' || !mod.title.trim()) throw new Error('Every module needs a title.')
    if (mod.lectures !== undefined && !Array.isArray(mod.lectures)) throw new Error('Lectures must be an array.')
    if (mod.quizzes !== undefined && !Array.isArray(mod.quizzes)) throw new Error('Quizzes must be an array.')
    for (const lecture of mod.lectures || []) {
      if (!lecture.title?.trim()) throw new Error('Every lecture needs a title.')
    }
    for (const quiz of mod.quizzes || []) {
      if (!quiz.title?.trim() || !Array.isArray(quiz.questions) || quiz.questions.length === 0) throw new Error('Each quiz needs a title and questions.')
      for (const question of quiz.questions) {
        if (!question.prompt?.trim() || !Array.isArray(question.options) || question.options.length < 2) throw new Error('Each question needs a prompt and at least two options.')
        if (typeof question.answer === 'number' && (question.answer < 0 || question.answer >= question.options.length)) throw new Error('Answer index is outside the options list.')
      }
    }
  }
  return data
}

/** Imports structured teaching content using the existing course CRUD API.
 * No binary upload endpoint exists; the JSON file is parsed in the browser.
 */
export default function CourseContentImporter({ courseId, token, onImported }: { courseId: string; token: string | null; onImported: () => Promise<void> }) {
  const [data, setData] = useState<ImportFile | null>(null)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState('')
  const [busy, setBusy] = useState(false)

  const selectFile = async (event: ChangeEvent<HTMLInputElement>) => {
    setData(null); setError(''); setProgress('')
    const file = event.target.files?.[0]
    if (!file) return
    if (file.size > 1024 * 1024) { setError('Maximum file size is 1 MB.'); return }
    try { setData(validate(JSON.parse(await file.text()))) }
    catch (err) { setError(err instanceof Error ? err.message : 'Invalid JSON file.') }
    event.target.value = ''
  }

  const upload = async () => {
    if (!data) return
    setBusy(true); setError(''); setProgress('')
    let count = 0
    try {
      for (const [index, mod] of data.modules.entries()) {
        const created = await apiRequest<ApiSingle<Created>>('/course/module', {
          method: 'POST', token,
          body: JSON.stringify({ course: courseId, title: mod.title, labelKey: mod.title, description: mod.description || '', order: mod.order ?? index + 1 })
        })
        const moduleId = created.data?._id
        if (!moduleId) throw new Error('Module was created without an ID.')
        count++
        for (const [i, lecture] of (mod.lectures || []).entries()) {
          await apiRequest('/course/lecture', {
            method: 'POST', token,
            body: JSON.stringify({ ...lecture, course: courseId, module: moduleId, labelKey: lecture.title, order: lecture.order ?? i + 1, durationMinutes: lecture.durationMinutes ?? 0, resources: lecture.resources || [] })
          })
          count++
        }
        for (const [i, quiz] of (mod.quizzes || []).entries()) {
          await apiRequest('/course/quiz', {
            method: 'POST', token,
            body: JSON.stringify({ ...quiz, course: courseId, module: moduleId, labelKey: quiz.title, order: quiz.order ?? i + 1, passingScore: quiz.passingScore ?? 70 })
          })
          count++
        }
        setProgress('Imported ' + (index + 1) + ' of ' + data.modules.length + ' modules.')
      }
      setData(null)
      setProgress('Successfully created ' + count + ' content records.')
    } catch (err) {
      setError((err instanceof Error ? err.message : 'Import failed.') + ' Previously created records remain saved; review the course before retrying.')
    } finally {
      setBusy(false)
      await onImported()
    }
  }

  return <Card variant="outlined"><CardContent><Stack spacing={2}>
    <Typography variant="h6">Import trainer modules and quizzes</Typography>
    <Typography color="text.secondary">Choose a JSON course package. It can include modules, lectures and multiple-choice quizzes. Content is created in this course using your trainer permissions.</Typography>
    <Button component="label" variant="outlined" disabled={busy}>Choose JSON file<input hidden type="file" accept=".json,application/json" onChange={selectFile} /></Button>
    {data && <Alert severity="info">Ready to import {data.modules.length} modules, {data.modules.reduce((n, m) => n + (m.lectures?.length || 0), 0)} lectures and {data.modules.reduce((n, m) => n + (m.quizzes?.length || 0), 0)} quizzes.</Alert>}
    {error && <Alert severity="error">{error}</Alert>}
    {progress && <Alert severity="success">{progress}</Alert>}
    <Button variant="contained" disabled={!data || busy} onClick={upload}>{busy ? 'Importing…' : 'Create imported content'}</Button>
    <Typography variant="caption">Files such as PDFs, PowerPoint presentations and videos require a separate server storage/upload API. This importer supports structured JSON only.</Typography>
  </Stack></CardContent></Card>
}
