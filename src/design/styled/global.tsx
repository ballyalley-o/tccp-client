import { AppBar, styled } from '@mui/material'
import { designTokens } from 'design/token'

export const StandardAppbar = styled(AppBar)(() => ({
  background: designTokens.color.contrast.black
}))