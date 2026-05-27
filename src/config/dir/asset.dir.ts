import { pathBuilder } from "lib/tool"

const _ASSET = 'asset'

export const ASSET_DIR = {
    LOGO_PNG      : pathBuilder(_ASSET, 'logo.png'),
    LOGO_DESAT_PNG: pathBuilder(_ASSET, 'logo-desat.png'),
}