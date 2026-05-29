import { useAppSelector } from 'app/hook'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { PATH } from 'route/path'

const AuthGuard = () => {
  const { isAuthenticated, status } = useAppSelector((state) => state.auth)
  const location                    = useLocation()

    if (status === 'loading') {
        return null
    }

    if (!isAuthenticated) {
        return (
            <Navigate to={PATH.AUTH.LOG_IN} replace state={{ from: location }} />
        )
    }
  return (
    <Outlet/>
  )
}

export default AuthGuard
