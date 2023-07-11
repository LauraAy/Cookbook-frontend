import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

import AuthService from "../services/auth.service";


class Navbar extends Component {
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
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to ={"/"} className="navbar-brand">
                      Custom Cookbook 
                    </Link>
                   

                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                         <li className="nav-item">
                            <Link to={"/user/recipes"} className="nav-link">
                            My Recipes
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
                        <a href="/login" className="nav-link" onClick={this.logOut}>
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
     </div>

    )
  }    
}

export default (Navbar);