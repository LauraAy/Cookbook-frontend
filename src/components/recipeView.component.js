import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import RecipeDataService from "../services/recipe.service";

const RecipeViewComponent = props => {
  const { id } = useParams();
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
  
  const [currentRecipe, setCurrentRecipe] = useState (initialRecipeState);


const getRecipe = id => {
  RecipeDataService.get(id)
  .then(response => {
    setCurrentRecipe(response.data);
    console.log(response.data);
  })
  .catch(e => {
    console.log(e);
  });
};

useEffect(() => {
  if(id)
  getRecipe(id);
}, [id]);
  
return (
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
        <strong>Status:</strong>
      </label>{" "}
      {currentRecipe.published ? "Published" : "Pending"}
    </div>

    <Link
      to={"/recipes/edit/" + currentRecipe.id}
      className="badge badge-warning"
    >
      Edit
    </Link>
  </div>
)}


export default RecipeViewComponent