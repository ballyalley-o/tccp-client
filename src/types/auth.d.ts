import type { User } from 'types/model'

declare interface AuthState {
  user  : User | null
  token : string | null
  status: AppStateStatusType
  error : string | null
}

declare interface LoginCredential {
  email   : string
  password: string
}

declare interface RegisterCredential extends LoginCredential {
  firstname    : string
  lastname    ?: string
  username     : string
  role         : User['role']
  organization?: string
}
