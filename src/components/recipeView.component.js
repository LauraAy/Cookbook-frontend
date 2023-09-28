import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import RecipeDataService from "../services/recipe.service";
import { Box, Button, Divider, Tooltip, Typography, } from '@mui/material';
import parser from "html-react-parser";

const RecipeViewComponent = props => {
  let navigate = useNavigate();

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

  //get current recipe
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

  //navigate to edit recipe
  const editRecipe = () => {
    navigate("/recipes/edit/" + currentRecipe.id)
  }

  return (
  <>
    <Box mx={4}>
      <Typography variant="h5">{currentRecipe.title}</Typography>
      <Typography variant="body1"sx={{ m: 1 }}>
        {currentRecipe.recipeType && (
        <>
          <strong>RecipeType: </strong>
          {currentRecipe.recipeType}
        </>
        )}
      </Typography>
      <Typography variant="body1"sx={{ m: 1 }}>
        {currentRecipe.servingSize && (
        <>
          <strong>Serving Size: </strong>
          {currentRecipe.servingSize}
        </>
        )}
      </Typography>
      <Typography variant="body1"sx={{ m: 1 }}>
        {currentRecipe.ingredients && (
        <>
          <strong>Ingredients: </strong>
          {parser(currentRecipe.ingredients)}
        </>
        )}
      </Typography>
      <Typography variant="body1"sx={{ m: 1 }}>
        {currentRecipe.directions && (
        <>
          <strong>Directions: </strong>
          {parser(currentRecipe.directions)}
        </>
        )}
      </Typography>
      <Divider></Divider>
    </Box>

    <Tooltip title="Edit this recipe.">
      <Button
        onClick={editRecipe}
        sx={{my: 2, mx: 4}}
        variant="outlined"
      >
        Edit Recipe
      </Button>
    </Tooltip>
  </>
)}

export default RecipeViewComponent