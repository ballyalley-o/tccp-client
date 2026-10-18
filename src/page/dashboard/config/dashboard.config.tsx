import { getUserRole }                                                             from 'lib/tool/user-role'
import { Bookmark, BookmarkAddSharp, InsightsSharp, ManageSearch, Person, School } from '@mui/icons-material'
import type { User }                                                               from 'types'
import type { DashboardAudience, DashboardModel, DashboardChartPointString }       from '../dashboard'

export interface DashboardResponse {
  success: boolean
  data   : Omit<DashboardModel, 'stat' | 'action' | 'activity' | 'currentCourseCta'> & {
    currentCourseCta?: DashboardModel['currentCourseCta']
    stat            ?: Array<Omit<NonNullable<DashboardModel['stat']>[number], 'icon' | 'value'> & { value: string | number }>
    action           : Array<Omit<DashboardModel['action'][number],            'icon'> & { icon: string }>
    activity         : { series: DashboardChartPointString[] }
  }
}

const icons = {
  Bookmark        : <Bookmark />,
  BookmarkAddSharp: <BookmarkAddSharp />,
  InsightsSharp   : <InsightsSharp />,
  ManageSearch    : <ManageSearch />,
  Person          : <Person />,
  School          : <School />,
}

export const toDashboardModel = (data: DashboardResponse['data']): DashboardModel => ({
  ...data,
  currentCourseCta: data.currentCourseCta ?? 'view',
  stat            : data.stat?.map((stat) => ({ ...stat, value: String(stat.value), icon: <InsightsSharp /> })),
  action          : data.action.map((action) => ({
    ...action,
    icon: icons[action.icon as keyof typeof icons] ?? <InsightsSharp />,
  })),
  activity: data.activity.series,
})

export const getDashboardAudience = (user: User | null): DashboardAudience => {
  const  role   = getUserRole(user)
  return role === 'student' ? 'user' : role
}
