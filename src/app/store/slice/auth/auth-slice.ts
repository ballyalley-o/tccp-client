import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { apiRequest } from 'lib/api'
import type { ApiSingle, User } from 'types/model'
import type { AccountUpdateCredential, AuthState, LoginCredential, RegisterCredential } from 'types/auth'
import { transl } from 'lib/tool'

const initialState: AuthState = {
  user           : null,
  isAuthenticated: false,
  token          : null,
  status         : 'loading',
  error          : null
}

export const login = createAsyncThunk('auth/login', async (credentials: LoginCredential) => {
  return apiRequest<ApiSingle<User>>('/auth/log-in', {
    method: 'POST',
    body  : JSON.stringify(credentials)
  })
})

export const register = createAsyncThunk('auth/register', async (credentials: RegisterCredential) => {
  const payload: RegisterCredential = {
    firstname: credentials.firstname.trim(),
    username : credentials.username.trim(),
    email    : credentials.email.trim(),
    password : credentials.password,
    role     : credentials.role,
    ...(credentials.lastname?.trim() ? { lastname: credentials.lastname.trim() } : {}),
    ...(credentials.role === 'admin' && credentials.organization?.trim() ? { organization: credentials.organization.trim() } : {}),
  }

  return apiRequest<ApiSingle<User>>('/auth/register', {
    method: 'POST',
    body  : JSON.stringify(payload)
  })
})

export const fetchAccount = createAsyncThunk('auth/fetchAccount', async (_, { getState }) => {
  const state = getState() as { auth: AuthState }
  return apiRequest<ApiSingle<User>>('/auth/account', {
    token: state.auth.token
  })
})

export const updateAccount = createAsyncThunk('auth/updateAccount', async (account: AccountUpdateCredential, { getState }) => {
  const state = getState() as { auth: AuthState }
  const payload: AccountUpdateCredential = {
    ...(account.firstname?.trim() ? { firstname: account.firstname.trim() } : {}),
    ...(account.lastname?.trim() ? { lastname: account.lastname.trim() } : {}),
    ...(account.username?.trim() ? { username: account.username.trim() } : {}),
    ...(account.email?.trim() ? { email: account.email.trim() } : {}),
    ...(account.location?.trim() ? { location: account.location.trim() } : {}),
    ...(account.avatar?.trim() ? { avatar: account.avatar.trim() } : {}),
  }

  return apiRequest<ApiSingle<User>>('/auth/update', {
    method: 'PUT',
    token : state.auth.token,
    body  : JSON.stringify(payload)
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
      state.user            = null
      state.token           = null
      state.isAuthenticated = false
      state.status          = 'idle'
      state.error           = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
        state.error  = null
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<ApiSingle<User>>) => {
        state.status          = 'succeeded'
        state.token           = action.payload.token ?? null
        state.isAuthenticated = action.payload.success
        state.user            = action.payload.user ?? null
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
        state.status          = 'succeeded'
        state.token           = action.payload.token ?? null
        state.user            = action.payload.user ?? null
        state.isAuthenticated = action.payload.success
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed'
        state.error  = action.error.message ?? transl('error.unable_create_account')
      })
      .addCase(fetchAccount.pending, (state) => {
        state.status = 'loading'
        state.error  = null
      })
      .addCase(fetchAccount.fulfilled, (state, action: PayloadAction<ApiSingle<User>>) => {
        const user             = action.payload.data ?? action.payload.user ?? null
        state.status           = 'succeeded'
        state.user             = user
        state.isAuthenticated  = Boolean(user)
        state.token            = action.payload.token ?? state.token
      })
      .addCase(fetchAccount.rejected, (state) => {
        state.status          = 'idle'
        state.user            = null
        state.isAuthenticated = false
        state.token           = null
      })
      .addCase(updateAccount.pending, (state) => {
        state.status = 'loading'
        state.error  = null
      })
      .addCase(updateAccount.fulfilled, (state, action: PayloadAction<ApiSingle<User>>) => {
        state.status = 'succeeded'
        state.user   = action.payload.data ?? action.payload.user ?? state.user
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.status = 'failed'
        state.error  = action.error.message ?? transl('error.failed_update')
      })
      .addCase(logout.fulfilled, (state) => {
        state.user            = null
        state.isAuthenticated = false
        state.token           = null
        state.status          = 'idle'
      })
  }
})

export const { clearAuthError, clearSession } = authSlice.actions
export default authSlice.reducer
