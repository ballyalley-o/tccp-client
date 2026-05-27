import { Stack, Typography } from '@mui/material'
import { GLOBAL } from 'config/global.config'
import { NAV } from 'config/nav.config'
import { FooterWrapperStack, FooterText, MonoText } from 'design/styled'
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
                <Stack component={'div'} direction={'row'} gap={0.2}>
                    <Typography variant={'body2'} color={'text.secondary'}>{transl('message.footer')}</Typography>
                    <Typography variant={'body2'} color={'text.secondary'} fontStyle={'italic'}>{transl('worldwide')}</Typography>
                </Stack>
            </Stack>

            <Stack direction={'row'} spacing={4} flexWrap={'wrap'} useFlexGap>
                {NAV.FOOTER.map((_i) => (
                    <FooterText key={_i.id} variant={'body2'} color={'text.secondary'}>{_i.label}</FooterText>
                ))}
            </Stack>
            <Stack spacing={1} alignItems={{ xs: 'flex-start', md: 'flex-end' }}>
                <MonoText variant={'caption'}>{transl('nav.footer.all_system_operational')}</MonoText>
                <MonoText variant={'caption'}>{GLOBAL.APP_VERSION}</MonoText>
            </Stack>
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent={'space-between'} spacing={1}>
                <MonoText variant={'caption'}>&copy; {currentYear} | {GLOBAL.APP_NAME}</MonoText>
            </Stack>
        </FooterWrapperStack>
    )
}

export default AppFooter