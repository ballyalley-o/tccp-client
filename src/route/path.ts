import { pathBuilder } from "lib/tool";

const _DASHBOARD = 'dashboard'
const _AUTH      = 'auth'
const _BOOTCAMP  = 'bootcamp'
const _COURSE    = 'course'

const _BOOTCAMP_SLUG = ':bootcampSlug'

export const PATH = {
  ROOT: '/',
  DASHBOARD: pathBuilder(_DASHBOARD),
  AUTH: {
    ROOT    : pathBuilder(_AUTH),
    LOG_IN  : pathBuilder(_AUTH, 'log-in'),
    REGISTER: pathBuilder(_AUTH, 'register'),
    ACCOUNT : pathBuilder(_AUTH, 'account'),
    SETTING : pathBuilder(_AUTH, 'setting'),
    MANAGE  : pathBuilder(_AUTH, 'manage')
  },
  BOOTCAMP: {
    ROOT  : pathBuilder(_BOOTCAMP),
    DETAIL: pathBuilder(_BOOTCAMP, _BOOTCAMP_SLUG),
  },
  COURSE: {
    ROOT: pathBuilder(_COURSE),
  },
}
