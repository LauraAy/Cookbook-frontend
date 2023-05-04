import React, { Component } from "react";
import UserService from "../services/user.service.js"
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import userEvent from "@testing-library/user-event";


export default class UserRecipes extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveUserRecipes = this.retrieveUserRecipes.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiverecipe = this.setActiverecipe.bind(this);
    this.removeAllrecipes = this.removeAllrecipes.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      UserRecipes: [],
      currentrecipe: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }
  componentDidMount() {

    const currentUser = AuthService.getCurrentUser();
   this.retrieveUserRecipes(currentUser.id);
  }

//   onChangeSearchTitle(e) {
//     const searchTitle = e.target.value;

//     this.setState({
//       searchTitle: searchTitle
//     });
//   }

  retrieveUserRecipes(id) {
    const currentUser = AuthService.getCurrentUser();

    UserService.getUserRecipes(id)
      .then(response => {
        this.setState({
          userRecipes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
      console.log(currentUser.id)
  }

  refreshList() {
    this.retrieverecipes();
    this.setState({
      currentrecipe: null,
      currentIndex: -1
    });
  }

  setActiverecipe(recipe, index) {
    this.setState({
      currentrecipe: recipe,
      currentIndex: index
    });
  }

//   removeAllrecipes() {
//     recipeDataService.deleteAll()
//       .then(response => {
//         console.log(response.data);
//         this.refreshList();
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

  searchTitle() {
    this.setState({
      currentrecipe: null,
      currentIndex: -1
    });

//     recipeDataService.findByTitle(this.state.searchTitle)
//       .then(response => {
//         this.setState({
//           recipes: response.data
//         });
//         console.log(response.data);
//       })
//       .catch(e => {
//         console.log(e);
//       });
  }

  render() {
    const { searchTitle, recipes, currentrecipe, currentIndex } = this.state;

    return (
        <h1>Ciao</h1>
    )
  }
}