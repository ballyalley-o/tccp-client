import type { RouteObject } from 'react-router-dom'
import { PATH } from 'route/path'
import { AuthLogInPage, AuthRegisterPage } from 'route/element'

const authRoute: RouteObject[] = [
    {
        path   : PATH.AUTH.LOG_IN,
        element: <AuthLogInPage />
    },
    {
        path   : PATH.AUTH.REGISTER,
        element: <AuthRegisterPage />
    }
]

export default authRoute
