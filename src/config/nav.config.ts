import { PATH }                                                  from "route/path"
import type { UserRole }                                         from 'types'
import { urlBuilder, type LocaleKey }                            from 'lib/tool'

import { ShieldMoonSharp, SettingsAccessibilitySharp, LogoutSharp, type SvgIconComponent } from '@mui/icons-material'
import AccountIcon                                                                         from '@mui/icons-material/AccountCircleSharp'
import BootcampIcon                                                                        from '@mui/icons-material/SchoolSharp'
import DashboardIcon                                                                       from '@mui/icons-material/Dashboard'
import AdminPanelIcon                                                                      from '@mui/icons-material/AdminPanelSettingsSharp'
import UsersIcon                                                                           from '@mui/icons-material/PeopleSharp'

type NavItemType = {
    id       : string
    label    : LocaleKey
    href     : string
    value   ?: string
    icon    ?: SvgIconComponent
    role    ?: UserRole[]
    children?: NavItemType[]
    onClick ?: () => void
}

type NavType = {
    USER   : NavItemType[],
    FOOTER : NavItemType[],
    SIDEBAR: NavItemType[]
}


export const NAV: NavType = {
    SIDEBAR: [
        {
            id   : 'dashboard',
            label: 'nav.dashboard',
            value: 'dashboard',
            href : PATH.DASHBOARD,
            icon : DashboardIcon,
            role: ['student', 'trainer', 'admin']
        },
        {
            id   : 'bootcamp',
            label: 'bootcamps',
            value: 'bootcamp',
            href : PATH.BOOTCAMP.ROOT,
            icon : BootcampIcon,
            role: ['student', 'trainer', 'admin']
        },
        {
            id   : 'admin',
            label: 'admin',
            value: 'admin',
            href : PATH.ADMIN.ROOT,
            icon : AdminPanelIcon,
            role: ['admin'],
            children: [
                {
                    id   : 'user',
                    label: 'users',
                    value: 'user',
                    href : PATH.ADMIN.USER,
                    icon : UsersIcon,
                    role : ['admin']
                },
                {
                    id   : 'bootcamp',
                    label: 'nav.bootcamps',
                    href : PATH.ADMIN.BOOTCAMP,
                    icon : BootcampIcon,
                    role : ['admin']
                }
            ]
        }
    ],
    USER  : [
        {
            id   : 'account',
            label: 'nav.user.account',
            value: 'account',
            href : PATH.AUTH.ACCOUNT.ROOT,
            icon : AccountIcon,
            role : ['student', 'trainer', 'admin']
        },
        {
            id   : 'manage',
            label: 'nav.user.manage',
            value: 'manage',
            href : PATH.AUTH.MANAGE,
            icon : ShieldMoonSharp,
            role : ['trainer', 'admin']
        },
        {
            id   : 'setting',
            label: 'nav.user.setting',
            icon : SettingsAccessibilitySharp,
            value: 'setting',
            href : PATH.AUTH.SETTING,
            role : ['student', 'trainer', 'admin']
        },
        {
            id   : 'log-out',
            label: 'nav.user.log_out',
            value: 'log-out',
            icon : LogoutSharp,
            href : PATH.AUTH.LOG_OUT,
            role : ['student', 'trainer', 'admin']
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