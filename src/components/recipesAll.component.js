import React, { useState, useEffect } from "react";
import recipeDataService from "../services/recipe.service";
import { Link } from "react-router-dom";
import { Autocomplete, TextField, Options} from '@mui/material';

const RecipesAll = ()=> {
  const [recipes, setRecipes] = useState ([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchRecipe, setSearchRecipe] = useState("");
  const [searchActive, setSearchActive] = useState(false);
 
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
  retrieveRecipes();
}, []);

const retrieveRecipes = () => {
  recipeDataService.getAll()
  .then(response => {
    setRecipes(response.data);
    console.log(response.data);
  })
  .catch(e => {
    console.log(e);
  });
};

const refreshList = () => {
  retrieveRecipes();
  setCurrentRecipe(null);
  setCurrentIndex(-1);
};

const setActiveRecipe = (recipe, index) => {
  setCurrentRecipe(recipe);
  setCurrentIndex(index);
};

const removeAllrecipes = () => {
  recipeDataService.removeAll()
  .then(response => {
    console.log(response.data);
    refreshList();
  })
  .catch(e => {
    console.log(e);
  });
};

const findByTitle = () => {
  const searchTitle = searchRecipe.title
  console.log(searchRecipe.title)
  recipeDataService.findByTitle(searchTitle)
  .then (response => {
    setRecipes(response.data);
    setSearchActive(true)
    setCurrentRecipe(null)
    console.log(response.data);
  })
  .catch(e => {
    console.log(e);
  });
};

const resetAll = () => {
  retrieveRecipes()
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
              options = {recipes.map((recipe) => recipe)}
              getOptionLabel={(recipe) => recipe.title }
              onChange={(event, value) => setSearchRecipe(value)}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Search Recipe Titles" />}
            />
            <button onClick={findByTitle}>Search</button>
            <br></br>
            <br></br>
          </div>
        </div>
      )}
    </div>
    <div className="col-md-6">
        <h4>Recipes List</h4>

        <ul className="list-group">
          {recipes &&
          recipes.map((recipe, index) => (
            <li
              className={
                "list-group-item " + (index === currentIndex ? "active" : "")
                }
              onClick={() => setActiveRecipe(recipe, index)}
              key={index}
            >
              {recipe.title}
            </li>
          ))}
        </ul>
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

  export default RecipesAll;