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
        </Routes>


      
      {/* <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to ={"/"} className="navbar-brand">
          Your World Cookbook 
        </Link>
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/user/recipes"} className="nav-link">
                Your Recipes
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/recipes"} className="nav-link">
                All Recipes
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/recipes/add"} className="nav-link">
                Add Recipes
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav> */}
      </div>
    </>
    );
  }

export default App;
