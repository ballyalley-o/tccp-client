import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { designTokens } from 'design/token'

export const AppRootBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    minHeight      : designTokens.layout.appMinHeight,
    display        : 'flex',
    flexDirection  : 'column'
}))

export const AuthPanel = styled(Box, { shouldForwardProp: (prop) => prop !== 'wide' })<{ wide?: boolean }>(({ wide }) => ({
    marginInline: 'auto',
    maxWidth    : wide ? designTokens.layout.formWideMaxWidth: designTokens.layout.formMaxWidth,
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