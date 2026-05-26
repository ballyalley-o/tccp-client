import { urlBuilder } from "lib/tool"

export const NAV = {
    FOOTER: [
        {
            id   : 'docs-1',
            label: 'Docs',
            value: 'docs',
            path : urlBuilder('docs')
        },
        {
            id   : 'api-2',
            label: 'API',
            value: 'api',
            path:  urlBuilder('api')
        },
        {
            id   : 'career-3',
            label: 'Careers',
            value: 'career',
            path : urlBuilder('career')
        },
        {
            id   : 'privacy-4',
            label: 'Privacy',
            value: 'privacy',
            path:  urlBuilder('career')
        },
    ]
}