import React, { useState, useEffect } from "react";
import RegionRecipeDataService from "../services/regionRecipe.service";
import RegionDataService from "../services/region.service";
import { Link } from "react-router-dom";
import { Autocomplete, TextField, Options} from '@mui/material';
import RegionRecipeService from "../services/regionRecipe.service";

const RegionRecipesAll = ()=> {
  const [regionRecipes, setRegionRecipes] = useState ([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [selectedRegion, setSelectedRegion] = useState("")
  const [searchActive, setSearchActive] = useState(false);
	const [countrySearch, setCountrySearch] = useState(false)
	const [currentRegionName, setCurrentRegionName] = useState("")

  useEffect(() => {
  retrieveRegionRecipes();
}, []);

const retrieveRegionRecipes = () => {
  RegionRecipeDataService.getAllRegionRecipes()
  .then(response => {
    setRegionRecipes(response.data);
    console.log(response.data);
  })
  .catch(e => {
    console.log(e);
  });
};

// const refreshList = () => {
//   retrieveRegions();
//   setCurrentRegion(null);
//   setCurrentIndex(-1);
// };

const setActiveRecipe = (recipe, index) => {
  setCurrentRecipe(recipe);
  setCurrentIndex(index);
};

const findByCountry = () => {
  const searchCountry = selectedRegion.country
  console.log(selectedRegion.country)
  RegionRecipeDataService.findByCountry(searchCountry)
  .then (response => {
    setRegionRecipes(response.data);
    setSearchActive(true)
		setCountrySearch(true)
    setCurrentRecipe(null)
    console.log(response.data);
  })
  .catch(e => {
    console.log(e);
  });
};

const findByRegionName = () => {
  const searchRegionName = selectedRegion.regionName
  console.log(selectedRegion.regionName)
  RegionRecipeDataService.findByRegionName(searchRegionName)
  .then (response => {
    setRegionRecipes(response.data);
		setCurrentRegionName(searchRegionName)
    setSearchActive(true)
    setCurrentRecipe(null)
    console.log(response.data);
  })
  .catch(e => {
    console.log(e);
  });
};

const resetAll = () => {
  retrieveRegionRecipes()
  setSearchActive(false)
	if ( countrySearch === true ) {
		setCountrySearch(false)
	}
}

return (
  <div className="list row">
    <div>
      {searchActive ? (
        <div>
          <div className="col-md-8">
            <button onClick={resetAll}>Return to all recipes</button>
          </div>
        </div>
      ):(
        <div>
          <div className="col-md-8">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options = {regionRecipes.map((regionRecipe) => regionRecipe)}
              getOptionLabel={(regionRecipe) => regionRecipe.country }
              onChange={(event, value) => setSelectedRegion(value)}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Search By Country" />}
            />
            <button onClick={findByCountry}>Search</button>
            <br></br>
            <br></br>
          </div>
          <div>
            <div className="col-md-8">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options = {regionRecipes.map((regionRecipe) => regionRecipe)}
                getOptionLabel={(regionRecipe) => regionRecipe.regionName }
                onChange={(event, value) => setSelectedRegion(value)}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Search By RegionName" />}
              />
              <button onClick={findByRegionName}>Search</button>
              <br></br>
              <br></br>
            </div>
          </div>
        </div> 
      )} 
    </div>
    <div className="col-md-6">
			{countrySearch? (<h4>Recipes by Country</h4>)
			:(
			<div>
				<h4>Recipes by Region</h4>
				<h4>{currentRegionName}</h4>
				<br></br>
			</div>
			)}
  
    <div>
      {regionRecipes &&
      regionRecipes.map((regionRecipe) => (
      <div  key={regionRecipe.id}>
        <div>
          <h4>{regionRecipe.country}</h4>
        </div>
        <div>
          <ul>
            {regionRecipe.recipe &&
            regionRecipe.recipe.map((recipe, index) => (
              <li
                className={
                  "list-group-item" + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveRecipe(recipe, index)}
                key={index}
              >
                {recipe.title}
              </li>
            ))}	
          </ul>
        </div>
      </div>
      ))}

      </div>
    </div>

    <div className="col-md-6">
      {currentRecipe ? (
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
              <strong>Contributed by:</strong>
            </label>{" "}
             ?
          </div>

          <Link
            to={"/recipes/" + currentRecipe.id}
          >
            <button>
            View Full Recipe
            </button>
          </Link>
          <Link
         
            to={"/recipes/edit/" + currentRecipe.id}
            className="badge badge-warning"
          >
            <button>
            Edit
            </button>
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
  );
}

  export default RegionRecipesAll;