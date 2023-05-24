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
    userId: null
  };

  const initialRegionState = {
    regionId: null,
    regionName: ""
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
      userId: userId,
      regionId: region.regionId
    };

    RecipeDataService.create(data)
    .then(response => {
      setRecipe({
        id: response.data.id,
        title: response.data.title,
        description: response.data.description,
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
          regionName: response.data.regionName
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

         
          <button onClick={saveRecipe} className="btn btn-success">
           Submit
          </button>
        </div>
      )}

    </div>    
  );
};

export default AddRecipe;