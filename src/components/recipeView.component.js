import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import RecipeDataService from "../services/recipe.service";
import Accordion from 'react-bootstrap/Accordion';

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

<Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Full Recipe</Accordion.Header>
        <Accordion.Body>
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
        <strong>Source:</strong>
      </label>{" "}
      {currentRecipe.source}
    </div>

    <Link
      to={"/recipes/edit/" + currentRecipe.id}
      className="badge badge-warning"
    >
      <button>
      Edit
      </button>
    </Link>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Region</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Recipe Creator</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Recipe Pairings</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>

  
    <Link
      to={"/user/recipes/" }
      className="badge badge-warning"
    >
      <button>
      View your recipes.
      </button>
    </Link>
    <Link
      to={"/recipes/"}
      className="badge badge-warning"
    >
      <button>
      View all recipes.
      </button>
    </Link>
  </div>
)}


export default RecipeViewComponent