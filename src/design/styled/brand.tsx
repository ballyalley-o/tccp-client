import { styled } from "@mui/material/styles"

export const LogoImg = styled('img')(({ size = 36 }: { size?: number }) => ({
    height   : size,
    width    : 'auto',
    objectFit: 'contain',
}))
