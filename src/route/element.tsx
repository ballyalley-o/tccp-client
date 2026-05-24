import { lazy } from "react"
import { Loadable } from "route/loadable"

export const DashboardPage      = Loadable(lazy(() => import("page/dashboard/dashboard-page")))
export const BootcampListPage   = Loadable(lazy(() => import('page/bootcamp/bootcamp-list-page')))
export const BootcampDetailPage = Loadable(lazy(() => import('page/bootcamp/bootcamp-detail-page')))
// auth
export const AuthLoginPage = Loadable(lazy(() => import('page/auth/auth-login-page')))

