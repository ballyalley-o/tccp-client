import { Button } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'
import type { ElementType } from 'react'

export const SecondaryButton = styled(Button)<{ component?: ElementType, to: string }>({
    '&:hover': {
        backgroundColor: alpha('#1E242F',.5)
    }
})
