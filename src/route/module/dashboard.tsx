import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { DashboardPage } from 'route/element'
import { PATH } from 'route/path'

const dashboardRoute: RouteObject[] = [
    {
        index  : true,
        element: <Navigate to={PATH.DASHBOARD} replace />
    },
    {
        path   : PATH.DASHBOARD,
        element: <DashboardPage />
    }
]

export default dashboardRoute