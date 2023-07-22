import React, { useState, useEffect } from 'react';
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
import { Link } from 'react-router-dom';
import '../css/style.css';

const pages = [
  { label: 'Login', path: '/login' },
  { label: 'Signup', path: '/signup' },
];

const settings = [
  { label: 'Profile', path: '/profile' },
  { label: 'Account', path: '/account' },
  { label: 'Dashboard', path: '/dashboard' },
];

export default function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userIsLoggedIn = Boolean(localStorage.getItem('id_token'));
    setIsLoggedIn(userIsLoggedIn);
  }, []);

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
    localStorage.removeItem('id_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.removeItem('email');

    setIsLoggedIn(false);

    window.location.href = '/login';
  };

  const navigationLinks = isLoggedIn ? [
    { label: 'Profile', path: '/profile' },
    { label: 'Create a Card', path: '/card-create' },
    { label: 'My Cards', path: '/my-cards' }
  ] : pages;

  return (
    <AppBar className="NavBarX">
      <Container maxWidth="xl" disablegutters="true">
        <div>
          <Toolbar disablegutters="true">
            <Tooltip title="Home Page">
              <IconButton
                component={Link}
                to="/"
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  position: 'absolute',
                  left: "-1rem",
                  marginLeft: "1rem",
                  opacity: '0.85',
                  '&:hover': {
                    opacity: '1.0',
                    border: '1px solid #c29c8d'
                  },
                }}
              >
                <img
                  src=".../../Card-X-Icon-Small.png"
                  alt="Home Page"
                  style={{
                    width: '48px',
                    height: '48px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                  }}
                />
              </IconButton>
            </Tooltip>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, minWidth: '35rem', marginLeft: '30rem', marginRight: '30rem' }}>
              {navigationLinks.map((page) => (
                <Button
                  key={page.label}
                  component={Link}
                  to={page.path}
                  sx={{
                    my: 2,
                    color: '#f2f2f2',
                    display: 'block',
                    fontSize: '1.1rem',
                    '&:hover': {
                      fontWeight: 'bold',
                      color: '#ffffff',
                      textShadow: '0 0 1px #ffffff',
                      border: '1px solid #b2aa9d',
                    },
                  }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>

            <Box id="navBarSignOut" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              {isLoggedIn ? (
                <Tooltip title="Sign Out">
                  <Button
                    onClick={handleLogout}
                    sx={{
                      fontSize: '1.5rem',
                      p: 0,
                      marginRight: '-1rem',
                      color: '#ffffff',
                      minWidth: '8rem',
                      background: 'transparent',
                      position: 'absolute',
                      padding: '0.25rem, 0',
                      borderRadius: '0.5rem',
                      right: 0,
                      '&:hover': {
                        fontWeight: '800',
                        fontSize: '1.75rem',
                        color: '#ffffff',
                        textShadow: '0 0 1px #ffffff, 0 0 2px #ffffff, 0 0 3px #ffffff',
                        border: '1px solid #b2aa9d',
                      }
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: '1.35rem',
                        '&:hover': {
                          fontStyle: 'bold',
                        }
                      }}
                      alt="Sign Out"
                    >Sign Out
                    </Typography>
                  </Button>
                </Tooltip>
              ) : (
                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    fontSize: '1.1rem',
                    color: '#f2f2f2',
                    '&:hover': {
                      fontWeight: 'bold',
                      color: '#ffffff',
                      textShadow: '0 0 1px #ffffff',
                      border: '1px solid #b2aa9d',
                    },
                  }}
                >
                  Login
                </Button>
              )}
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
              >
                {/* {settings.map((setting) => (
                  <MenuItem key={setting.label} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" component={Link} to={setting.path}>
                      {setting.label}
                    </Typography>
                  </MenuItem>
                ))} */}
              </Menu>
            </Box>

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
                {navigationLinks.map((page) => (
                  <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" component={Link} to={page.path}>
                      {page.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
              }}
            >
              <img
                src=".../../Card-X-Icon-Small.png"
                alt="Home Page"
                style={{
                  width: '48px',
                  height: '48px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
              />
            </Typography>
          </Toolbar>
        </div>
      </Container>
    </AppBar>
  );
}
