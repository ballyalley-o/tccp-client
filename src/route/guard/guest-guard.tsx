import { useAppSelector } from 'app/hook'
import { Navigate, Outlet } from 'react-router-dom'
import { PATH } from 'route/path'

const GuestGuard = () => {
    const { isAuthenticated, sessionChecked } = useAppSelector((state) => state.auth)

    if (!sessionChecked) {
        return null
    }

    if (isAuthenticated) {
        return <Navigate to={PATH.DASHBOARD} replace />
    }
    return (
       <Outlet />
    )
}

export default GuestGuard
