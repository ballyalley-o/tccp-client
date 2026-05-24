import { Navigate, Outlet } from 'react-router-dom'
import { PATH } from 'route/path'

const GuestGuard = () => {
    const isAuthenticated = false

    if (isAuthenticated) {
        return <Navigate to={PATH.DASHBOARD} replace />
    }
    return (
       <Outlet />
    )
}

export default GuestGuard