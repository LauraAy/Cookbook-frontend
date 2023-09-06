import React, { useState, useEffect } from "react";
import RegionRecipeDataService from "../services/regionRecipe.service";
import { Link } from "react-router-dom";
import { Accordion, AccordionSummary, AccordionDetails, Autocomplete, Box, Button, Divider,  List, ListItem, ListItemButton,  
  ListItemIcon, ListItemText, Pagination, TextField,Typography, } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import usePagination from "../utils/pagination.util";
import { useNavigate } from 'react-router-dom';

const RegionRecipesAll = ({clickTitle, clickCreator})=> {
  
  //setup for data and search status
  const [regionRecipes, setRegionRecipes] = useState ([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [selectedRegion, setSelectedRegion] = useState("")
  const [searchActive, setSearchActive] = useState(false);
	const [countrySearch, setCountrySearch] = useState(false)
	const [currentRegionName, setCurrentRegionName] = useState("")

  const navigate = useNavigate()

  //retrieve recipes by region
    useEffect(() => {
    retrieveRegionRecipes();
  }, []);

  const retrieveRegionRecipes = () => {
    RegionRecipeDataService.getAllRegionRecipes()
    .then(response => {
      setRegionRecipes(response.data);
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };

  // const setActiveRecipe = (recipe, index) => {
  //   setCurrentRecipe(recipe);
  //   setCurrentIndex(index);
  // };


  //pagination functions
  let [page, setPage] = useState(1);
  const PER_PAGE = 5;
  const count = Math.ceil(regionRecipes.length / PER_PAGE);
  const _DATA = usePagination(regionRecipes, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

   //search functions for country and region
   const findByCountry = () => {
    const searchCountry = selectedRegion.country
    console.log(selectedRegion.country)

    RegionRecipeDataService.findByCountry(searchCountry)
    .then (response => {
      setRegionRecipes(response.data);
      setSearchActive(true)
      // setCountrySearch(true)
      setCurrentRecipe(null)
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };

  const findByRegion = () => {
    const searchRegionName = currentRegionName
    console.log(selectedRegion.regionName)
    RegionRecipeDataService.findByRegionName(searchRegionName)
    .then (response => {
      setRegionRecipes(response.data);
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
    retrieveRegionRecipes()
    setSearchActive(false)
    if ( countrySearch === true ) {
      setCountrySearch(false)
    }
  }

  return (
    <div>
    {searchActive ? (
      <Box>
        <Typography variant="h5" gutterBottom>
          Click to view full recipe.
        </Typography>
        <Box p="10" pt="3" spacing={2}>
          {_DATA &&
            _DATA.currentData().map(regionRecipe => {
            return (
            <>
              <Typography variant="h6">{regionRecipe.country}</Typography>
              <Accordion>
              <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Click to see Recipes</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
              
             
                {regionRecipe.recipe &&
                  regionRecipe.recipe.map((recipe, index) => (
                  <>
                    <List>
                      <ListItemButton onClick={() => handleListItemClick(recipe)}>
                        <ListItem key={recipe.id} >
                          <ListItemText
                            primary={recipe.title}
                            secondary={recipe.description}
                          />
                        </ListItem>
                        <Divider />
                      </ListItemButton>
                    </List>
                    
                  </>
                  )
                )}
                    </AccordionDetails>
                  </Accordion>
                
              
              </>
            );
          })}
        </Box>
        <Box m={4}>
          <Button variant="outlined" onClick={resetAll}>Return to all recipes</Button>
        </Box>
      </Box>
      ):(
      <div>
        <Typography variant="h4" gutterBottom>
          Recipes by Country 
        </Typography>
        <Typography variant="h5" gutterBottom>
          Search Recipes By Country Name
        </Typography>
        <Box m={4} sx={{ display: 'flex' }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options = {regionRecipes.map((regionRecipe) => regionRecipe)}
            getOptionLabel={(regionRecipe) => regionRecipe.country }
            onChange={(event, value) => setSelectedRegion(value)}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Search By Country" />}
          />
          <Box mx={2} mt={1}>
            <Button variant="contained" onClick={findByCountry}>Search</Button>
          </Box>
        </Box>
        <Box>
          <Typography variant="h5" gutterBottom>
            Search Recipes By Region Name
          </Typography>
          <Box m={4} sx={{ display: 'flex' }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options = {Array.from(new Set(regionRecipes.map((regionRecipe) => regionRecipe.regionName)))
                .map((regionName) => regionName)}
              getOptionLabel={(regionName) => regionName }
              onChange={(event, value) => setCurrentRegionName(value)}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Search By RegionName" />}
            />
            <Box mx={2} mt={1}>
              <Button variant="contained" onClick={findByRegion}>Search</Button>
            </Box>
          </Box>
          <Box>
            <Typography variant="h5" gutterBottom>
              Browse Recipes
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Click to See Full Recipe
            </Typography>
            <Box m={2}>
              <Button sx={{my:2, ml:2}} variant="outlined" onClick={() => clickTitle()}>filter by title</Button>
              <Button sx={{my:2, ml:2}} variant="outlined" onClick={() => clickCreator()}>filter by creator</Button>
            </Box>
            <Pagination
              count={count}
              size="large"
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
            />
            <Box p="10" pt="3" spacing={2}>
              {_DATA &&
                _DATA.currentData().map(regionRecipe => {
                  return (
                  <>
                    <Typography variant="h6">{regionRecipe.country}</Typography>
                    {regionRecipe.recipe &&
                      regionRecipe.recipe.map((recipe, index) => (
                        <List>
                          <ListItemButton onClick={() => handleListItemClick(regionRecipe)}>
                            <ListItem key={regionRecipe.id} >
                              <ListItemText
                                primary={recipe.title}
                                secondary={recipe.description}
                              />
                            </ListItem>
                            <Divider />
                          </ListItemButton>
                        </List>
                      )
                    )}
                  </>
                );
              })}
            </Box>
            <Pagination
              count={count}
              size="large"
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
            />
            <Box m={2}>
              <Button sx={{my:2, ml:2}} variant="outlined" onClick={() => clickTitle()}>filter by title</Button>
              <Button sx={{my:2, ml:2}} variant="outlined" onClick={() => clickCreator()}>filter by creator</Button>
            </Box>
          </Box>
        </Box>
      </div>
      )
    }
    </div>
  )
}
    {/* <div className="col-md-6">
			{countrySearch? (<h4>Recipes by Country</h4>)
			:(
			<div>
				<h4>Recipes by Region</h4>
				<h4>{currentRegionName}</h4>
				<br></br>
			</div>
			)}
  
    <div>
      {regionRecipes &&
      regionRecipes.map((regionRecipe) => (
      <div  key={regionRecipe.id}>
        <div>
          <h4>{regionRecipe.country}</h4>
        </div>
        <div>
          <ul>
            {regionRecipe.recipe &&
            regionRecipe.recipe.map((recipe, index) => (
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
    </div> */}


  export default RegionRecipesAll;