import React, { useState, useEffect } from "react";
import recipeDataService from "../services/recipe.service";
import { Link } from "react-router-dom";
import { Autocomplete, TextField, Pagination, Box, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Divider } from '@mui/material';
import usePagination from "../utils/pagination.util";
import { useNavigate } from 'react-router-dom';


const RecipesAll = ()=> {
  //variables for set data and search status
  const [recipes, setRecipes] = useState ([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  const navigate = useNavigate()

  
  //retrieve recipe function and useEffect to run retrieve recipes on load
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

  //variables for set up pagination
  let [page, setPage] = useState(1);
  const PER_PAGE = 10;
  const count = Math.ceil(recipes.length / PER_PAGE);
  const _DATA = usePagination(recipes, PER_PAGE);

  //pagination function 
    const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  //title search
  const findByTitle = () => {
    const searchTitle = selectedRecipe.title
    console.log(selectedRecipe.title)
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

  //List select function
  const handleListItemClick = (recipe) => {
    const recipeId = recipe.id
    
    navigate("/recipes/" + recipeId)
  };

  //reset to initial state
  const resetAll = () => {
    retrieveRecipes()
    setSearchActive(false)
  }

  return (
  <div>
    <h1>All Recipes</h1>
    <div>
      <h2>Search Recipes By Title</h2>
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
              onChange={(event, value) => setSelectedRecipe(value)}
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
    <Box p="5">
      <h2>Browse Recipes</h2>
      <h3>Click to See Full Recipe</h3>
      <Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />

      <List p="10" pt="3" spacing={2}>
        {_DATA &&
          _DATA.currentData().map(recipe => {
          return (
          <>
            <ListItemButton 
          onClick={() => handleListItemClick(recipe)}>
              <ListItem key={recipe.id} listStyleType="disc">
                <strong>{recipe.title}:&nbsp;</strong>{" "}
                <span> {recipe.description}</span>{" "}
              </ListItem>
            </ListItemButton>
            <Divider />
          </>
          );
        })}
      </List>
      <Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    </Box>
  </div>
  )
}

export default RecipesAll;