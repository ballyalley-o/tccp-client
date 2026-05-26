import type { RouteObject } from 'react-router-dom'
import { AuthGuard } from 'route/guard'
import { PATH } from 'route/path'
import { AppProtectedRoute } from 'component/app/app-protected-route'
import { AuthAccountPage, AuthLogInPage, AuthRegisterPage, AuthSettingPage, ManagePage } from 'route/element'

const authRoute: RouteObject[] = [
    {
        element: <AuthGuard />,
        children: [
                {
                    path   : PATH.AUTH.LOG_IN,
                    element: <AuthLogInPage />
                },
                {
                    path   : PATH.AUTH.REGISTER,
                    element: <AuthRegisterPage />
                }
        ]
    },
    {
        element: <AppProtectedRoute />,
        children: [
            {
                path   : PATH.AUTH.ACCOUNT,
                element: <AuthAccountPage />
            },
            {
                path   : PATH.AUTH.SETTING,
                element: <AuthSettingPage />
            }
        ]
    },
    {
        element: <AppProtectedRoute roles={['trainer', 'admin']} />,
        children: [
            {
                path   : PATH.AUTH.MANAGE,
                element: <ManagePage />
            }
        ]
    }
]

export default authRoute
