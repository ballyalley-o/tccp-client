import { createBrowserRouter } from "react-router-dom"
import { FallbackErrorPage } from "page/fallback"

import { dashboardRoute, bootcampRoute, authRoute } from 'route/module'
import { AuthLayout, DashboardLayout, RootLayout } from "route/layout"
import { AuthGuard, GuestGuard } from "route/guard"

const router = createBrowserRouter([
    {
        element     : <RootLayout />,
        errorElement: <FallbackErrorPage />,
        children    : [
           ...bootcampRoute,
        ]
    },
    {
        element: <GuestGuard />,
        children: [
            {
                element : <AuthLayout />,
                children: [
                    ...authRoute
                ]
            }
        ]
    },
    {
        element: <AuthGuard />,
        children: [
            {
                element: <DashboardLayout />,
                children: [
                    ...dashboardRoute,
                ]
            }
        ]
    }
])

export default router
