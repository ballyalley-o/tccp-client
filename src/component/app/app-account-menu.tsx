import { Fragment, useState, type MouseEvent } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import type { User } from 'types/model'
import { logout } from 'app/store/slice/auth/auth-slice'
import { useAppDispatch } from 'app/hook'
import { PATH } from 'route/path'
import { Divider, IconButton, ListItemIcon, Menu, MenuItem, Stack, Tooltip, Typography } from '@mui/material'
import { AppUserAvatar } from 'component/app'
import { transl } from 'lib/tool'
import { NAV } from 'config/nav.config'

type AppAccountMenuProps = {
  user: User
}

const AppAccountMenu = ({ user }: AppAccountMenuProps) => {
  const dispatch                = useAppDispatch()
  const navigate                = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open                    = Boolean(anchorEl)
  const displayName             = [user.firstname, user.lastname].filter(Boolean).join(' ') || user.username || user.email

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    handleClose()
    await dispatch(logout())
    navigate(PATH.ROOT)
  }

  const NAV_FILTERED = NAV.USER.map((item) => {
    if (item.id === 'log-out') {
      return { ...item, onClick: handleLogout }
    }
    return item
  })

  return (
    <Fragment>
      <Tooltip title={transl('account')}>
        <IconButton
          aria-controls={open ? 'account-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup='true'
          aria-label={'open account menu'}
          color={'inherit'}
          onClick={handleOpen}
        >
          <AppUserAvatar user={user} />
        </IconButton>
      </Tooltip>
      <Menu
        id={'account-menu'}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Stack spacing={0.25} sx={{ px: 2, py: 1.25, minWidth: 240 }}>
          <Typography variant={'subtitle2'}>{displayName}</Typography>
          <Typography variant={'caption'} color={'text.secondary'}>{user.email}</Typography>
          <Typography variant={'caption'} color={'text.secondary'}>{user.role}</Typography>
        </Stack>
        <Divider />
        {NAV_FILTERED.map((_i) => {
          const Icon     = _i.icon
          const isLogout = _i.id === 'log-out'
          return (
            <MenuItem component={!isLogout ? RouterLink : 'li'} to={_i.href} onClick={_i.onClick}>
              <ListItemIcon>{Icon && <Icon fontSize={'small'} />}</ListItemIcon>
              {transl(_i.label)}
            </MenuItem>
          )})}
      </Menu>
    </Fragment>
  )
}

export default AppAccountMenu
