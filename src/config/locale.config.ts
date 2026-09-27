import { GLOBAL } from './global.config'
import { DEFAULT_LOCALE, isSupportedLocale, locales } from '@i18n'

export const ACTIVE_LOCALE_KEY = isSupportedLocale(GLOBAL.LOCALE) ? GLOBAL.LOCALE : DEFAULT_LOCALE
export const ACTIVE_LOCALE     = locales[ACTIVE_LOCALE_KEY]
