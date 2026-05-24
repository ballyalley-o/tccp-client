import { createBrowserRouter } from "react-router-dom"
import App from 'app'
import { FallbackErrorPage } from "page/fallback"

import { PATH } from "./path"
import { dashboardRoute, bootcampRoute, authRoute } from './module'

const router = createBrowserRouter([
    {
        path        : PATH.ROOT,
        element     : <App />,
        errorElement: <FallbackErrorPage />,
        children    : [
           ...dashboardRoute,
           ...bootcampRoute,
           ...authRoute
        ]
    }
])

export default router
