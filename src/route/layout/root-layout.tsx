import { Outlet } from 'react-router-dom'
import { useAppSelector } from 'app/hook'
import { AppFooter, AppRootAppbar } from 'component/app'
import { AppContent, AppRootBox } from 'design/styled'

const RootLayout = () => {
  const { user } = useAppSelector((state) => state.auth)

  return (
    <AppRootBox>
      <AppRootAppbar user={user} />
      <AppContent maxWidth={false}>
        <Outlet />
      </AppContent>
      <AppFooter />
    </AppRootBox>
  )
}

export default RootLayout
