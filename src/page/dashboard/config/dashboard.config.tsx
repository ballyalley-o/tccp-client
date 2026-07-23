import type { User } from 'types'
import { MOCK_DATA } from 'mock/dashboard'

import type { DashboardAction, DashboardAudience, DashboardDataModelType } from '../dashboard'

export const DASHBOARD_MODELS: DashboardDataModelType = {
  guest: {
    audience             : 'guest',
    welcomeTitleFallback : 'dashboard.welcome_back',
    welcomeMessage       : 'dashboard.welcome_message_user',
    currentCourseTitle   : 'dashboard.your_current_courses',
    currentCourseCta     : 'continue',
    featuredTitle        : 'dashboard.featured_bootcamps',
    featuredDescription  : 'dashboard.featured_description',
    recommendationTitle  : 'dashboard.recommendation_title',
    recommendationMessage: 'dashboard.recommendation_message',
    stat                 : MOCK_DATA['guest'].stat,
    action               : MOCK_DATA['guest'].action,
    course               : MOCK_DATA['guest'].course,
    activity             : MOCK_DATA['guest'].activity,
    distribution         : MOCK_DATA['guest'].distribution,
    recommendation       : MOCK_DATA['guest'].recommendation,
  },
  user: {
    audience             : 'user',
    welcomeTitleFallback : 'dashboard.welcome_back',
    welcomeMessage       : 'dashboard.welcome_message_user',
    currentCourseTitle   : 'dashboard.your_current_courses',
    currentCourseCta     : 'continue',
    featuredTitle        : 'dashboard.featured_bootcamps',
    featuredDescription  : 'dashboard.featured_description',
    recommendationTitle  : 'dashboard.recommendation_title',
    recommendationMessage: 'dashboard.recommendation_message',
    stat                 : MOCK_DATA['user'].stat,
    action               : MOCK_DATA['user'].action,
    course               : MOCK_DATA['user'].course,
    activity             : MOCK_DATA['user'].activity,
    distribution         : MOCK_DATA['user'].distribution,
    recommendation       : MOCK_DATA['user'].recommendation,
  },
  trainer: {
    audience             : 'trainer',
    welcomeTitleFallback : 'dashboard.welcome_back',
    welcomeMessage       : 'dashboard.welcome_message_trainer',
    currentCourseTitle   : 'your_courses',
    currentCourseCta     : 'view',
    featuredTitle        : 'dashboard.featured_course_title_trainer',
    featuredDescription  : 'dashboard.featured_course_description_trainer',
    recommendationTitle  : 'Teaching Opportunities',
    recommendationMessage: 'Content areas gaining learner momentum.',
    stat                 : MOCK_DATA['trainer'].stat,
    action               : MOCK_DATA['trainer'].action as DashboardAction[],
    course               : MOCK_DATA['trainer'].course,
    activity             : MOCK_DATA['trainer'].activity,
    distribution         : MOCK_DATA['trainer'].distribution,
    recommendation       : MOCK_DATA['trainer'].recommendation,
  },

  admin: {
    audience             : 'admin',
    welcomeTitleFallback : 'dashboard.welcome_back',
    welcomeMessage       : 'dashboard.welcome_message_admin',
    currentCourseTitle   : 'dashboard.platform_watchlist',
    currentCourseCta     : 'review',
    featuredTitle        : 'dashboard.featured_course_title.admin',
    featuredDescription  : 'Catalogue items with strong learner engagement.',
    recommendationTitle  : 'Operational Focus',
    recommendationMessage: 'Areas worth checking before the next reporting cycle.',
    stat                 : MOCK_DATA['admin'].stat,
    action               : MOCK_DATA['admin'].action,
    course               : MOCK_DATA['admin'].course,
    activity             : MOCK_DATA['admin'].activity,
    distribution         : MOCK_DATA['admin'].distribution,
    recommendation       : MOCK_DATA['admin'].recommendation
  }
}

export const getDashboardAudience = (user: User | null): DashboardAudience => user?.role ?? 'guest'
