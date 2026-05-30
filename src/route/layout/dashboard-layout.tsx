import { useState } from 'react'
import { Outlet, Link as RouterLink } from 'react-router-dom'
import { NAV } from 'config/nav.config'
import { useAppSelector } from 'app/hook'
import { List, ListItemButton, ListItemText, Stack, Toolbar, Typography } from '@mui/material'
import { AppLogo, AppAccountMenu } from 'component/app'
import { ContentWrapperBox, DashboardWrapperBox, FlexGrowBox, SidebarDesktopDrawer, SidebarMobileDrawer, SidebarWrapperBox, StandardAppbar } from 'design/styled'
import { transl } from 'lib/tool'

const DRAWER_WIDTH = 260

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user }                    = useAppSelector((state) => state.auth)
  const handleDrawerToggle          = () => {
    setMobileOpen((prev) => !prev)
  }

  const SIDEBAR = NAV.SIDEBAR.filter((_item) => {
    if (!_item.role) return true
    if (!user) return
    return _item.role.includes(user.role)
})

  const drawer = (
    <List>
      {SIDEBAR.map((_i) => {
        const Icon = _i.icon
      return (
        <ListItemButton component={RouterLink} to={_i.href}>
          {Icon && <Icon />}
          <ListItemText primary={<Typography variant={'body2'}>{transl(_i.label)}</Typography>} sx={{ ml: 1 }} />
        </ListItemButton>
      )})}
    </List>
  )

 return (
   <DashboardWrapperBox>
     <StandardAppbar position={'sticky'} elevation={0}>
       <Toolbar>
         <AppLogo />
         <Stack direction={'row'} spacing={2} alignItems={'center'}>
           {user && <AppAccountMenu user={user} />}
         </Stack>
       </Toolbar>
     </StandardAppbar>

     <FlexGrowBox>
      {/* TODO: make this draggable */}
       <SidebarWrapperBox component={'nav'} drawerWidth={DRAWER_WIDTH}>
         <SidebarMobileDrawer variant={'temporary'} open={mobileOpen} onClose={handleDrawerToggle} drawerWidth={DRAWER_WIDTH} ModalProps={{ keepMounted: true }}>
           {drawer}
         </SidebarMobileDrawer>

         <SidebarDesktopDrawer variant={'permanent'} open drawerWidth={DRAWER_WIDTH}>
           {drawer}
         </SidebarDesktopDrawer>
       </SidebarWrapperBox>

       <ContentWrapperBox component={'main'}>
         <Outlet />
       </ContentWrapperBox>
     </FlexGrowBox>
   </DashboardWrapperBox>
 )
}

export default DashboardLayout
