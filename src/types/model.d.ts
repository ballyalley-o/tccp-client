export type UserRole = 'admin' | 'trainer' | 'user'

export interface User {
  id          ?: string
  _id         ?: string
  firstname   ?: string
  lastname    ?: string
  username     : string
  email        : string
  role         : UserRole
  avatar      ?: string
  location    ?: string
  organization?: string
}

export interface Course {
  id                  ?: string
  _id                  : string
  title                : string
  slug                ?: string
  description          : string
  duration             : string
  tuition              : number
  minimumSkill         : AppSkillType
  scholarshipAvailable : boolean
  bootcamp            ?: string | Bootcamp
  user                ?: string
}

export interface BootcampLocation {
  formattedAddress?: string
  city            ?: string
  state           ?: string
  country         ?: string
}

export interface Feedback {
  _id      ?: string
  title     : string
  body     ?: string
  rating    : number
  bootcamp ?: string | Pick<Bootcamp, '_id' | 'name' | 'slug' | 'description'>
  user     ?: Pick<User, 'firstname' | 'email' | 'role' | 'avatar' | '_id'>
  createdAt?: string
  updatedAt?: string
}

export interface Bootcamp {
  id           ?: string
  _id           : string
  name          : string
  slug          : string
  description   : string
  website      ?: string
  phone        ?: string
  email        ?: string
  address      ?: string
  location     ?: BootcampLocation
  duration      : string
  careers       : string[]
  averageCost   : number
  photo        ?: string
  badge        ?: string
  housing       : boolean
  jobAssistance : boolean
  jobGuarantee  : boolean
  acceptGi      : boolean
  rating        : number
  user         ?: string | Pick<User, 'firstname' | 'email' | 'role'>
  course       ?: Course[]
  feedback     ?: Feedback[]
  totalFeedback?: number
}

export interface ApiCollection<T> {
  success    : boolean
  message   ?: string
  count     ?: number
  pagination?: {
    next?: { page: number; limit: number }
    prev?: { page: number; limit: number }
  }
  data: T[]
}

export interface ApiSingle<T> {
  success : boolean
  message?: string
  token  ?: string
  user   ?: User
  data   ?: T
}

export interface ApiError {
  message: string
  status : number
}

export interface BootcampDraft {
  name          : string
  description   : string
  website      ?: string
  phone        ?: string
  email        ?: string
  address       : string
  duration      : string
  careers       : string[]
  housing       : boolean
  jobAssistance : boolean
  jobGuarantee  : boolean
  acceptGi      : boolean
}

export interface CourseDraft {
  title               : string
  description         : string
  duration            : string
  tuition             : number
  minimumSkill        : Course['minimumSkill']
  scholarshipAvailable: boolean
}

export interface FeedbackDraft {
  title   : string
  body    : string
  rating  : number
  bootcamp: string
  user    : string
}
