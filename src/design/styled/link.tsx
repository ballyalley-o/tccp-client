import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'

export const BrandLink = styled(Link)(({ theme }) => ({
    alignItems    : 'center',
    color         : theme.palette.text.primary,
    display       : 'flex',
    gap           : 2,
    flexGrow      : 1,
    minWidth      : 0,
    textDecoration: 'none',
}))
