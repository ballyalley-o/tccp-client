import { Box, type BoxProps }              from '@mui/material'
import { alpha, styled }    from '@mui/material/styles'
import { designTokens }     from 'design/token'
import type { ElementType } from 'react'

type BoxDrawerProps = BoxProps & {
  drawerWidth : number
  component  ?: ElementType
}

export const AppRootBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    minHeight      : designTokens.layout.appMinHeight,
    display        : 'flex',
    flexDirection  : 'column'
}))

export const AuthPanel = styled(Box, { shouldForwardProp: (prop) => prop !== 'wide' })<{ wide?: boolean }>(({ wide }) => ({
    marginInline: 'auto',
    minWidth    : wide ? designTokens.layout.formWideMaxWidth: designTokens.layout.formMaxWidth,
}))

export const IconTile = styled(Box)(({ theme }) => ({
    alignItems     : 'center',
    backgroundColor: theme.palette.primary.main,
    borderRadius   : theme.shape.borderRadius,
    color          : theme.palette.primary.contrastText,
    display        : 'grid',
    flexShrink     : 0,
    height         : designTokens.layout.iconTileSize,
    placeItems     : 'center',
    width          : designTokens.layout.iconTileSize,
}))

export const TruncateBox = styled(Box)(() => ({
     minWidth: 0,
}))


export const StatusCenter = styled(Box)(() => ({
    display   : 'grid',
    minHeight : designTokens.layout.dataStateMinHeight,
    placeItems: 'center',
}))

export const AlertBlock = styled(Box)(() => ({
    width: '100%',
}))

export const SectionOffset = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(designTokens.spacing.xl),
}))

export const FooterBox = styled(Box)(({ theme }) => ({
    width          : 10,
    height         : 10,
    backgroundColor: theme.palette.success.main,
    boxShadow      : `0 0 12px ${theme.palette.success.main}`
}))

export const AuthBgBox = styled(Box)({
    minHeight      : designTokens.layout.appMinHeight,
    position       : 'relative',
    overflow       : 'hidden',
    backgroundColor: designTokens.color.neutral.ink,
    backgroundImage: designTokens.color.gradient.auth_background,
    color          : designTokens.color.dark_mode.white,
})

export const AuthBgLogoBox = styled(Box)(({ theme }) => ({
  position                    : 'absolute',
  top                         : 24,
  left                        : 24,
  zIndex                      : 2,
  [theme.breakpoints.up('md')]: {
    top : 32,
    left: 40
  },
  '& img' : {
    height: 44,
    filter: 'brightness(0) invert(1)',
  },
}))

export const AuthMainBox = styled(Box)<{ component?: ElementType }>(({ theme }) => ({
  alignItems       : 'center',
  display          : 'flex',
  justifyContent   : 'center',
  minHeight        : designTokens.layout.appMinHeight,
  paddingRight     : 2,
  paddingLeft      : 2,
  paddingTop       : 12,
  paddingBottom    : 12,
  '& .MuiCard-root': {
    backgroundColor: 'rgba(24, 31, 41, 0.94)',
    border         : '1px solid rgba(148, 163, 184, 0.28)',
    boxShadow      : '0 24px 72px rgba(0, 0, 0, 0.36)',
    color          : designTokens.color.dark_mode.white,
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(244, 247, 251, 0.78)',
  },
  '& .MuiOutlinedInput-root': {
    color          : '#F4F7FB',
    backgroundColor: 'rgba(9, 13, 20, 0.28)',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(203, 213, 225, 0.36)',
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: alpha(designTokens.color.brand.primary, 0.72),
  },
  '& .MuiInputBase-input::placeholder': {
    color  : 'rgba(244, 247, 251, 0.58)',
    opacity: 1,
  },
  '& .MuiDivider-root': {
    borderColor: 'rgba(203, 213, 225, 0.34)',
  },
  [theme.breakpoints.up('sm')]: {
    paddingRight: 3,
    paddingLeft : 3,
  },
  [theme.breakpoints.up('md')]: {
    paddingTop   : 12,
    paddingBottom: 12,
  },
}))

export const LogoBox = styled(Box)({
  '& img' : {
    filter: 'brightness(0) invert(0)',
  }
})

export const ContentWrapperBox = styled(Box)<{ component?: ElementType }>(({ theme }) => ({
  flexGrow                    : 1,
  minWidth                    : 0,
  padding                     : 2,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(3),
  }
}))


export const SidebarWrapperBox = styled(Box, { shouldForwardProp: (prop) => prop !== 'drawerWidth' })<BoxDrawerProps>(({ theme, drawerWidth }) => ({
  [theme.breakpoints.up('lg')]: {
    width     : drawerWidth,
    flexShrink: 0
  },
}))

export const DashboardWrapperBox = styled(Box)({
  minHeight    : '100vh',
  display      : 'flex',
  flexDirection: 'column'
})

export const FlexGrowBox = styled(Box)({
  display : 'flex',
  flexGrow: 1
})