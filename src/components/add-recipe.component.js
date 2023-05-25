import React, { useState } from "react";
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
    userId: null
  };

  const initialRegionState = {
    regionId: null,
    regionName: "", 
    city: "",
    state: "",
    country: "",
    lat: null,
    lng: null
  };

  const [recipe, setRecipe] = useState(initialRecipeState);
  const [submitted, setSubmitted] = useState(false);
  const [userId, setUserId] = useState(currentUser.id);
  const [region, setRegion] = useState(initialRegionState);
  
  const handleInputChange = event => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
    setRegion({...region, [name]: value})
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
      regionId: region.regionId
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
        regionId: response.data.regionId
      });
      setSubmitted(true);
      console.log(response.data);
      console.log(recipe.id)
    })
    .catch(e => {
      console.log(e);
    });
};

    const saveRegion = () => {
      var data = {
        regionId: region.regionId,
        regionName: region.regionName
      };

    RegionDataService.create(data)
      .then(response => {
        setRegion({
          regionId: response.data.id,
          regionName: response.data.regionName,
          city: response.data.city,
          state: response.data.state,
          country: response.data.country,
          lat: response.data.lat,
          lng: response.data.lng
        });
        console.log(response.data);
        console.log(region.regionId)
      })
      .catch(e => {
        console.log(e);
      });
  };
  const addRegion = regionId => {
    var data = {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      regionId: region.regionId
    };

    RecipeDataService.update(recipe.id, data)
      .then(response => {
        setRecipe({ ...recipe, regionId });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


  const newRecipe = () => {
    setRecipe(initialRecipeState);
    setRegion(initialRegionState);
    setSubmitted(false);
  };




  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
            <div>
            {recipe.id}
            {recipe.title}
            </div>
            <h4>Add a Region</h4>
          <div className="form-group">
            <label htmlFor="regionName">Region Name</label>
            <input
              type="text"
              className="form-control"
              id="regionName"
              required
              value={region.regionName}
              onChange={handleInputChange}
              name="regionName"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lat">Latitude</label>
            <input
              type="text"
              className="form-control"
              id="lat"
              required
              value={region.lat}
              onChange={handleInputChange}
              name="lat"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lng">Longitude</label>
            <input
              type="text"
              className="form-control"
              id="lng"
              required
              value={region.lng}
              onChange={handleInputChange}
              name="lng"
            />
          </div>
       

          <button onClick={saveRegion} className="btn btn-success">
            Submit
          </button>
          <br></br>
          <br></br>
          <button onClick={addRegion} className="btn">
            Add Region
          </button>
          <br></br>
          <br></br>
          <button className="btn btn-success" onClick={newRecipe}>
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