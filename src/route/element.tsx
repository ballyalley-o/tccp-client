import { lazy } from "react"
import { Loadable } from "route/loadable"

export const DashboardPage      = Loadable(lazy(() => import("page/dashboard/dashboard-page")))
export const BootcampListPage   = Loadable(lazy(() => import('page/bootcamp/bootcamp-list-page')))
    export const BootcampDetailPage = Loadable(lazy(() => import('page/bootcamp/bootcamp-detail-page')))

// auth
export const AuthLogInPage         = Loadable(lazy(() => import('page/auth/auth-login-page')))
export const AuthRegisterPage      = Loadable(lazy(() => import('page/auth/auth-register-page')))
export const AuthAccountPage       = Loadable(lazy(() => import('page/auth/auth-account-page')))
    export const AuthAccountUpdatePage = Loadable(lazy(() => import('page/auth/auth-account-update-page')))
export const ManagePage            = Loadable(lazy(() => import('page/manage/manage-page')))
