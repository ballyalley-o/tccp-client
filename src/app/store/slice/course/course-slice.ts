import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiRequest } from 'lib/api'
import type { ApiCollection, ApiSingle, Course, CourseDraft } from 'types/model'

interface CourseState {
  items : Course[]
  status: AppStateStatusType
  error : string | null
}

const initialState: CourseState = {
  items : [],
  status: 'idle',
  error : null,
}

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  return apiRequest<ApiCollection<Course>>('/course')
})

export const createCourse = createAsyncThunk(
  'courses/createCourse',
  async ({ bootcampId, draft, token }: { bootcampId: string; draft: CourseDraft; token: string | null }) => {
    return apiRequest<ApiSingle<Course>>(`/bootcamp/${bootcampId}/course`, {
      method: 'POST',
      token,
      body: JSON.stringify(draft)
    })
  }
)

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload.data
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unable to load courses'
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.items = [action.payload.data, ...state.items]
        }
      })
  }
})

export default coursesSlice.reducer
