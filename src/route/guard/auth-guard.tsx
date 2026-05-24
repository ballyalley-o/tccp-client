import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { PATH } from 'route/path'

const AuthGuard = () => {
    const location        = useLocation()
    const isAuthenticated = true // replace later

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