import { PATH }                       from "route/path"
import type { SvgIconComponent }      from '@mui/icons-material'
import type { UserRole }              from 'types'
import BootcampIcon                   from '@mui/icons-material/SchoolSharp'
import DashboardIcon                  from '@mui/icons-material/Dashboard'
import AdminPanelIcon                 from '@mui/icons-material/AdminPanelSettingsSharp'
import UsersIcon                      from '@mui/icons-material/PeopleSharp'
import { urlBuilder, type LocaleKey } from 'lib/tool'

type NavItemType = {
    id       : string
    label    : LocaleKey
    href     : string
    value   ?: string
    icon    ?: SvgIconComponent
    role    ?: UserRole[]
    children?: NavItemType[]
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