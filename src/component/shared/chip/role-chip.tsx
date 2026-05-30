import type { UserRole } from 'types'
import { Chip } from '@mui/material'
import { designTokens } from 'design/token'
import { formatText } from 'lib/tool'

export const RoleChip = ({ userRole }: { userRole: UserRole | undefined }) => {
    const roleColor = userRole ? designTokens.color.role[userRole] : designTokens.color.neutral.surface
    return <Chip label={formatText(userRole ? userRole : 'guest', 'uppercase')} size={'small'} variant={'filled'} sx={{ backgroundColor: roleColor }} />
}