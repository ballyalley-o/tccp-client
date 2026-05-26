import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from 'app/hook'
import { PATH } from 'route/path'
import type { UserRole } from 'types/model'

interface ProtectedRouteProps {
  roles?: UserRole[]
}

export function AppProtectedRoute({ roles }: ProtectedRouteProps) {
  const location = useLocation()
  const user     = useAppSelector((state) => state.auth.user)

  if (!user) {
    return <Navigate to={PATH.AUTH.LOG_IN} replace state={{ from: location }} />
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to={PATH.ROOT} replace />
  }

  return <Outlet />
}
