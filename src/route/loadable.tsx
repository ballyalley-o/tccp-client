import { Suspense, type ComponentType } from "react"
import { Loader } from "component/shared"

export const Loadable = <P extends object>(Component: ComponentType<P>) => (props: P) => (
    <Suspense fallback={<Loader/>}>
        <Component {...props} />
    </Suspense>
)
