import React, { Component } from "react";
import RecipeDataService from "../services/RecipeService.js";
import { withRouter } from '../common/with-router';


class RecipeEdit extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeRecipeType = this.onChangeRecipeType.bind(this);
    this.onChangeServingSize = this.onChangeServingSize.bind(this);
    this.onChangeIngredients = this.onChangeIngredients.bind(this);
    this.onChangeDirections = this.onChangeDirections.bind(this);
    this.onChangeRecipeType = this.onChangeRecipeType.bind(this);
    this.onChangeServingSize = this.onChangeServingSize.bind(this);
    this.onChangeIngredients = this.onChangeIngredients.bind(this);
    this.onChangeDirections = this.onChangeDirections.bind(this);
    this.getRecipe = this.getRecipe.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateRecipe = this.updateRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);

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

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentRecipe: {
          ...prevState.currentRecipe,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentRecipe: {
        ...prevState.currentRecipe,
        description: description
      }
    }));
  }
 
  onChangeRecipeType(e) {
    const recipeType = e.target.value;
    
    this.setState(prevState => ({
      currentRecipe: {
        ...prevState.currentRecipe,
        recipeType: recipeType
      }
    }));
  }

  onChangeServingSize(e) {
    const servingSize = e.target.value;
    
    this.setState(prevState => ({
      currentRecipe: {
        ...prevState.currentRecipe,
        servingSize: servingSize
      }
    }));
  }

  onChangeIngredients(e) {
    const ingredients = e.target.value;
    
    this.setState(prevState => ({
      currentRecipe: {
        ...prevState.currentRecipe,
        ingredients: ingredients
      }
    }));
  }

  onChangeDirections(e) {
    const directions = e.target.value;
    
    this.setState(prevState => ({
      currentRecipe: {
        ...prevState.currentRecipe,
        directions: directions
      }
    }));
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

  updatePublished(status) {
    var data = {
      id: this.state.currentRecipe.id,
      title: this.state.currentRecipe.title,
      description: this.state.currentRecipe.description,
      published: status
    };

    RecipeDataService.update(this.state.currentRecipe.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentRecipe: {
            ...prevState.currentRecipe,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateRecipe() {
    RecipeDataService.update(
      this.state.currentRecipe.id,
      this.state.currentRecipe
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Recipe was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteRecipe() {    
    RecipeDataService.delete(this.state.currentRecipe.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/Recipes');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentRecipe } = this.state;

    return (
      <div>
        {currentRecipe ? (
          <div className="edit-form">
            <h4>Recipe</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentRecipe.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentRecipe.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="recipeType">Recipe Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="recipeType"
                  value={currentRecipe.recipeType}
                  onChange={this.onChangeRecipeType}
                />
              </div>
              <div className="form-group">
                <label htmlFor="servingSize">Serving Size</label>
                <input
                  type="text"
                  className="form-control"
                  id="servingSize"
                  value={currentRecipe.servingSize}
                  onChange={this.onChangeServingSize}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ingredients">Ingredients</label>
                <input
                  type="text"
                  className="form-control"
                  id="ingredients"
                  value={currentRecipe.ingredients}
                  onChange={this.onChangeIngredients}
                />
              </div>
              <div className="form-group">
                <label htmlFor="directions">Directions</label>
                <input
                  type="text"
                  className="form-control"
                  id="directions"
                  value={currentRecipe.directions}
                  onChange={this.onChangeDirections}
                />
              </div>
              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentRecipe.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentRecipe.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteRecipe}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateRecipe}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Recipe...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(RecipeEdit);