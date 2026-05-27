import { Container } from '@mui/material'
import { styled } from '@mui/material/styles'
import { designTokens } from 'design/token'

export const AppContent = styled(Container)(({ theme }) => ({
    flex        : 1,
    maxWidth    : designTokens.layout.maxWidth,
    paddingBlock: theme.spacing(designTokens.spacing.page),
}))

export const PageCentered = styled(Container)({
    alignItems    : 'center',
    display       : 'flex',
    justifyContent: 'center',
    minHeight     : designTokens.layout.appMinHeight,
})

export const FallbackBgContainer = styled(Container)(({ theme }) => ({
    alignItems    : 'center',
    display       : 'flex',
    justifyContent: 'center',
    minHeight     : designTokens.layout.appMinHeight,
    paddingInline : theme.spacing(2)
}))