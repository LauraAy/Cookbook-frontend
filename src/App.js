import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddRecipe from "./components/add-recipe.component.js";
import RecipeEdit from "./components/recipe-edit.component.js";
import RecipesList from "./components/recipes-list.component.js";
import Recipe from "./components/recipe.component.js";

class App extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <a href="/recipes" className="navbar-brand">
                      Custom Cookbook 
                    </a>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/recipes"} className="nav-link">
                            Recipes
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/add"} className="nav-link">
                            Add
                        </Link>
                    </li>
                </div>
                </nav>

                <div className="container mt-3">
                    <Routes>
                        <Route path="/" element={<RecipesList/>} />
                        <Route path="/recipes" element={<RecipesList/>} />
                        <Route path="/add" element={<AddRecipe/>} />
                        <Route path="/recipes/:id" element={<Recipe/>} />
                        <Route path="/recipes/edit/:id" element={<RecipeEdit/>} />
                    </Routes>
                </div>
            </div>
        );
    }
}

export default App;
