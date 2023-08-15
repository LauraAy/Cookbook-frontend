import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import EverythingDataService from "../services/everything.service";
import Accordion from 'react-bootstrap/Accordion';
import RecipeViewComponent from '../components/recipeView.component.js'
import RegionViewComponent from '../components/regionView.component.js'
import CreatorViewComponent from "../components/creatorView.component";
import PairingViewComponent from "../components/pairingView.component";

const RecipeViewPage = params => {
  const { id } = useParams();
  const [currentRecipe, setCurrentRecipe] = useState ([]);

const getRecipeEverything = id => {
    EverythingDataService.getRecipeEverything(id)
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
    getRecipeEverything(id);
  }, [id]);

return (
  <div>
    <h2>{currentRecipe.title}</h2>
    <div><strong>Description: </strong>{currentRecipe.description}</div>
    <div>
      <strong>Region: </strong>
      {currentRecipe.region &&
        currentRecipe.region.map((region) => (
          <>
            {region.regionName}&nbsp;&nbsp;
          </>
        ) 
      )}
      <br></br>
      <strong>Country: </strong>
        {currentRecipe.region &&
          currentRecipe.region.map((region) => (
            <>
              {region.country}&nbsp;&nbsp;
            </>
          ) 
        )}
        <br></br>
        <strong>Recipe Creator: </strong>
        {currentRecipe.creator &&
          currentRecipe.creator.map((creator) => (
            <>
              {creator.creatorName}&nbsp;&nbsp;
            </>
          )
        )}
        <br></br>
        <br></br>
    </div>

    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Full Recipe</Accordion.Header>
        <Accordion.Body>
          <RecipeViewComponent />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Region</Accordion.Header>
        <Accordion.Body>
          <RegionViewComponent />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Recipe Creator</Accordion.Header>
        <Accordion.Body>
          <CreatorViewComponent />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Recipe Pairings</Accordion.Header>
        <Accordion.Body>
          <PairingViewComponent />
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

export default RecipeViewPage