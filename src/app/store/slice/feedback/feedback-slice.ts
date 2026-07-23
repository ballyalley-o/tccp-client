import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiRequest } from 'lib/api'
import type { ApiCollection, ApiSingle, Feedback, FeedbackDraft } from 'types/model'

interface FeedbackState {
  items       : Feedback[]
  status      : AppStateStatusType
  createStatus: AppStateStatusType
  error       : string | null
}

const initialState: FeedbackState = {
  items       : [],
  status      : 'idle',
  createStatus: 'idle',
  error       : null,
}

export const fetchFeedbacks = createAsyncThunk(
  'feedback/fetchFeedbacks',
  async (query: { bootcampId?: string } | undefined) => {
    const path = query?.bootcampId ? `/bootcamp/${query.bootcampId}/feedback` : '/feedback'
    return apiRequest<ApiCollection<Feedback>>(path)
  }
)

export const createFeedback = createAsyncThunk(
  'feedback/createFeedback',
  async ({ bootcampId, draft, token }: { bootcampId: string; draft: FeedbackDraft; token: string | null }) => {
    return apiRequest<ApiSingle<Feedback>>(`/bootcamp/${bootcampId}/feedback`, {
      method: 'POST',
      token,
      body  : JSON.stringify(draft)
    })
  }
)

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    clearFeedbackError(state) {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbacks.pending, (state) => {
        state.status = 'loading'
        state.error  = null
      })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items  = action.payload.data
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.status = 'failed'
        state.error  = action.error.message ?? 'Unable to load feedback'
      })
      .addCase(createFeedback.pending, (state) => {
        state.createStatus = 'loading'
        state.error        = null
      })
      .addCase(createFeedback.fulfilled, (state, action) => {
        state.createStatus = 'succeeded'
        if (action.payload.data) {
          state.items = [action.payload.data, ...state.items]
        }
      })
      .addCase(createFeedback.rejected, (state, action) => {
        state.createStatus = 'failed'
        state.error        = action.error.message ?? 'Unable to create feedback'
      })
  }
})

export const { clearFeedbackError } = feedbackSlice.actions
export default feedbackSlice.reducer
