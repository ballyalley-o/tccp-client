import type { RouteObject } from 'react-router-dom'
import { DashboardPage } from 'route/element'
import { AuthGuard } from 'route/guard'
import { PATH } from 'route/path'

const authRoute: RouteObject[] = [
    {
        element: <AuthGuard />,
        children: [
                {
                    path   : PATH.DASHBOARD,
                    element: <DashboardPage />
                }
        ]
    }
]

export default authRoute