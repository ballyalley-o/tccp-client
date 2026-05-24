import { Card, CardContent } from '@mui/material'
import { styled } from '@mui/material/styles'
import { designTokens } from 'design/token'

export const FillCard = styled(Card)(() => ({
    display      : 'flex',
    flexDirection: 'column',
    height       : '100%',
}))

export const FillCardContent = styled(CardContent)(({ theme }) => ({
    display      : 'flex',
    flexDirection: 'column',
    flexGrow     : 1,
    gap          : theme.spacing(designTokens.spacing.xl),
}))

export const OffsetCard = styled(Card)(({ theme }) => ({
    marginTop: theme.spacing(designTokens.spacing.xl),
}))
