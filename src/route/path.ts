import { pathBuilder } from 'lib/tool'

/**
 * @module
 */
const _DASHBOARD = 'dashboard'
const _AUTH      = 'auth'
const _BOOTCAMP  = 'bootcamp'
const _COURSE    = 'course'
const _USER      = 'user'

/**
 * @submodule
 */
const _ACCOUNT = 'account'

const _ADMIN = 'admin'

const _BOOTCAMP_SLUG = ':bootcampSlug'

export const PATH = {
  ROOT: '/',
  DASHBOARD: pathBuilder(_DASHBOARD),
  ADMIN: {
    ROOT    : pathBuilder(_ADMIN),
    USER    : pathBuilder(_ADMIN, 'user'),
    BOOTCAMP: pathBuilder(_ADMIN, 'bootcamp')
  },
  AUTH: {
    ROOT    : pathBuilder(_AUTH),
    ACCOUNT : pathBuilder(_AUTH, 'account'),
    LOG_IN  : pathBuilder(_AUTH, 'log-in'),
    LOG_OUT : pathBuilder(_AUTH, 'log-out'),
    MANAGE  : pathBuilder(_AUTH, 'manage'),
    REGISTER: pathBuilder(_AUTH, 'register'),
    SETTING : pathBuilder(_AUTH, 'setting'),
  },
  BOOTCAMP: {
    ROOT  : pathBuilder(_BOOTCAMP),
    DETAIL: pathBuilder(_BOOTCAMP, _BOOTCAMP_SLUG),
  },
  COURSE: {
    ROOT: pathBuilder(_COURSE),
  },
}
