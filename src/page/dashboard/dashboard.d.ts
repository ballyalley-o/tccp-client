import { ReactNode } from "react"
import type { LocaleKey } from "lib/tool"
import { User } from "types"

export type DashboardAudience = User['role'] | 'guest'

export interface DashboardStat {
  id      : string
  icon    : ReactNode
  label   : LocaleKey
  value   : string
  tone    : AppThemeType
  subtitle: LocaleKey
}

export interface DashboardAction {
  id     : string
  icon   : ReactNode
  label  : LocaleKey
  path   : string
  variant: AppCtaVariantType
}

export interface DashboardCourse {
  id      : string
  title   : string
  meta    : string
  status  : string
  progress: number
}

export interface DashboardRecommendation {
  id      : string
  title   : string
  meta    : LocaleKey
  action  : string
  path    : string
}

export interface DashboardChartPoint {
  label: LocaleKey
  value: number
}

export interface DashboardChartPointString {
  label: string
  value: number
}

export interface DashboardModel {
  audience             : DashboardAudience
  welcomeTitleFallback : LocaleKey
  welcomeMessage       : LocaleKey
  currentCourseTitle   : LocaleKey
  currentCourseCta     : LocaleKey
  featuredTitle        : string
  featuredDescription  : string
  recommendationTitle  : string
  recommendationMessage: string
  stat                 ?: DashboardStat[]
  action               : DashboardAction[]
  course               : DashboardCourse[]
  activity             : DashboardChartPoint[]
  distribution         : DashboardChartPointString[]
  recommendation       : DashboardRecommendation[]
}

export type DashboardDataModelType = Record<DashboardAudience, DashboardModel>