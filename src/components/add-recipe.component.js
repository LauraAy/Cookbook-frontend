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

  useEffect(() => {
    retrieveRegions();
  }, []);
  
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

const retrieveRegions = () => {
  RegionDataService.getAll()
  .then(response => {
    setRegions(response.data);
    console.log(response.data);
  })
  .catch(e => {
    console.log(e);
  });
};


const refreshDropdown = () => {
  retrieveRegions();
  setCurrentRegion(null);
  setCurrentIndex(-1);
};

const setActiveRegion = (region, index) => {
  setCurrentRegion(region);
  setCurrentIndex(index);
  console.log("I tried.")
};

  //   const saveRegion = () => {
  //     var data = {
  //       regionId: region.regionId,
  //       country: region.country
  //     };

  //   RegionDataService.create(data)
  //     .then(response => {
  //       setRegion({
  //         regionId: response.data.id,
  //         country: response.data.country
  //       });
  //       console.log(response.data);
  //       console.log(region.regionId)
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  const addRegion = regionId => {
    var data = {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      regionId: currentRegion.currentRegionId
    };

    RecipeDataService.update(recipe.id, data)
      .then(response => {
        setRecipe({ ...recipe, regionId });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
      // setRegion(initialRegionState);
  };


  const newRecipe = () => {
    setRecipe(initialRecipeState);
    setSubmitted(false);
  };




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