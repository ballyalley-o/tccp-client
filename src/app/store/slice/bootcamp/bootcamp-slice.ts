import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiRequest, asQueryString } from 'lib/api'
import type { ApiCollection, ApiSingle, Bootcamp, BootcampDraft } from 'types/model'

const initialState: BootcampsState = {
  items       : [],
  selected    : null,
  status      : 'idle',
  detailStatus: 'idle',
  error       : null,
  page        : 1,
  limit       : 12,
  hasNextPage : false
}

export const fetchBootcamps = createAsyncThunk(
  'bootcamps/fetchBootcamps',
  async (query: { page?: number; limit?: number; sort?: string; name?: string } | undefined) => {
    const page  = query?.page ?? 1
    const limit = query?.limit ?? 12
    return apiRequest<ApiCollection<Bootcamp>>(
      `/bootcamp${asQueryString({ page, limit, sort: query?.sort, name: query?.name })}`
    )
  }
)

export const fetchTopBootcamps = createAsyncThunk('bootcamps/fetchTopBootcamps', async () => {
  return apiRequest<ApiCollection<Bootcamp>>('/bootcamp/top')
})

export const fetchBootcampBySlug = createAsyncThunk('bootcamps/fetchBootcampBySlug', async (slug: string) => {
  return apiRequest<ApiSingle<Bootcamp>>(`/bootcamp/${slug}`)
})

export const createBootcamp = createAsyncThunk(
  'bootcamps/createBootcamp',
  async ({ draft, token }: { draft: BootcampDraft; token: string | null }) => {
    return apiRequest<ApiSingle<Bootcamp>>('/bootcamp/create', {
      method: 'POST',
      token,
      body: JSON.stringify(draft)
    })
  }
)

const bootcampsSlice = createSlice({
  name: 'bootcamps',
  initialState,
  reducers: {
    clearSelectedBootcamp(state) {
      state.selected = null
      state.detailStatus = 'idle'
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBootcamps.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchBootcamps.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload.data
        state.hasNextPage = Boolean(action.payload.pagination?.next)
      })
      .addCase(fetchBootcamps.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unable to load bootcamps'
      })
      .addCase(fetchTopBootcamps.fulfilled, (state, action) => {
        state.items = action.payload.data
      })
      .addCase(fetchBootcampBySlug.pending, (state) => {
        state.detailStatus = 'loading'
        state.error = null
      })
      .addCase(fetchBootcampBySlug.fulfilled, (state, action) => {
        state.detailStatus = 'succeeded'
        state.selected = action.payload.data ?? null
      })
      .addCase(fetchBootcampBySlug.rejected, (state, action) => {
        state.detailStatus = 'failed'
        state.error = action.error.message ?? 'Unable to load bootcamp'
      })
      .addCase(createBootcamp.fulfilled, (state, action) => {
        if (action.payload.data) {
          state.items = [action.payload.data, ...state.items]
          state.selected = action.payload.data
        }
      })
  }
})

export const { clearSelectedBootcamp } = bootcampsSlice.actions
export default bootcampsSlice.reducer
