import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

import AddRecipe from "./components/add-recipe2.component.js";
import RecipeEdit from "./components/recipe-edit.component.js";
import RecipesList from "./components/recipes-list.component.js";
import Recipe from "./components/recipe.component.js";
import UserRecipes from "./components/user-recipes.component.js";
import Navbar from "./components/navbar.component";


class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    
        this.state = {
          showModeratorBoard: false,
          showAdminBoard: false,
          currentUser: undefined,
        };
      }
    
      componentDidMount() {
        const user = AuthService.getCurrentUser();
    
        if (user) {
          this.setState({
            currentUser: user,
            showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
            showAdminBoard: user.roles.includes("ROLE_ADMIN"),
          });
        }
      }
    
      logOut() {
        AuthService.logout();
        this.setState({
          showModeratorBoard: false,
          showAdminBoard: false,
          currentUser: undefined,
        });
      }

    render() {
        const { currentUser, showModeratorBoard, showAdminBoard } = this.state; 
        
        return (
        <>
         <div>
           {<Navbar/>}
          </div> 

        <div className="container mt-3">
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/user" element={<BoardUser />} />
                <Route path="/mod" element={<BoardModerator />} />
                <Route path="/admin" element={<BoardAdmin />} />

                <Route path="/recipes" element={<RecipesList/>} />
                <Route path="/user/recipes" element={<UserRecipes/>} /> 
                <Route path="/add" element={<AddRecipe/>} />
                <Route path="/recipes/:id" element={<Recipe/>} />
                <Route path="/recipes/edit/:id" element={<RecipeEdit/>} />

            </Routes>
         </div>
    
    </>
        );
    }
}

export default App;
