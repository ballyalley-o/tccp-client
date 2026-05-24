import { Divider } from '@mui/material'
import { styled } from '@mui/material/styles'
import { designTokens } from 'design/token'


export const SpacedDivider = styled(Divider)(({ theme }) => ({
    marginBlock: theme.spacing(designTokens.spacing.xl),
}))
