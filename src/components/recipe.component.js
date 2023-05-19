import React, { Component } from "react";
import RecipeDataService from "../services/RecipeService.js";
import { withRouter } from '../common/with-router';
import {Link} from "react-router-dom";

class Recipe extends Component {
    constructor(props) {
    super(props); 
    this.getRecipe = this.getRecipe.bind(this);

    this.state = {
        currentRecipe: {
          id: null,
          title: "",
          description: "",
          recipeType: "",
          servingSize: null,
          ingredients: "",
          directions: "",
          published: false
        },
        message: ""
      };
    }
  
    componentDidMount() {
      this.getRecipe(this.props.router.params.id);
    }
    getRecipe(id) {
        RecipeDataService.get(id)
          .then(response => {
            this.setState({
              currentRecipe: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    

  render() {
    const { currentRecipe } = this.state;
  
return (
  <div>
    <h4>Recipe</h4>
    <div>
      <label>
        <strong>Title:</strong>
      </label>{" "}
      {currentRecipe.title}
    </div>
    <div>
      <label>
        <strong>Description:</strong>
      </label>{" "}
      {currentRecipe.description}
    </div>
    <div>
      <label>
        <strong>Recipe Type:</strong>
      </label>{" "}
      {currentRecipe.recipeType}
    </div>
    <div>
      <label>
        <strong>ServingSize:</strong>
      </label>{" "}
      {currentRecipe.servingSize}
    </div>
    <div>
      <label>
        <strong>Ingredients:</strong>
      </label>{" "}
      {currentRecipe.ingredients}
    </div>
    <div>
      <label>
        <strong>Directions:</strong>
      </label>{" "}
      {currentRecipe.directions}
    </div>
    <div>
      <label>
        <strong>Status:</strong>
      </label>{" "}
      {currentRecipe.published ? "Published" : "Pending"}
    </div>

    <Link
      to={"/recipes/edit" + currentRecipe.id}
      className="badge badge-warning"
    >
      Edit
    </Link>
  </div>
)}
}

export default withRouter(Recipe);