import { Container } from '@mui/material'
import { styled } from '@mui/material/styles'
import { designTokens } from 'design/token'

export const AppContent = styled(Container)(({ theme }) => ({
    flex        : 1,
    maxWidth    : designTokens.layout.maxWidth,
    paddingBlock: theme.spacing(designTokens.spacing.page),
}))

export const PageCentered = styled(Container)(({ theme }) => ({
    alignItems: 'center',
    display   : 'flex',
    minHeight : designTokens.layout.centeredMinHeight,
    maxWidth  : theme.breakpoints.values.sm,
}))