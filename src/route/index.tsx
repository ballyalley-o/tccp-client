import { createBrowserRouter, Navigate } from "react-router-dom"
import { FallbackErrorPage } from "page/fallback"

import { dashboardRoute, bootcampRoute, authRoute } from 'route/module'
import { AuthLayout, DashboardLayout, RootLayout } from "route/layout"
import { AuthAccountPage, AuthAccountUpdatePage, ManagePage, CourseWorkspacePage, BootcampCourseCms } from 'route/element'
import { AuthGuard, GuestGuard } from "route/guard"
import { AppProtectedRoute } from 'component/app'
import { PATH } from 'route/path'

const router = createBrowserRouter([
    {
        element     : <RootLayout />,
        errorElement: <FallbackErrorPage />,
        children    : [
           ...dashboardRoute,
           ...bootcampRoute,
           { path: PATH.COURSE.ROOT, element: <CourseWorkspacePage /> },
           { path: PATH.COURSE.DETAIL, element: <CourseWorkspacePage /> },
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
                    {
                        path   : PATH.AUTH.ACCOUNT.ROOT,
                        element: <AuthAccountPage />,
                        children: [
                            {
                                path   : PATH.AUTH.ACCOUNT.ROOT,
                                element: <AuthAccountUpdatePage />
                            },
                        ]
                    },

                    {
                        element: <AppProtectedRoute roles={['admin']} />,
                        children: [
                            { path: PATH.ADMIN.ROOT, element: <Navigate to={PATH.ADMIN.BOOTCAMP} replace /> },
                            { path: PATH.ADMIN.BOOTCAMP, element: <BootcampCourseCms /> }
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
            }
        ]
    }
])

export default router
