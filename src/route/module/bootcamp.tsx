import type { RouteObject } from "react-router-dom"
import { BootcampListPage, BootcampDetailPage } from 'route/element'
import { PATH } from "route/path"

const bootcampRoute: RouteObject[] = [
    {
        path    : PATH.BOOTCAMP.ROOT,
        children: [
            {
                path: PATH.BOOTCAMP.ROOT,
                element: <BootcampListPage />
            },
            {
                path: PATH.BOOTCAMP.DETAIL,
                element: <BootcampDetailPage/>
            }

        ]
    }
]


export default bootcampRoute