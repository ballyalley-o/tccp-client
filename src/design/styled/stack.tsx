import type { ElementType } from 'react'
import { Stack } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
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

export const StickyStack = styled(Stack)(({ theme }) => ({
    position       : 'sticky',
    top            : 0,
    zIndex         : theme.zIndex.appBar - 1,
    marginTop      : -80,
    paddingTop     : 80,
    backdropFilter : 'blur(10px)',
    backgroundColor: alpha(theme.palette.background.default, 0.75)
}))

export const FooterWrapperStack = styled(Stack)<{ component?: ElementType }>(({ theme }) => ({
    paddingTop                  : 10,
    paddingRight                : 10,
    paddingLeft                 : 50,
    paddingBottom               : 10,
    borderTop                   : `1px solid ${theme.palette.divider}`,
    backgroundColor             : 'background.paper',
    backdropFilter              : 'blur(12px)',
    [theme.breakpoints.up('md')]: {
        paddingRight: 50,
        paddingLeft : 50,
    }
}))

export const RatingContainerStack = styled(Stack)(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        minWdith: '100%'
    },
    [theme.breakpoints.up('md')]: {
        minWidth: 100
    }
}))