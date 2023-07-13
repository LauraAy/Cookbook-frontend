import React, { useState, useEffect } from "react";
import recipeDataService from "../services/recipe.service";
import { Link } from "react-router-dom";

const RecipesAll = ()=> {
  const [recipes, setRecipes] = useState ([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
  retrieveRecipes();
}, []);

const onChangeSearchTitle = e => {
  const searchTitle = e.target.value;
  setSearchTitle(searchTitle);
};

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
  recipeDataService.findByTitle(searchTitle)
  .then (response => {
    setRecipes(response.data);
    console.log(response.data);
  })
  .catch(e => {
    console.log(e);
  });
};

return (
  <div className="list row">
    <div className="col-md-8">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title"
          value={searchTitle}
          onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
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

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllrecipes}
        >
          Remove All
        </button>
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
              className="badge badge-warning"
            >
              View Full Recipe
            </Link>
            <Link
              to={"/recipes/edit/" + currentRecipe.id}
              className="badge badge-warning"
            >
              Edit
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
