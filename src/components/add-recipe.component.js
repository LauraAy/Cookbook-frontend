import React, { Component } from "react";
import RecipeDataService from "../services/recipe.service.js";

export default class AddRecipe extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle =this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeRecipeType = this.onChangeRecipeType.bind(this);
        this.onChangeServingSize = this.onChangeServingSize.bind(this);
        this.onChangeIngredients = this.onChangeIngredients.bind(this);
        this.onChangeDirections = this.onChangeDirections.bind(this);
        this.saveRecipe = this.saveRecipe.bind(this);
        this.newRecipe = this.newRecipe.bind(this);

        this.state = {
            id: null,
            title: "",
            description: "",
            recipeType: "",
            servingSize: null,
            ingredients: "",
            directions: "",
            published: false,

            submitted: false
        };
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeDescription(e) {
      this.setState({
        description: e.target.value
      });
    }

    onChangeRecipeType(e) {
      this.setState({
        recipeType: e.target.value
      });
    }

    onChangeServingSize(e) {
      this.setState({
        servingSize: e.target.value
      });
    }

    onChangeIngredients(e) {
      this.setState({
        ingredients: e.target.value
      });
    }

    onChangeDirections(e) {
      this.setState({
        directions: e.target.value
      });
    }

    saveRecipe() {
        var data ={
            title: this.state.title,
            description: this.state.description,
            recipeType: this.state.recipeType,
            servingSize: this.state.servingSize,
            ingredients: this.state.ingredients,
            directions: this.state.directions
        };

    RecipeDataService.create(data)
        .then(response => {
            this.setState({
                id: response.data.id,
                title: response.data.title,
                description: response.data.description,
                recipeType: response.data.recipeType,
                servingSize: response.data.servingSize,
                ingredients: response.data.ingredients,
                directions: response.data.directions,
                published: response.data.published,
                 
                submitted: true
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    newRecipe() {
        this.setState({
            id: null,
            title: "",
            description: "",
            recipeType: "",
            servingSize: null,
            ingredients: "",
            directions: "",
            published: false,

            submitted: false
        });
    }

    render() {
        return (
          <div className="submit-form">
            {this.state.submitted ? (
              <div>
                <h4>Recipe submitted successfully!</h4>
                <button className="btn btn-success" onClick={this.newRecipe}>
                  Add
                </button>
              </div>
            ) : (
              <div>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    required
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                    name="title"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    required
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    name="description"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="recipeType">Recipe Type</label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipeType"
                    required
                    value={this.state.recipeType}
                    onChange={this.onChangeRecipeType}
                    name="recipeType"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="servingSize">Serving Size</label>
                  <input
                    type="integer"
                    className="form-control"
                    id="servingSize"
                    required
                    value={this.state.servingSize}
                    onChange={this.onChangeServingSize}
                    name="servingSize"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="ingredients">Ingredients</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ingredients"
                    required
                    value={this.state.ingredients}
                    onChange={this.onChangeIngredients}
                    name="ingredients"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="directions">Directions</label>
                  <input
                    type="text"
                    className="form-control"
                    id="directions"
                    required
                    value={this.state.directions}
                    onChange={this.onChangeDirections}
                    name="directions"
                  />
                </div>

                <button onClick={this.saveRecipe} className="btn btn-success">
                  Submit
                </button>
              </div>
            )}
          </div>
        );
      }
    }