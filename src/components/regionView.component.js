import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import RecipeDataService from "../services/recipe.service";
import RegionRecipeDataService from "../services/regionRecipe.service";
import Accordion from 'react-bootstrap/Accordion';
import RecipeViewComponent from '../components/recipeView.component.js'

const RegionViewComponent = params => {
  const { id } = useParams();
  const [currentRecipe, setCurrentRecipe] = useState ([]);
  const [ region, setRegion] = useState ([])

const getRecipeRegions = id => {
    RegionRecipeDataService.getRecipeRegions(id)
    .then(response => {
      setCurrentRecipe(response.data);
      setRegion(response.data.region)
      console.log(response.data);
      console.log(region)
    })
    .catch(e => {
      console.log(e);
    });
  };
  
  useEffect(() => {
    if(id)
    getRecipeRegions(id);
  }, [id]);

return (
<>
  <div>
    {  region.length ? (
           <div >
           <h2>HOLA</h2>
           
           {region.map((region, index) => (
              <div key={index}>
                <h1> {region.country} </h1>
              </div>
           ))}
          </div>
        
    
    ):(   
        <h2>Add a Region now!</h2>
        
    )}
  </div>
</>

)}

export default RegionViewComponent