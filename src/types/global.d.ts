import { en, fr, es } from 'lib/locale'
import { LocaleKey } from 'utility'

declare global {
  declare module '*.css'
  declare type AppLocale = typeof en | typeof es | typeof fr

  declare type AppValueScaleType = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

  declare type AppSkillType = 'beginner' | 'intermediate' | 'advanced'

  declare type NavLabelType = {
    id       : string
    labelKey : LocaleKey
    to       : string
    icon    ?: React.ReactNode
  }

  declare type AppStateStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
  declare type TeamConferenceType  = 'all' | 'west' | 'east'
  declare type TeamDivisionType    = 'pacific' | 'southwest' | 'northwest' | 'central' | 'southeast' | 'atlantic'
}
