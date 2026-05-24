import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import { designTokens } from 'design/token'

export const FixedSelectField = styled(TextField)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        minWidth: designTokens.layout.selectMinWidth,
    },
}))