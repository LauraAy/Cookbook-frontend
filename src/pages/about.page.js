import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import {Box, Button, Card, CardMedia, Divider, Grid, Typography} from '@mui/material';
import AuthService from "../services/auth.service";
import cuttingBoard from "../images/cuttingBoard.png";
import japaneseTea from "../images/japaneseTea2.png"
import { purple, blue, green } from '@mui/material/colors';

const styles = {
	textCard: {
		position: 'relative',
		textAlign: 'left', 
		padding: '20px',
		// fontStyle: 'italic',
		fontWeight: 'bold',
		marginLeft: '5%',
		marginRight: '5%',
		border: '5px solid #1b5e20'
	}
}

const AboutPage = () => {
  let navigate = useNavigate();

	return (
	<>
		<Box mt={2}>
			<Typography variant="h4" textAlign="center">
				About Your World Cookbook
			</Typography>
		</Box>
		<Card style={styles.textCard} >
			<Typography>
				The idea for Your World Cookbook started with a group of friends in a virtual travel group
				who found a way to share the joy of cooking from across a continent. During the covid lockdown
				I was fortunate to be a part of a group of friends who started a virtual travel group called 
				Armchair Airlines where we could imagine going anywhere in the world at a time when we were 
				constrained to our own homes. This friend group was also scattered across the United States, 
				with members from Philadelphia to LA. Every month we would choose a different country in the world
				to visit and we would read books, watch movies, play games, and listen to music from our host country
				among other things. 
				<br></br>
				<br></br>
				The highlight of these virtual travel months was (and still is) our virtual cooking session, when 
				friends from around the country would zoom in from their kitchens around the country to cook a recipe 
				from our country from the month. As a group we got to come together to experience learning to make 
				recipes from Thailand, Iceland, Sicily, Peru, Australia, and many more. We even tried a cookie recipe loved by 
				members of the South Pole research station!
				<br></br>
				<br></br>
				These cooking sessions were not only fun ways for friends to bond from across the miles, but also became 
				opportunities to both learn about the larger world of cooking and share the worlds of our own kitchens.
				Some of the recipes we tried were completely new and unfamiliar foods we got to try for the first time. 
				Other recipes reminded members of the group of foods they already knew how to cook well, or were recipes that 
				came from places some of our families were originally from before they came to America. 
				<br></br>
				<br></br>
				This website is a place where the friendship and collaboration that started with the virtual travel and 
				cooking group my friends and I shared can be extended to others who want to use it as a place to store their
				favorite recipes from close to home or from around the world. Your World Cookbook is a place where you can 
				enter a recipe and keep it together with context about its origins. It's a place to share where this recipe is from
				and who the person or people are who created it. It's also a place, like my virtual travel and cooking group, 
				where you can share lots of ideas for things to pair with your recipe, from music and books, to decor and games
				so that you can enjoy, not just the food, but other parts of the culture that food is from. 
				Your World Cookbook helps you to bring together recipes from around the world and experience something new or to 
				share a piece of your own world through the foods you know best. 
			</Typography>
		</Card>
	</>
	)
}

export default AboutPage