import type { ReactNode } from 'react'
import {
  AssignmentIndSharp,
  BookmarkBorder as BookmarkIcon,
  EmojiEvents as AchievementIcon,
  Explore as ExploreIcon,
  Insights as InsightsIcon,
  Login as LoginIcon,
  ManageSearch as ManageIcon,
  PersonAdd as PersonIcon,
  School as SchoolIcon,
  Speed as SpeedIcon,
  TrendingUp as TrendingIcon,
} from '@mui/icons-material'
import { PATH } from 'route/path'
import type { User } from 'types'

export type DashboardAudience = User['role'] | 'guest'

export type DashboardTone = 'primary' | 'success' | 'warning' | 'info'

export interface DashboardStat {
  id      : string
  icon    : ReactNode
  label   : string
  value   : string
  tone    : DashboardTone
  subtitle: string
}

export interface DashboardAction {
  id     : string
  icon   : ReactNode
  label  : string
  path   : string
  variant: 'contained' | 'outlined'
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
  meta    : string
  action  : string
  path    : string
}

export interface DashboardChartPoint {
  label: string
  value: number
}

export interface DashboardModel {
  audience             : DashboardAudience
  welcomeTitleFallback : string
  welcomeMessage       : string
  currentCourseTitle   : string
  currentCourseCta     : string
  featuredTitle        : string
  featuredDescription  : string
  recommendationTitle  : string
  recommendationMessage: string
  stats                : DashboardStat[]
  actions              : DashboardAction[]
  courses              : DashboardCourse[]
  activity             : DashboardChartPoint[]
  distribution         : DashboardChartPoint[]
  recommendations      : DashboardRecommendation[]
}

const sharedRecommendations: DashboardRecommendation[] = [
  {
    id    : 'full-stack-web',
    title : 'Full Stack Web Development',
    meta  : 'High demand pathway with broad hiring coverage',
    action: 'Explore',
    path  : PATH.BOOTCAMP.ROOT,
  },
  {
    id    : 'mobile-app',
    title : 'Mobile App Development',
    meta  : 'Strong fit for product teams and startup work',
    action: 'Explore',
    path  : PATH.BOOTCAMP.ROOT,
  },
  {
    id    : 'cloud-devops',
    title : 'Cloud & DevOps',
    meta  : 'Practical infrastructure and deployment skills',
    action: 'Explore',
    path  : PATH.BOOTCAMP.ROOT,
  },
]

export const DASHBOARD_MODELS: Record<DashboardAudience, DashboardModel> = {
  student: {
    audience             : 'student',
    welcomeTitleFallback : 'Welcome back',
    welcomeMessage       : 'Continue your learning journey and explore new bootcamps.',
    currentCourseTitle   : 'Your Current Courses',
    currentCourseCta     : 'Continue',
    featuredTitle        : 'Featured Bootcamps',
    featuredDescription  : 'Discover top-rated bootcamps aligned with your next move.',
    recommendationTitle  : 'Recommended For You',
    recommendationMessage: 'Based on your interests and learning goals.',
    stats                : [
      { id: 'progress', icon: <AssignmentIndSharp />, label: 'Learning Progress', value: '45%', tone: 'primary', subtitle: '2 courses active' },
      { id: 'completed', icon: <AchievementIcon />, label: 'Courses Completed', value: '3', tone: 'success', subtitle: 'Keep it up' },
      { id: 'streak', icon: <TrendingIcon />, label: 'Study Streak', value: '12', tone: 'warning', subtitle: 'days in a row' },
      { id: 'pace', icon: <SpeedIcon />, label: 'Avg. Speed', value: '95%', tone: 'info', subtitle: 'of target pace' },
    ],
    actions: [
      { id: 'browse-bootcamps', icon: <SchoolIcon />, label: 'Browse Bootcamps', path: PATH.BOOTCAMP.ROOT, variant: 'contained' },
      { id: 'browse-courses', icon: <BookmarkIcon />, label: 'Browse Courses', path: PATH.COURSE.ROOT, variant: 'outlined' },
      { id: 'profile', icon: <PersonIcon />, label: 'View Profile', path: PATH.AUTH.ACCOUNT.ROOT, variant: 'outlined' },
    ],
    courses: [
      { id: 'react-patterns', title: 'Advanced React Patterns', meta: 'TechBoot Academy', status: 'In Progress', progress: 65 },
      { id: 'api-foundations', title: 'API Foundations', meta: 'CodeCoach Labs', status: 'In Progress', progress: 89 },
    ],
    activity: [
      { label: 'Mon', value: 35 },
      { label: 'Tue', value: 48 },
      { label: 'Wed', value: 42 },
      { label: 'Thu', value: 58 },
      { label: 'Fri', value: 70 },
      { label: 'Sat', value: 54 },
      { label: 'Sun', value: 76 },
    ],
    distribution: [
      { label: 'React', value: 42 },
      { label: 'API', value: 28 },
      { label: 'Cloud', value: 18 },
      { label: 'Career', value: 12 },
    ],
    recommendations: sharedRecommendations,
  },
  trainer: {
    audience             : 'trainer',
    welcomeTitleFallback : 'Welcome back',
    welcomeMessage       : 'Manage your bootcamps, courses and track student progress.',
    currentCourseTitle   : 'Your Courses',
    currentCourseCta     : 'View',
    featuredTitle        : 'Popular Bootcamps',
    featuredDescription  : 'See what learners are choosing across the catalogue.',
    recommendationTitle  : 'Teaching Opportunities',
    recommendationMessage: 'Content areas gaining learner momentum.',
    stats                : [
      { id: 'active-courses', icon: <SchoolIcon />, label: 'Active Courses', value: '4', tone: 'primary', subtitle: 'published now' },
      { id: 'students', icon: <PersonIcon />, label: 'Total Students', value: '124', tone: 'success', subtitle: 'across all courses' },
      { id: 'rating', icon: <AchievementIcon />, label: 'Avg. Rating', value: '4.8', tone: 'warning', subtitle: 'out of 5.0' },
      { id: 'completion', icon: <TrendingIcon />, label: 'Completion Rate', value: '87%', tone: 'info', subtitle: 'last cohort' },
    ],
    actions: [
      { id: 'create-course', icon: <BookmarkIcon />, label: 'Create Course', path: PATH.AUTH.MANAGE, variant: 'contained' },
      { id: 'students', icon: <PersonIcon />, label: 'View Students', path: PATH.AUTH.MANAGE, variant: 'outlined' },
      { id: 'analytics', icon: <InsightsIcon />, label: 'Analytics', path: PATH.AUTH.MANAGE, variant: 'outlined' },
    ],
    courses: [
      { id: 'react-patterns', title: 'Advanced React Patterns', meta: '32 students enrolled', status: 'Active', progress: 65 },
      { id: 'cloud-delivery', title: 'Cloud Delivery Systems', meta: '28 students enrolled', status: 'Active', progress: 89 },
    ],
    activity: [
      { label: 'Mon', value: 68 },
      { label: 'Tue', value: 74 },
      { label: 'Wed', value: 71 },
      { label: 'Thu', value: 83 },
      { label: 'Fri', value: 87 },
      { label: 'Sat', value: 76 },
      { label: 'Sun', value: 81 },
    ],
    distribution: [
      { label: 'Active', value: 57 },
      { label: 'At Risk', value: 14 },
      { label: 'Review', value: 18 },
      { label: 'Done', value: 11 },
    ],
    recommendations: sharedRecommendations.map((item, index) => ({
      ...item,
      meta: `${45 + index * 10} similar bootcamps in market`,
      path: PATH.AUTH.MANAGE,
    })),
  },
  admin: {
    audience             : 'admin',
    welcomeTitleFallback : 'Welcome back',
    welcomeMessage       : 'Monitor the platform, active programs, and catalogue health.',
    currentCourseTitle   : 'Platform Watchlist',
    currentCourseCta     : 'Review',
    featuredTitle        : 'Popular Bootcamps',
    featuredDescription  : 'Catalogue items with strong learner engagement.',
    recommendationTitle  : 'Operational Focus',
    recommendationMessage: 'Areas worth checking before the next reporting cycle.',
    stats                : [
      { id: 'bootcamps', icon: <SchoolIcon />, label: 'Bootcamps', value: '38', tone: 'primary', subtitle: 'catalogue records' },
      { id: 'learners', icon: <PersonIcon />, label: 'Learners', value: '1.2k', tone: 'success', subtitle: 'active accounts' },
      { id: 'reviews', icon: <AchievementIcon />, label: 'Avg. Rating', value: '4.6', tone: 'warning', subtitle: 'platform wide' },
      { id: 'growth', icon: <TrendingIcon />, label: 'Growth', value: '18%', tone: 'info', subtitle: 'this month' },
    ],
    actions: [
      { id: 'manage', icon: <ManageIcon />, label: 'Manage Platform', path: PATH.AUTH.MANAGE, variant: 'contained' },
      { id: 'bootcamps', icon: <SchoolIcon />, label: 'Browse Bootcamps', path: PATH.BOOTCAMP.ROOT, variant: 'outlined' },
      { id: 'account', icon: <PersonIcon />, label: 'Account', path: PATH.AUTH.ACCOUNT.ROOT, variant: 'outlined' },
    ],
    courses: [
      { id: 'pending-review', title: 'Pending Bootcamp Reviews', meta: '5 records need attention', status: 'Review', progress: 72 },
      { id: 'catalogue-health', title: 'Catalogue Health', meta: '12 records missing rich details', status: 'Monitor', progress: 84 },
    ],
    activity: [
      { label: 'Mon', value: 72 },
      { label: 'Tue', value: 78 },
      { label: 'Wed', value: 74 },
      { label: 'Thu', value: 82 },
      { label: 'Fri', value: 88 },
      { label: 'Sat', value: 69 },
      { label: 'Sun', value: 75 },
    ],
    distribution: [
      { label: 'Student', value: 68 },
      { label: 'Trainer', value: 22 },
      { label: 'Admin', value: 10 },
    ],
    recommendations: sharedRecommendations.map((item) => ({
      ...item,
      meta: 'Review catalogue coverage and learner demand',
      path: PATH.AUTH.MANAGE,
    })),
  },
  guest: {
    audience             : 'guest',
    welcomeTitleFallback : 'Welcome',
    welcomeMessage       : 'Explore bootcamps, compare learning paths, and create an account when you are ready.',
    currentCourseTitle   : 'Start Here',
    currentCourseCta     : 'Open',
    featuredTitle        : 'Featured Bootcamps',
    featuredDescription  : 'A quick look at the programs learners are browsing now.',
    recommendationTitle  : 'Popular Learning Paths',
    recommendationMessage: 'Use these tracks to narrow your first search.',
    stats                : [
      { id: 'bootcamps', icon: <SchoolIcon />, label: 'Bootcamps Listed', value: '38+', tone: 'primary', subtitle: 'curated programs' },
      { id: 'paths', icon: <ExploreIcon />, label: 'Career Paths', value: '9', tone: 'success', subtitle: 'from web to cloud' },
      { id: 'scholarships', icon: <AchievementIcon />, label: 'Scholarship Leads', value: '12', tone: 'warning', subtitle: 'worth checking' },
      { id: 'remote', icon: <TrendingIcon />, label: 'Remote Friendly', value: '64%', tone: 'info', subtitle: 'of listed options' },
    ],
    actions: [
      { id: 'browse-bootcamps', icon: <SchoolIcon />, label: 'Browse Bootcamps', path: PATH.BOOTCAMP.ROOT, variant: 'contained' },
      { id: 'register', icon: <PersonIcon />, label: 'Create Account', path: PATH.AUTH.REGISTER, variant: 'outlined' },
      { id: 'login', icon: <LoginIcon />, label: 'Log In', path: PATH.AUTH.LOG_IN, variant: 'outlined' },
    ],
    courses: [
      { id: 'compare-programs', title: 'Compare Programs', meta: 'Costs, duration, ratings and course focus', status: 'Guide', progress: 78 },
      { id: 'choose-path', title: 'Choose a Career Path', meta: 'Match bootcamps to the skills you want', status: 'Guide', progress: 62 },
    ],
    activity: [
      { label: 'Mon', value: 42 },
      { label: 'Tue', value: 55 },
      { label: 'Wed', value: 61 },
      { label: 'Thu', value: 58 },
      { label: 'Fri', value: 67 },
      { label: 'Sat', value: 74 },
      { label: 'Sun', value: 69 },
    ],
    distribution: [
      { label: 'Web', value: 45 },
      { label: 'Data', value: 20 },
      { label: 'Cloud', value: 18 },
      { label: 'UX', value: 17 },
    ],
    recommendations: sharedRecommendations,
  },
}

export const getDashboardAudience = (user: User | null): DashboardAudience => user?.role ?? 'guest'
