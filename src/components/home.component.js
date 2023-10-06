import React, { useState, useEffect } from "react";
import {Box, Card, CardMedia, Container, Typography} from '@mui/material';
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import cuttingBoard from "../images/cuttingBoard.png";
import { red, purple, blue, green } from '@mui/material/colors';

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

  const styles = {
    Typography: {
      color: '#ffffff',
      // outlineColor: red[500]
   

    },
    media: {
       height: 0,
       paddingTop: '56.25%' // 16:9
    },
    card: {
       position: 'relative',
       textAlign: 'center',
      
    },
    overlay: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: '#ffffff',
      
   
      // color: 'black',
      // backgroundColor: 'white'
    }
 }

  return (
  <>
    { currentUser ? (
    <>

{/* <Card style={styles.card}>
   <CardMedia image={this.props.preview} style={styles.media}/>
   <div style={styles.overlay}>
      this text should overlay the image
   </div>
</Card> */}
     
    <Card style={styles.card}>
        <CardMedia image={cuttingBoard} style={styles.media}/>
        {/* <Box sx={{p: '30px', }}> */}
        <Box>
        <Typography variant='h2' color='primary.main' style={styles.overlay}>
          Welcome to Your World Cookbook
        </Typography>
        </Box>
  
        </Card>
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