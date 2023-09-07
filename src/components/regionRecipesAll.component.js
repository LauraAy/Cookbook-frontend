import React, { useState, useEffect } from "react";
import RegionRecipeDataService from "../services/regionRecipe.service";
import { Autocomplete, Box, Button, Divider,  List, ListItem, ListItemButton,  
  ListItemText, Pagination, TextField, Typography, } from '@mui/material';
import usePagination from "../utils/pagination.util";
import { useNavigate } from 'react-router-dom';

const RegionRecipesAll = ({clickTitle, clickCreator})=> {
  
  //setup for data and search status
  const [regionRecipes, setRegionRecipes] = useState ([]);
  const [regionRecipesCountry, setRegionRecipesCountry] = useState([]);
  const [regionRecipesRegion, setRegionRecipesRegion] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
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

  //pagination functions for regionRecipes
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
      setRegionRecipesCountry(response.data);
      setSearchActive(true)
      setCountrySearch(true)
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
      setRegionRecipesRegion(response.data);
      setSearchActive(true)
      setCurrentRecipe(null)
      console.log(response.data.recipe);
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
  <>
    {searchActive ? (
    <>
      {countrySearch ? (
      <>
        <Box p="10" pt="3" spacing={2}>
          {regionRecipesCountry &&
            regionRecipesCountry.map(regionRecipe => {
            return (
            <>
              <Typography variant="h5">Recipes from {selectedRegion.country}</Typography>
              <Typography variant="subtitle1">
                Scroll to see all recipes for this country. 
                Click on a title to see full recipe.
              </Typography>
              <List
                sx={{
                  width: '100%',
                  maxWidth: 480,
                  bgcolor: 'background.paper',
                  position: 'relative',
                  overflow: 'auto',
                  maxHeight: 500, 
                  '& ul': { padding: 0 }
                }}
              >
                {regionRecipe.recipe &&
                  regionRecipe.recipe.map((recipe, index) => (
                    <ListItemButton onClick={() => handleListItemClick(recipe)}>
                      <ListItem key={recipe.id} >
                        <ListItemText
                          primary={recipe.title}
                          secondary={recipe.description}
                        />
                      </ListItem>
                      <Divider />
                    </ListItemButton>
                  )
                )}
              </List>
            </>
            );
          })}
        </Box>
        <Box m={4}>
          <Button variant="outlined" onClick={resetAll}>Return to all recipes</Button>
        </Box>
      </>
      ):(
      <>
        <Box p="10" pt="3" spacing={2}>
          <Typography variant="h5">Recipes from {currentRegionName}</Typography>
          <Typography variant="subtitle1">
            Scroll to see all recipes for this country. 
            Click on a title to see full recipe.
          </Typography>
          <List
            sx={{
              width: '100%',
              maxWidth: 480,
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              maxHeight: 500, 
              '& ul': { padding: 0 }
            }}
          >
            {regionRecipesRegion &&
              regionRecipesRegion.map(regionRecipe => {
              return (
              <>
                {regionRecipe.recipe &&
                  regionRecipe.recipe.map((recipe, index) => (
                  <>
                    <ListItemButton onClick={() => handleListItemClick(recipe)}>
                      <ListItem key={recipe.id} >
                        <ListItemText
                          primary={recipe.title}
                          secondary={recipe.description}
                        />
                      </ListItem>
                      <Divider />
                    </ListItemButton>
                  </>
                  )
                )} 
              </>
              );
            })}
          </List>
        </Box>
        <Box m={4}>
          <Button variant="outlined" onClick={resetAll}>Return to all recipes</Button>
        </Box>
      </>
      )}
    </>
    ):(
    <>
      <Box p="10" pt="3" spacing={2}>
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
                    <Typography variant="subtitle1">
                      Scroll to see all recipes for this country. 
                      Click on a title to see full recipe.
                    </Typography>
                    <List
                      sx={{
                        width: '100%',
                        maxWidth: 480,
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 300, 
                        '& ul': { padding: 0 }
                      }}
                    >
                      {regionRecipe.recipe &&
                        regionRecipe.recipe.map((recipe, index) => (    
                          <ListItemButton onClick={() => handleListItemClick(regionRecipe)}>
                            <ListItem key={regionRecipe.id} >
                              <ListItemText
                                primary={recipe.title}
                                secondary={recipe.description}
                              />
                            </ListItem>
                            <Divider />
                          </ListItemButton>
                        )
                      )}
                    </List>
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
      </Box>
    </>  
    )}
  </>
  )
}

export default RegionRecipesAll;