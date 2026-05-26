import { urlBuilder, type LocaleKey } from "lib/tool"

type NavItemType = {
    id   : string
    label: LocaleKey
    value: string
    href : string
}

type NavType = {
    USER  : NavItemType[],
    FOOTER: NavItemType[]
}

export const NAV: NavType = {
    USER  : [
        {
            id   : 'account',
            label: 'nav.user.account',
            value: 'account',
            href: urlBuilder('account')
        },
        {
            id   : 'manage',
            label: 'nav.user.manage',
            value: 'manage',
            href: urlBuilder('manage')
        },
        {
            id   : 'setting',
            label: 'nav.user.setting',
            value: 'setting',
            href: urlBuilder('setting')
        },
        {
            id   : 'log-out',
            label: 'nav.user.log_out',
            value: 'log-out',
            href: urlBuilder('log-out')
        }
    ],
    FOOTER: [
        {
            id   : 'docs-1',
            label: 'nav.footer.docs',
            value: 'docs',
            href : urlBuilder('docs')
        },
        {
            id   : 'api-2',
            label: 'nav.footer.api',
            value: 'api',
            href:  urlBuilder('api')
        },
        {
            id   : 'career-3',
            label: 'nav.footer.careers',
            value: 'career',
            href : urlBuilder('career')
        },
        {
            id   : 'privacy-4',
            label: 'nav.footer.privacy',
            value: 'privacy',
            href:  urlBuilder('career')
        },
    ]
}