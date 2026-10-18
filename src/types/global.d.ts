import type { LocaleKey } from 'lib/tool'

declare global {
  declare module '*.css'
  declare type AppValueScaleType = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

  declare type AppSkillType = 'beginner' | 'intermediate' | 'advanced'
  declare type AppTraitType = 'housing' | 'jobAssistance' | 'jobGuarantee' | 'acceptGi'

  declare type NavLabelType = {
    id       : string
    labelKey : LocaleKey
    to       : string
    icon    ?: React.ReactNode
  }

  declare type AppStateStatusType  = 'idle' | 'loading' | 'succeeded' | 'failed'
  declare type AppThemeType        = 'primary' | 'success' | 'warning' | 'info'
  declare type AppCtaVariantType   = 'contained' | 'outlined'
  declare type AppEnrollmentType   = 'enrolled' | 'in_progress'| 'completed' | 'dropped'
}
