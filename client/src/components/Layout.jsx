import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import HistoryIcon from '@mui/icons-material/History';
import { useAuth } from '../contexts/AuthContext.jsx';
import AppLogo from './AppLogo.jsx';

const DRAWER_WIDTH = 240;

const NAV_ITEMS = [
  { key: 'dashboard',  label: 'Dashboard',          icon: <DashboardIcon />,   path: '/dashboard' },
  { key: 'recommend',  label: 'New Recommendation', icon: <AutoAwesomeIcon />, path: '/recommend' },
  { key: 'history',    label: 'History',             icon: <HistoryIcon />,     path: '/history' },
];

/**
 * Derive which nav key should be "active" from the current pathname.
 *   /dashboard              → 'dashboard'
 *   /recommend              → 'recommend'
 *   /recommendations/:id    → 'recommend'  (result is sub-flow of creating)
 *   /history                → 'history'
 */
const getActiveKey = (pathname) => {
  if (pathname === '/dashboard') return 'dashboard';
  if (pathname === '/recommend') return 'recommend';
  if (pathname.startsWith('/recommendations/')) return 'recommend';
  if (pathname === '/history') return 'history';
  return null;
};

const DrawerContent = ({ activeKey, onNavigate }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    <Toolbar sx={{ px: 2 }}>
      <AppLogo size="small" />
    </Toolbar>
    <Divider />
    <List sx={{ flex: 1, pt: 1 }}>
      {NAV_ITEMS.map(({ key, label, icon, path }) => {
        const active = key === activeKey;
        return (
          <ListItem key={key} disablePadding sx={{ px: 1, mb: 0.5 }}>
            <ListItemButton
              selected={active}
              onClick={() => onNavigate(path)}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': {
                  bgcolor: 'primary.50',
                  color: 'primary.main',
                  '& .MuiListItemIcon-root': { color: 'primary.main' },
                },
                '&.Mui-selected:hover': { bgcolor: 'primary.100' },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{icon}</ListItemIcon>
              <ListItemText
                primary={label}
                primaryTypographyProps={{ fontSize: 14, fontWeight: active ? 600 : 400 }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  </Box>
);

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeKey = getActiveKey(location.pathname);

  const handleNavigate = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255,255,255,0.85)',
          borderBottom: '1px solid',
          borderColor: 'divider',
          color: 'text.primary',
        }}
      >
        <Toolbar>
          {/* Hamburger — mobile only */}
          <IconButton
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ mr: 1, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo — visible on mobile (drawer is hidden) */}
          <Box sx={{ display: { md: 'none' }, flexGrow: 1 }}>
            <AppLogo size="small" />
          </Box>

          {/* Spacer on desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }} />

          {/* User area */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' }, color: 'text.secondary' }}>
              {user?.name}
            </Typography>
            <Avatar
              sx={{ width: 34, height: 34, bgcolor: 'primary.main', fontSize: 14, fontWeight: 700 }}
            >
              {user?.name?.charAt(0)?.toUpperCase() ?? '?'}
            </Avatar>
            <Tooltip title="Log out">
              <IconButton onClick={handleLogout} size="small" sx={{ color: 'text.secondary' }}>
                <LogoutIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
        }}
      >
        <DrawerContent activeKey={activeKey} onNavigate={handleNavigate} />
      </Drawer>

      {/* Desktop Permanent Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
        open
      >
        <DrawerContent activeKey={activeKey} onNavigate={handleNavigate} />
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: 8,
          ml: { md: 0 },
          minHeight: 'calc(100vh - 64px)',
          bgcolor: 'background.default',
        }}
      >
        <Box sx={{ maxWidth: 'xl', mx: 'auto', p: { xs: 2, md: 4 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
