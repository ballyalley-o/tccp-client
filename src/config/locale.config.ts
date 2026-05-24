import { GLOBAL } from './global.config'
import { en, fr, es } from 'lib/locale'

export const locales = { en, fr, es } as const
type   AppLocaleType = keyof typeof locales

const  activeLocale: AppLocaleType = (GLOBAL.LOCALE as AppLocaleType) || 'en'
export const ACTIVE_LOCALE         = locales[activeLocale]
