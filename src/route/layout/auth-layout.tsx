import { Outlet } from 'react-router-dom'
import { AppLogo } from 'component/app'
import { AuthBgBox, AuthBgLogoBox, AuthMainBox } from 'design/styled'

const AuthLayout = () => {
  return (
    <AuthBgBox>
      <AuthBgLogoBox>
        <AppLogo />
      </AuthBgLogoBox>
      <AuthMainBox component={'main'}>
        <Outlet />
      </AuthMainBox>
    </AuthBgBox>
  )
}

export default AuthLayout
