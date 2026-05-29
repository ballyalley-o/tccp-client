import { useAppSelector } from 'app/hook'
import { Navigate, Outlet } from 'react-router-dom'
import { PATH } from 'route/path'

const GuestGuard = () => {
    const { isAuthenticated, status } = useAppSelector((state) => state.auth)

    if (status === 'loading') {
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
