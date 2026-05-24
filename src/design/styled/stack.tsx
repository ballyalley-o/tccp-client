import { Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import { designTokens } from 'design/token'

export const EmptyState = styled(Stack)(({ theme }) => ({
    alignItems  : 'center',
    paddingBlock: theme.spacing(designTokens.spacing.xxl),
}))

export const MetaStack = styled(Stack)(({ theme }) => ({
    marginTop: theme.spacing(designTokens.spacing.md),
}))

export const TagStack = styled(Stack)(({ theme }) => ({
    marginTop: theme.spacing(designTokens.spacing.xl),
}))