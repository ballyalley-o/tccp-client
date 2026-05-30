import { Drawer, type DrawerProps } from '@mui/material'
import { styled } from '@mui/material/styles'

type SidebarDrawerProps = DrawerProps & {
  drawerWidth: number
}

export const AppDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    borderColor: theme.palette.divider,
  }
}))

export const SidebarDesktopDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'drawerWidth' })<SidebarDrawerProps>(({ theme, drawerWidth }) => ({
  display: 'none',
  '& .MuiDrawer-paper': {
    width    : drawerWidth,
    boxSizing: 'border-box',
    position : 'relative',
    height   : '100vh',
  },
  [theme.breakpoints.up('lg')]: {
    display: 'block',
  }
}))

export const SidebarMobileDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'drawerWidth' })<SidebarDrawerProps>(({ theme, drawerWidth }) => ({
  display: 'block',
  '& .MuiDrawer-paper': {
    width    : drawerWidth
  },
  [theme.breakpoints.up('lg')]: {
    display: 'none',
  }
}))