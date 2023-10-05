import React, { useState, useEffect } from "react";
import {Box, Typography} from '@mui/material';
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

const HomeComponent = () => {
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

  return (
  <>
    { currentUser ? (
    <>
      <Box align='center' mt={2}>
        <Typography variant='h2' color='primary.main'>
          Welcome to Your World Cookbook
        </Typography>
      </Box>
    </>
    ):(
    <>
      <Box align='center' mt={2}>
        <Typography variant='h2' color='primary.main'>
          Welcome to Your World Cookbook!
        </Typography>
      </Box>
    </>
    )}
  </>  
  );
};

export default HomeComponent;