import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { apiRequest } from 'lib/api'
import type { ApiSingle, User } from 'types/model'
import type { AuthState, LoginCredential, RegisterCredential } from 'types/auth'
import { transl } from 'lib/tool'

const initialState: AuthState = {
  user  : null,
  token : null,
  status: 'idle',
  error : null
}

export const login = createAsyncThunk('auth/login', async (credentials: LoginCredential) => {
  return apiRequest<ApiSingle<User>>('/auth/log-in', {
    method: 'POST',
    body  : JSON.stringify(credentials)
  })
})

export const register = createAsyncThunk('auth/register', async (credentials: RegisterCredential) => {
  return apiRequest<ApiSingle<User>>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(credentials)
  })
})

export const fetchAccount = createAsyncThunk('auth/fetchAccount', async (_, { getState }) => {
  const state = getState() as { auth: AuthState }
  return apiRequest<ApiSingle<User>>('/auth/account', {
    token: state.auth.token
  })
})

export const logout = createAsyncThunk('auth/logout', async () => {
  return apiRequest<ApiSingle<Record<string, never>>>('/auth/log-out', {
    method: 'POST'
  })
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null
    },
    clearSession(state) {
      state.user = null
      state.token = null
      state.status = 'idle'
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
        state.error  = null
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<ApiSingle<User>>) => {
        state.status = 'succeeded'
        state.token  = action.payload.token ?? null
        state.user   = action.payload.user ?? null
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error  = action.error.message ?? transl('error.unable_log_in')
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading'
        state.error  = null
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<ApiSingle<User>>) => {
        state.status = 'succeeded'
        state.token  = action.payload.token ?? null
        state.user   = action.payload.user ?? null
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed'
        state.error  = action.error.message ?? transl('error.unable_create_account')
      })
      .addCase(fetchAccount.fulfilled, (state, action: PayloadAction<ApiSingle<User>>) => {
        state.user = action.payload.data ?? action.payload.user ?? null
      })
      .addCase(fetchAccount.rejected, (state) => {
        state.user  = null
        state.token = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.status = 'idle'
      })
  }
})

export const { clearAuthError, clearSession } = authSlice.actions
export default authSlice.reducer
