import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import RecipeDataService from "../services/recipe.service";
import RegionRecipeService from "../services/regionRecipe.service";

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
    
    const [currentRecipe, setCurrentRecipe] = useState ([]);
  
  
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
<>
  <div>
    <label>
      <strong>Title:</strong>
    </label>{" "}
    {currentRecipe.title}
  </div>
  {currentRecipe.description ? (
  <div>
    <label>
      <strong>Description:</strong>
    </label>{" "}
    {currentRecipe.description}
  </div>
  ): null}
  {currentRecipe.recipeType ? (
  <div>
    <label>
      <strong>Recipe Type:</strong>
    </label>{" "}
    {currentRecipe.recipeType}
  </div>
  ): null}
   {currentRecipe.servingSize ? (
    <div>
      <label>
        <strong>ServingSize:</strong>
      </label>{" "}
      {currentRecipe.servingSize}
    </div>
   ): null}
  {currentRecipe.description ? (
  <div>
    <label>
      <strong>Ingredients:</strong>
    </label>{" "}
    {currentRecipe.ingredients}
  </div>
  ): null}
  {currentRecipe.directions ? (
  <div>
    <label>
      <strong>Directions:</strong>
    </label>{" "}
    {currentRecipe.directions}
  </div>
  ): null}
  {currentRecipe.source ? (
  <div>
    <label>
      <strong>Source:</strong>
    </label>{" "}
    {currentRecipe.source}
  </div>
  ): null}

  <Link
    to={"/recipes/edit/" + currentRecipe.id}
    className="badge badge-warning"
  >
    <button>
    Edit
    </button>
  </Link>
</>
)}

export default RecipeViewComponent