import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
// import { AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuIcon, Container,
// Avatar, Button, Tooltip, MenuItem, AdbIcon }from '@mui/material';
import NavbarComponent from "./components/navbar.component";
import {createTheme, colors, createColor, ThemeProvider} from '@mui/material';
import { red, purple, blue, green, grey, pink, deepOrange } from '@mui/material/colors';

import Home from "./pages/home.page.js";
import Login from "./pages/login.page.js";
import Register from "./pages/register.page.js";
import Profile from "./pages/profile.page.js";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import RecipeAdd from "./pages/recipeAdd.page.js";
import RecipeEdit from "./pages/recipeEdit.page.js";
import RecipeView from "./pages/recipeView.page.js";
import RecipesAll from "./pages/recipesAll.page.js";
import UserRecipesAll from "./pages/userRecipesAll.page.js";
import RegionAdd from "./pages/regionAdd.page.js";
import CreatorAdd from "./pages/creatorAdd.page.js";
import CreatorEdit from "./pages/creatorEdit.page.js";
import PairingAdd from "./pages/pairingAdd.page.js";
import PairingEdit from "./pages/pairingEdit.page.js"

import Test from "./components/test.js"
import { createLocalStorageManager } from "@chakra-ui/react";


  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat Variable",
      h1: {
        fontFamily: "RachelBrown",
        color: green[800]
      },
      h2: {
        fontFamily:"RachelBrown",
        color: green[900]
      },
      h3: {
        fontFamily:"RachelBrown",
        color: green[900]
      },
      h4: {
        fontFamily:"RachelBrown",
        color: green[900]
      },
      h5: {
        fontFamily:"RachelBrown",
        color: green[900]
      },
      h6: {
        fontFamily:"RachelBrown",
        color: grey[900]
      },
      body1: {
        fontSize: "1.1rem",
        lineHeight: "1.5"
      }
    },
    palette: {
      primary: {
        main: green[900],
      },
      secondary: {
        main: blue[900],
      },
      info: {
        main: '#890010'
      },
      creator: {
        main: purple[900]
      },
      pairing: {
        main: '#890010',
        dark: '#890010'
      },
      greyQuote: {
        main: grey[800]
      }
    },
  });


const App = () => {

  return (
  <ThemeProvider theme={theme}>
    <>
    <NavbarComponent />
      
    <div className="container mt-3">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user" element={<BoardUser />} />
        <Route path="/mod" element={<BoardModerator />} />
        <Route path="/admin" element={<BoardAdmin />} />

        <Route path="/recipes/:id" element={<RecipeView/>} />
        <Route path="/recipes" element={<RecipesAll/>} />
        <Route path="/user/recipes" element={<UserRecipesAll/>} /> 
        <Route path="/recipes/add" element={<RecipeAdd/>} />
        <Route path="/recipes/edit/:id" element={<RecipeEdit/>} />
          
        <Route path="/regions/add/:id" element = {<RegionAdd/>} />
          
        <Route path="/creators/add/:id" element = {<CreatorAdd/>} />
        <Route path="/creators/edit/:recipeId/:creatorId" element={<CreatorEdit/>} />
          
        <Route path="/pairings/add/:id" element = {<PairingAdd/>} />
        <Route path="/pairings/edit/:recipeId/:pairingId" element={<PairingEdit/>} />

        <Route path="/test" element={<Test/>} />
        <Route path ="/test/:id" element={<Test/>} />
        
        </Routes>
   
      </div>
    </>
    </ThemeProvider>
    );
  }

export default App;
