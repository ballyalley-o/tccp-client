import { Stack, Typography } from '@mui/material'
import { GLOBAL } from 'config/global.config'
import { FooterWrapperStack, FooterBox, FooterText } from 'design/styled'

const AppFooter = () => {
  return (
    <FooterWrapperStack component={'footer'} spacing={3}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'} spacing={4}>
            <Stack spacing={1}>
                <FooterBox />
                    <Typography variant={'subtitle1'} fontWeight={700}>
                        {GLOBAL.APP_NAME}
                    </Typography>
            </Stack>
            <FooterText variant={'body2'} color={'text.secondary'}></FooterText>
        </Stack>
    </FooterWrapperStack>
  )
}

export default AppFooter