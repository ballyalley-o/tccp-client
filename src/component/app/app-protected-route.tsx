import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from 'app/hook'
import type { UserRole } from '../../types/model'

interface ProtectedRouteProps {
  roles?: UserRole[]
}

export function AppProtectedRoute({ roles }: ProtectedRouteProps) {
  const location = useLocation()
  const user     = useAppSelector((state) => state.auth.user)

  if (!user) {
    return <Navigate to="/log-in" replace state={{ from: location }} />
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
