import { Stack, Typography } from '@mui/material'
import { GLOBAL } from 'config/global.config'
import { NAV } from 'config/nav.config'
import { FooterWrapperStack, FooterText, FooterMonoText } from 'design/styled'
import { transl } from 'lib/tool'

const AppFooter = () => {
    const currentYear = new Date().getFullYear()
    return (
        <FooterWrapperStack component={'footer'} spacing={1}>
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'} spacing={4}>
                <Stack spacing={1}>
                    <Typography variant={'subtitle1'} fontWeight={700}>
                        {GLOBAL.APP_NAME}
                    </Typography>
                </Stack>
                <Typography variant={'body2'} color={'text.secondary'}>{transl('message.footer')}</Typography>
            </Stack>

            <Stack direction={'row'} spacing={4} flexWrap={'wrap'} useFlexGap>
                {NAV.FOOTER.map((_i) => (
                    <FooterText key={_i.id} variant={'body2'} color={'text.secondary'}>{_i.label}</FooterText>
                ))}
            </Stack>
            <Stack spacing={1} alignItems={{ xs: 'flex-start', md: 'flex-end' }}>
                <FooterMonoText variant={'caption'}>{transl('nav.footer.all_system_operational')}</FooterMonoText>
                <FooterMonoText variant={'caption'}>{GLOBAL.APP_VERSION}</FooterMonoText>
            </Stack>
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'} spacing={1}>
                <FooterMonoText variant={'caption'}>&copy; {currentYear} | {GLOBAL.APP_NAME}</FooterMonoText>
            </Stack>
        </FooterWrapperStack>
    )
}

export default AppFooter