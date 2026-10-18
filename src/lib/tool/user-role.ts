import type { User, UserRole } from 'types/model'

export const getUserRole = (user: Pick<User, 'role'> | null | undefined): UserRole => {
  const role = typeof user?.role === 'string' ? user.role : user?.role?.name
  switch (role) {
    case 'admin':
    case 'trainer':
    case 'student':
    case 'user':
      return role
    default:
      return 'guest'
  }
}
