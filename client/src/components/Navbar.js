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
// import Avatar from '@mui/material/Avatar';
// import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import '../css/style.css';

const pages = [
  { label: 'Login', path: '/login' },
  { label: 'Signup', path: '/signup' },
  { label: 'Profile', path: '/profile' },
  { label: 'Create a Card', path: '/card-create' },
  { label: 'My Cards', path: '/my-cards' }
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
    <AppBar className="NavBarX">
      <Container maxWidth="xl"
        disableGutters="true">
        <div>
          <Toolbar disableGutters="true">
            {/* Logo */}
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
                    width: '48px', // Adjust the width and height as needed
                    height: '48px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    
                  }}
                />
              </IconButton>
            </Tooltip>


            {/* separation for Desktop settings below */}


            {/* Navigation Menu for Desktop */}

            <Box sx={{
              // display: 'flex',
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              minWidth: '35rem',
              marginLeft: '30rem',
              marginRight: '30rem',
            }}>
              {pages.map((page) => (
                <Button
                  key={page.label}
                  component={Link}
                  to={page.path}
                  // onClick={handleCloseNavMenu}
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


            {/* User Settings */}
            <Box
              id="navBarSignOut"
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Tooltip title="Sign Out">
                <Button
                  onClick={handleLogout} 
                  sx={{
                    fontSize: '1.5rem',
                    p: 0,
                    // marginLeft: 'auto',
                    marginRight: '-1rem',
                    color: '#ffffff',
                    minWidth: '8rem',
                    background:
                      'transparent',
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
                  }}>
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
              // onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.label} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" component={Link} to={setting.path}>
                      {setting.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>



            {/* Separation for Mobile stuff */}

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
              }}
            >
              <img
                src=".../../Card-X-Icon-Small.png"
                alt="Home Page"
                style={{
                  width: '48px', // Adjust the width and height as needed
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

export default ResponsiveAppBar;
