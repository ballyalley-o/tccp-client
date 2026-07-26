import type { ElementType } from 'react'
import { Button } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

export const SecondaryButton = styled(Button)<{ component?: ElementType, to: string }>({
    '&:hover': {
        backgroundColor: alpha('#1E242F',.5)
    }
})

export const Flex100Button = styled(Button)<{ component?: ElementType }>({
    display: 'flex',
    width  : '100px'
})
