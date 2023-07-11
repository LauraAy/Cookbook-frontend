import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import RecipeDataService from "../services/recipe.service";
import RegionDataService from "../services/region.service";
import AuthService from "../services/auth.service.js";

const AddRecipe = () => { 
  const currentUser = AuthService.getCurrentUser();

  const initialRecipeState = {
    id: null,
    title: "",
    description: "",
    recipeType: "",
    servingSize: null,
    ingredients: "",
    directions: "",
    source: "",
    userId: undefined
  };

  const [recipe, setRecipe] = useState(initialRecipeState);
  const [submitted, setSubmitted] = useState(false);
  const [userId, setUserId] = useState(currentUser.id);
  const [regions, setRegions] = useState([]);
  const [currentRegion, setCurrentRegion] = useState (null)
  const [currentIndex, setCurrentIndex] = useState(-1);
  
  const handleInputChange = event => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };
  
  const saveRecipe = () => {
    var data = {
      title: recipe.title,
      description: recipe.description,
      recipeType: recipe.recipeType,
      servingSize: recipe.servingSize,
      ingredients: recipe.ingredients,
      directions: recipe.directions,
      source: recipe.source,
      userId: userId,
    };

    RecipeDataService.create(data)
    .then(response => {
      setRecipe({
        id: response.data.id,
        title: response.data.title,
        description: response.data.description,
        recipeType: response.data.recipeType,
        servingSize: response.data.servingSize,
        ingredients: response.data.ingredients,
        directions: response.data.directions,
        source: response.data.source,
        userId: response.data.userId,
        
      });
      setSubmitted(true);
      console.log(response.data);
      console.log(recipe.id)
    })
    .catch(e => {
      console.log(e);
    });
};

const newRecipe = () => {
    setRecipe(initialRecipeState);
    setSubmitted(false);
  };

  const handleChange = (e) => {
    const regionId = e.target.value;
    RegionDataService.get(regionId)
    .then(response => {
      setCurrentRegion(response.data);
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
    console.log(e.target.value);
    console.log("I tried.");
  }

return (

    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Recipe Created!</h4>
            <div>
            {recipe.id}
            <br></br>
            {recipe.title}
            </div>
          </div>
        ):(
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={recipe.title}
              onChange={handleInputChange}
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
              value={recipe.description}
              onChange={handleInputChange}
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
              value={recipe.recipeType}
              onChange={handleInputChange}
              name="recipeType"
            />
          </div>
          <div className="form-group">
            <label htmlFor="servingSize">Serving Size</label>
            <input
              type="text"
              className="form-control"
              id="servingSize"
              required
              value={recipe.servingSize}
              onChange={handleInputChange}
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
              value={recipe.ingredients}
              onChange={handleInputChange}
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
              value={recipe.directions}
              onChange={handleInputChange}
              name="directions"
            />
          </div>
          <div className="form-group">
            <label htmlFor="source">Source</label>
            <input
              type="text"
              className="form-control"
              id="source"
              required
              value={recipe.source}
              onChange={handleInputChange}
              name="source"
            />
          </div>
         
          <button onClick={saveRecipe} className="btn btn-success">
           Submit
          </button>
        </div>
      )}

    </div>    
  );
};


export default AddRecipe;