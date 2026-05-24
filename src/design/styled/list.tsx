import { ListItemIcon } from '@mui/material'
import { styled } from '@mui/material/styles'
import { designTokens } from 'design/token'

export const CompactListIcon = styled(ListItemIcon)(() => ({
    minWidth: designTokens.layout.listIconMinWidth,
}))