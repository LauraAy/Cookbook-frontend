import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

// import Navbar from "./components/navbar.component";

import Home from "./components/home.component";
import Login from "./pages/login.page";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

import RecipeAdd from "./pages/recipeAdd.page.js";
import RecipeEdit from "./components/recipeEdit.component.js";
import RecipeView from "./components/recipeView.component.js";
import RecipesAll from "./components/recipesAll.component.js";
import UserRecipes from "./components/userRecipes.component.js";

import RegionAdd from "./components/regionAdd.component.js";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
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
      </nav>
      
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />

          <Route path="/recipes" element={<RecipesAll/>} />
          <Route path="/user/recipes" element={<UserRecipes/>} /> 
          <Route path="/recipes/add" element={<RecipeAdd/>} />
          <Route path="/regions/add/:id" element = {<RegionAdd/>} />
          <Route path="/recipes/:id" element={<RecipeView/>} />
          <Route path="/recipes/edit/:id" element={<RecipeEdit/>} />
        </Routes>
      </div>
    </>
    );
  }

export default App;
