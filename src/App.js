import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
// import { AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuIcon, Container,
// Avatar, Button, Tooltip, MenuItem, AdbIcon }from '@mui/material';
import NavbarComponent from "./components/navbar.component";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css"
// import AuthService from "./services/auth.service";

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

const App = () => {
 

  return (
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
        
        </Routes>
   
      </div>
    </>
    );
  }

export default App;
