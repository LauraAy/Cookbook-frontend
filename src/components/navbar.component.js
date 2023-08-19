import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import { Routes, Route, Link } from "react-router-dom";
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container,
Avatar, Button, Tooltip, MenuItem }from '@mui/material';
import { MenuBook, BakeryDining }from '@mui/icons-material';

const NavbarComponent = () => {
  const user = AuthService.getCurrentUser();

	const logOut = () => {
		AuthService.logout();
	};

	//app bar functions
	const pages = [
		{name: 'Your Recipes', link: '/user/recipes'},
		{name: 'All Recipes', link: '/recipes'},
		{name: 'Add Recipes', link: '/recipes/add'}
	]

	const loginPages = [
		{name: 'Register', link: '/register'},
		{name: 'Sign In', link: '/login'}
	]

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
				{ user ? (
				<>
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
                <Typography>{user.username}</Typography>
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
                <MenuItem onClick={handleCloseUserMenu}>
									<Link to ={`/profile`} className="navbar-brand">
                  	<Typography textAlign="center">Profile</Typography>
									</Link>
                </MenuItem>
								<MenuItem onClick={handleCloseUserMenu}>
									<Link to ={`/logout`} className="navbar-brand" onClick={logOut}>
                  	<Typography textAlign="center">Sign Out</Typography>
									</Link>
                </MenuItem>
             
            </Menu>
          </Box>
					</>
						):(
						<>
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
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {loginPages.map((page) => (
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

						</>
						)}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavbarComponent