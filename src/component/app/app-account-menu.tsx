import { Fragment, useState, type MouseEvent } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings'
import ShieldIcon from '@mui/icons-material/Shield'
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Stack, Tooltip, Typography } from '@mui/material'
import { useAppDispatch } from 'app/hook'
import { logout } from 'app/store/slice/auth/auth-slice'
import { PATH } from 'route/path'
import type { User } from 'types/model'

type AppAccountMenuProps = {
  user: User
}

const AppAccountMenu = ({ user }: AppAccountMenuProps) => {
  const dispatch                = useAppDispatch()
  const navigate                = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open                    = Boolean(anchorEl)
  const canManage               = user.role === 'admin' || user.role === 'trainer'
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

  return (
    <Fragment>
      <Tooltip title='Account'>
        <IconButton
          aria-controls={open ? 'account-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup='true'
          aria-label='open account menu'
          color='inherit'
          onClick={handleOpen}
        >
          <Avatar src={user.avatar} alt={displayName}>
            {displayName.charAt(0).toUpperCase()}
          </Avatar>
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
          <Typography variant='subtitle2'>{displayName}</Typography>
          <Typography variant='caption' color='text.secondary'>{user.email}</Typography>
          <Typography variant='caption' color='text.secondary'>{user.role}</Typography>
        </Stack>
        <Divider />
        <MenuItem component={RouterLink} to={PATH.AUTH.ACCOUNT}>
          <ListItemIcon>
            <AccountCircleIcon fontSize='small' />
          </ListItemIcon>
          Account
        </MenuItem>
        {canManage ? (
          <MenuItem component={RouterLink} to={PATH.AUTH.MANAGE}>
            <ListItemIcon>
              <ShieldIcon fontSize='small' />
            </ListItemIcon>
            Manage
          </MenuItem>
        ) : null}
        <MenuItem component={RouterLink} to={PATH.AUTH.SETTING}>
          <ListItemIcon>
            <SettingsIcon fontSize='small' />
          </ListItemIcon>
          Setting
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize='small' />
          </ListItemIcon>
          Log out
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default AppAccountMenu
