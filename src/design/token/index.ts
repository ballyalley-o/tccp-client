export * from './color'
export * from './layout'
export * from './radius'
export * from './spacing'
export * from './typography'

import { color } from './color'
import { layout } from './layout'
import { radius } from './radius'
import { spacing } from './spacing'
import { typography } from './typography'

export const designTokens = {
  color,
  layout,
  radius,
  spacing,
  typography,
} as const
