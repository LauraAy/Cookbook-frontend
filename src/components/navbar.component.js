import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container,
Avatar, Button, Tooltip, MenuItem }from '@mui/material';
import { MenuBook, BakeryDining }from '@mui/icons-material';


import AuthService from "../services/auth.service";

// const NavbarComponent = () => {

// // const [showModeratorBoard, setShowModeratorBoard] = useState(false);
// // const [showAdminBoard, setShowAdminBoard] = useState(false);
// const [currentUser, setCurrentUser] = useState(undefined);
// const [userName, setUserName] = useState(undefined);

// //user login and logout functions
// useEffect(() => {
  const user = AuthService.getCurrentUser();

//   if (user) {
//     setCurrentUser(user);
// 		setUserName("something")
// 		console.log(user)
// 		console.log(user.username)
//     // setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
//     // setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
//   }
// }, []);

const logOut = () => {
  AuthService.logout();
};

	//app bar functions
	const pages = [
		{name: 'Your Recipes', link: '/user/recipes'},
		{name: 'All Recipes', link: '/recipes'},
		{name: 'Add Recipes', link: '/recipes/add'}
	]

	const userPages = [
		{name: '{currentUser.username}', link: '/user/profile'},
		{name: 'Sign Out', link: '/logOut'}
	]

	const loginPages = [
		{name: 'Register', link: '/register'},
		{name: 'Sign In', link: '/logIn'}
	]
	const settings = [ `${user.username}`, 'Account', 'Dashboard', 'Logout'];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <BakeryDining sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
						Your World Cookbook
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuBook />
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
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
									<Typography textAlign="center">
										<Link to ={`${page.link}`} className="navbar-brand">
											{page.name}
										</Link>
									</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <BakeryDining sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
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
            Your World Cookbook
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
								<Link style={{textDecoration: "none", color: "white"}} to={`${page.link}`} className="nav-link">
									{page.name}
								</Link>
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <Button 
							onClick={handleOpenUserMenu} 
							sx={{  my: 2, color: 'white', display: 'block'  }}>
                <Typography>hi{userName}</Typography>
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
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavbarComponent