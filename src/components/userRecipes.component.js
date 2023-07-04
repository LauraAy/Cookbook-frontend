import React, { Component } from "react";
import recipeDataService from "../services/recipe.service";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service.js"

export default class RecipesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveUserRecipes = this.retrieveUserRecipes.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiverecipe = this.setActiverecipe.bind(this);
    this.removeAllrecipes = this.removeAllrecipes.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      userRecipes: [],
      currentrecipe: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    this.retrieveUserRecipes(currentUser.id);
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

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

  removeAllrecipes() {
    recipeDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentrecipe: null,
      currentIndex: -1
    });

    recipeDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          recipes: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {
    const { searchTitle, userRecipes, currentrecipe, currentIndex } = this.state;
  
 
    return (
    <>

      <div>
        <h1>{userRecipes.username}</h1>
      </div>
        
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <h4>Recipes List</h4>
        
            <ul className="list-group">
              {userRecipes.recipes?.map((recipe, index) => (
                <li 
                  className={"list-group-item" +
                  (index === currentIndex ? "active" : "")
                }
                onClick={() => this.setActiverecipe(recipe, index)}
                  key={index}>
                    {recipe.title}
                </li>
               ))}
            </ul>
        </div>
   

      <div className="col-md-6">
          {currentrecipe ? (
            <div>
              <h4>Recipe</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentrecipe.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentrecipe.description}
              </div>
              <div>
                <label>
                  <strong>Recipe Type:</strong>
                </label>{" "}
                {currentrecipe.recipeType}
              </div>
              <div>
                <label>
                  <strong>ServingSize:</strong>
                </label>{" "}
                {currentrecipe.servingSize}
              </div>
              <div>
                <label>
                  <strong>Ingredients:</strong>
                </label>{" "}
                {currentrecipe.ingredients}
              </div>
              <div>
                <label>
                  <strong>Directions:</strong>
                </label>{" "}
                {currentrecipe.directions}
              </div>
              <div>
                <label>
                  <strong>Contributed by:</strong>
                </label>{" "}
               ?
              </div>

              <Link
                to={"/recipes/" + currentrecipe.id}
                className="badge badge-warning"
              >
                View Full Recipe
              </Link>
              <Link
                to={"/recipes/edit/" + currentrecipe.id}
                className="badge badge-warning"
              >
                edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a recipe...</p>
            </div>
          )}
        </div>
     </div>    
   </>
)}
}