import React, { useState, useEffect } from "react";
import {Box, Button, Card, CardMedia, Container, Typography} from '@mui/material';
import { shadows } from '@mui/system';
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import cuttingBoard from "../images/cuttingBoard.png";
import japaneseTea from "../images/japaneseTea2.png"
import { red, purple, blue, green } from '@mui/material/colors';
import { useParams, useNavigate } from 'react-router-dom';


const HomeComponent = () => {

  let navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
		const user = AuthService.getCurrentUser();
		if (user) {
			setCurrentUser(user);
			console.log(user)
			console.log(user.username)
		    // setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
		    // setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
		}
	}, []);

  const styles = {
  
    media: {
      height: 0,
      paddingTop: '56.25%' // 16:9
    },
    media2: {
      height: 0,
      paddingTop: '80%' // 16:9
    },
    card: {
      position: 'relative',
      textAlign: 'center', 
      margin: '10px'
    },
    textCard: {
      position: 'relative',
      textAlign: 'left', 
      margin: '10px',
      padding: '20px',
      fontStyle: 'italic',
      fontWeight: 'bold'
    },
    overlay: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: '#ffffff',
      textShadow: '2px 2px 3px #1b5e20, -2px -2px 3px #1b5e20',
      borderRadius: '10px',
    }
  }

  const register = () => {
    navigate('/register')
  }

  const login = () => {
    navigate('/login')
  }

  return (
  <>
    { currentUser ? (
    <>
    <Card style={styles.card}>
      <CardMedia image={cuttingBoard} alt="A cutting board with veggies and other food prep."style={styles.media}/> 
      <Typography variant='h3' color='primary.main' style={styles.overlay} sx={{ display: { xs: 'none', sm: 'none', md: 'flex' }}}>
        Welcome to Your World CookBook {currentUser.username}
      </Typography>
      <Typography variant='h4' color='primary.main' style={styles.overlay} sx={{display: { xs: 'none', sm: 'flex', md: 'none'}}}>
        Welcome to Your World CookBook {currentUser.username}
      </Typography>
      <Typography variant='h5' color='primary.main' style={styles.overlay} sx={{display: { xs: 'flex', sm: 'none' }}}>
        Welcome {currentUser.username}
      </Typography>
    </Card>
    <Box style={styles.card}>
    <Typography variant='h4' sx={{textAlign: 'center'}}>
      Add a new recipe now!
    </Typography>
    <Button variant='contained' sx={{align: 'center', mt: '5px'}}>
      Add New Recipe
    </Button>
    </Box>
    <Card style={styles.textCard} >
      <Typography variant='h6' sx={{ color: 'secondary.main'}}>
        When you make food, you are connecting with the personal world of your home, the local world of the community of
        friends and family who will share your food, and the larger world of recipes invented in kitchens in different 
        countries across the globe. 
      </Typography>
    </Card>

    <Card style={styles.textCard} >
      <Typography variant='h6' sx={{ color: 'secondary.main'}}>
        Whether it's a recipe you found on the internet or a treasured family meal passed down through 
        generations, Your World Cookbook is the the place to record the recipes that are a part of your own cooking world
        while also recording the people and places they come from. 
      </Typography>
    </Card>

  
    </>
    ):(
    <>
    <Card style={styles.card}>
      <CardMedia image={japaneseTea} alt="A japanese tea set and asian style bowl with vegetables inside."style={styles.media2}/> 
      <Typography variant='h2' color='primary.main' style={styles.overlay} sx={{display: { xs: 'none', sm: 'none', md: 'flex' }}}>
        Welcome to Your World Cookbook
      </Typography>
      <Typography variant='h3' color='primary.main' style={styles.overlay} sx={{display: { xs: 'none', sm: 'flex', md: 'none'}}}>
        Welcome to Your World Cookbook
      </Typography>
      <Typography variant='h4' color='primary.main' style={styles.overlay} sx={{display: { xs: 'flex', sm: 'none' }}}>
        Welcome to Your World Cookbook
      </Typography>
    </Card>
    <Box style={styles.card}>
    <Typography variant='h4' sx={{textAlign: 'center'}}>
      Get Started! Sign up or sign in now. 
    </Typography>
    <Button 
      variant='contained' 
      sx={{align: 'center', m: '10px'}}
      onClick={register}
    >
      Sign Up
    </Button>
    <Button 
      variant='contained' 
      sx={{align: 'center', m: '10px' }}
      onClick={login}
    >
      Sign In
    </Button>
    </Box>
    </>
    
    )}
  </>  
  );
};

export default HomeComponent;