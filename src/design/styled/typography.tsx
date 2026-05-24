import { Typography } from "@mui/material"
import { styled } from '@mui/material/styles'
import { designTokens } from "design/token"

export const FormTitle = styled(Typography)(() => ({
    fontSize: designTokens.typography.size.form,
}))

export const CardTitle = styled(Typography)(() => ({
    fontSize: designTokens.typography.size.card,
}))

export const GrowText = styled(Typography)(() => ({
    flexGrow: 1,
}))

export const IntroText = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(designTokens.spacing.md),
    maxWidth : designTokens.layout.introMaxWidth,
}))

export const SmallOffsetText = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(designTokens.spacing.sm),
}))
