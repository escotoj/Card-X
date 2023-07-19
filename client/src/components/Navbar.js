import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import '../css/style.css';

const pages = [
  { label: 'Login', path: '/login' },
  { label: 'Signup', path: '/signup' }
];
const settings = [
  { label: 'Profile', path: '/profile' },
  { label: 'Account', path: '/account' },
  { label: 'Dashboard', path: '/dashboard' },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    // Perform any additional logout-related tasks here, if necessary
    // For example, you might want to clear local storage, reset state, etc.

    // After performing necessary cleanup, redirect the user to the login page
    // Replace '/login' with the URL of your login page
    window.location.href = '/login';
  };

  return (
    <AppBar className="NavBarX" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 500,
              letterSpacing: '.3rem',
              fontSize: '1.6rem',
              color: '#f8f8f8',
              marginLeft: '-1rem',
              textDecoration: 'none',
              '&:hover': {
                fontSize: '1.75rem',
                marginTop: '-.15rem',
                marginRight: '0.7rem',
                color: '#ffffff',
                textShadow: '0 0 1px white, 0 0 2px white, 0 0 4px white',
              }
            }}
          >
            HOME
          </Typography>

          {/* Navigation Menu for Mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" component={Link} to={page.path}>
                    {page.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo for Mobile */}
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            HOME
          </Typography>

          {/* Navigation Menu for Desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: '#f2f2f2',
                  display: 'block',
                  fontSize: '1.1rem',
                  marginLeft: '0.25rem',
                  '&:hover': {
                    fontWeight: 'bold',
                    color: '#ffffff',
                    textShadow: '0 0 1px white',
                  },
                }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          {/* User Settings */}
          <Box id="dropDownX" sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  style={{
                    background:
                      'linear-gradient(135deg, #53ecbb 30%, #68eac5 80%, #3af4a7 92%)',
                  }}
                  alt="User Avatar"
                  src="/static/images/avatar.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.label} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" component={Link} to={setting.path}>
                    {setting.label}
                  </Typography>
                </MenuItem>
              ))}
              {/* Logout option */}
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
