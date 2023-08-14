import React, { useState, useEffect } from "react";
import CreatorRecipeDataService from "../services/creatorRecipe.service";
import { Link } from "react-router-dom";
import { Autocomplete, TextField} from '@mui/material';


const CreatorRecipesAll = ()=> {
  const [creatorRecipes, setCreatorRecipes] = useState ([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [selectedCreator, setSelectedCreator] = useState("")
  const [searchActive, setSearchActive] = useState(false);

  useEffect(() => {
  retrieveCreatorRecipes();
}, []);

const retrieveCreatorRecipes = () => {
	CreatorRecipeDataService.getAllCreatorRecipes()
  .then(response => {
    setCreatorRecipes(response.data);
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

const findByCreatorName = () => {
  const searchCreatorName = selectedCreator.creatorName
  console.log(selectedCreator.creatorName)
  CreatorRecipeDataService.findByCreatorName(searchCreatorName)
  .then (response => {
    setCreatorRecipes(response.data);
    setSearchActive(true)
	// setCountrySearch(true)
    setCurrentRecipe(null)
    console.log(response.data);
  })
  .catch(e => {
    console.log(e);
  });
};

const resetAll = () => {
  retrieveCreatorRecipes()
  setSearchActive(false)
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
              options = {creatorRecipes.map((creatorRecipe) => creatorRecipe)}
              getOptionLabel={(creatorRecipe) => creatorRecipe.creatorName }
              onChange={(event, value) => setSelectedCreator(value)}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Search By Recipe Creator Name" />}
            />
            <button onClick={findByCreatorName}>Search</button>
            <br></br>
            <br></br>
          </div>
        </div> 
      )} 
    </div>
    <div className="col-md-6">
        <div>
				<h4>Recipes by Creator</h4>
			</div>
    <div>
      {creatorRecipes &&
      creatorRecipes.map((creatorRecipe) => (
      <div  key={creatorRecipe.id}>
        <div>
          <h4>{creatorRecipe.creatorName}</h4>
        </div>
        <div>
          <ul>
            {creatorRecipe.recipe &&
            creatorRecipe.recipe.map((recipe, index) => (
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

  export default CreatorRecipesAll;