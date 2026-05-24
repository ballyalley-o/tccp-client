import { GLOBAL } from "config/global.config"
import { ASSET_DIR } from "config/dir"
import { PATH } from "route/path"
import { LogoImg, BrandLink } from "design/styled"

const AppLogo = () => {
  return (
    <BrandLink to={PATH.ROOT}>
        <LogoImg src={ASSET_DIR.LOGO_PNG} alt={GLOBAL.APP_NAME} />
    </BrandLink>
  )
}

export default AppLogo