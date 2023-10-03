import React, { useState, Fragment, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Paper, Box, Button, FormControl, Grid, Item, Stack, TextField, Typography } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import RecipeDataService from "../services/recipe.service";
import RegionDataService from "../services/region.service";
import RegionRecipeDataService from "../services/regionRecipe.service";
import { NavItem } from "react-bootstrap";

const RegionAddComponent = () => { 
const { id } = useParams();
let navigate = useNavigate();

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

const initialRegionRecipeState = {
    regionId: null,
    recipeId: null
}

const [regions, setRegions] = useState([]);
const [currentRecipe, setCurrentRecipe] = useState(initialRecipeState);
const [regionId, setRegionId] = useState()
const [currentRegion, setCurrentRegion] = useState ()
const [regionRecipe, setRegionRecipe] = useState(initialRegionRecipeState);
const [submitted, setSubmitted] = useState(false)

//retrieve recipe and regions for dropdown
useEffect(() => {
    retrieveRecipe(id);
    retrieveRegions();
  }, []);

  const retrieveRecipe = id => {
    RecipeDataService.get(id)
      .then(response => {
        setCurrentRecipe(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e)
      });
  };

  const retrieveRegions = () => {
    RegionDataService.getAll()
    .then(response => {
      setRegions(response.data);
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };

  //react-hook-form functions
  const {
    register,
    formState: { errors }
  } = useForm();
  
  //retrieve region selected from dropdown
  const retrieveRegion = id => {
    RegionDataService.get(id)
      .then(response => {
        setCurrentRegion(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e)
      });
  };

  //save regionId to recipe
  const saveRegionRecipe = () => {
    var data = {
      regionId: currentRegion.id,
      recipeId: currentRecipe.id
    };

    RegionRecipeDataService.create(data)
      .then(response => {
        setRegionRecipe({
            regionId: response.data.regionId,
            recipeId: response.data.regionid
        })
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });

  };

  //retrieve regionId from dropdown selection and run retrieveRegion function
  const handleRegionChange = async (event, option) => {
    setRegionId(option.id);
    console.log(option.id)
  }
  useEffect(()=>{
    console.log(regionId)
    retrieveRegion(regionId)
  }, [regionId])

  //nav functions
  const returnRecipe = () => {
    navigate("/recipes/" + id)
    setSubmitted(false)
  }

  const addAnotherRegion = () => {
    setCurrentRegion(false);
    setSubmitted(false);
  }

  const addCreator = () => {
    navigate("/creators/add/" + id)
  }

  const addPairing = () => {
    navigate("/pairings/add/" + id)
  }

  return (
  <>
    { submitted ? (
    <>
      <Box m={2}>
        <Typography variant="h6" >You've added {currentRegion.country} to {currentRecipe.title}!</Typography> 
      </Box>
      <Box m={2}>
        <Button variant="contained" onClick={returnRecipe}>View Recipe Page</Button>
      </Box>
      <Button sx={{my: 2, ml: 2}} variant="outlined" onClick={addAnotherRegion}>Add Another Region</Button>
      <Button sx={{my: 2, ml: 2}}variant="outlined" onClick={addCreator}>Add a Recipe Creator</Button>
      <Button sx={{my: 2, ml: 2}} variant="outlined" onClick={addPairing}>Add a Recipe Pairing</Button>
    </>
    ):(
    <>
      {currentRegion? (
      <>
        <Box mt={2} ml={'10%'} mr={'10%'} mb={2}>
          <Typography variant="h4">
            Selected Region
          </Typography>
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }} display="inline">
              Country:&nbsp;
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'regular' }} display="inline">
              {currentRegion.country}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }} display="inline">
              Region:&nbsp; 
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'regular' }} display="inline">
              {currentRegion.regionName}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }} display="inline">
              Latitude:&nbsp; 
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'regular' }} display="inline">
              {currentRegion.lat}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }} display="inline">
              Longitude:&nbsp; 
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'regular' }} display="inline">
              {currentRegion.lng}
            </Typography>
          </Box>
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={saveRegionRecipe}
            >
              Add Region to {currentRecipe.title}
            </Button>
          </Box>
        </Box>
        <Box mr={'10%'} ml={'10%'}>
          <Typography variant="h6">Or select a different country from the dropdown.</Typography>
          <Autocomplete
            fullWidth
            disablePortal
            disableClearable
            onChange={handleRegionChange}
            id="recipeType"
            options={regions.map((option) => option)}
            getOptionLabel={(option) => option.country}
            renderInput={(option) => (
              <TextField
                {...option}
                label="Country"
                InputProps={{
                ...option.InputProps,
                type: 'search',
                }}
                {...register('region')}
              />
            )}
          />
        </Box>
      </>
      ): (
      <>
        <Box mr={'10%'} ml={'10%'} mt={2}>
          <Typography variant="h6">Please select a country from the dropdown.</Typography>
          <Autocomplete
            fullWidth
            disablePortal
            disableClearable
            onChange={handleRegionChange}
            id="recipeType"
            options={regions.map((option) => option)}
            getOptionLabel={(option) => option.country}
            renderInput={(option) => (
              <TextField
                {...option}
                label="Country"
                InputProps={{
                ...option.InputProps,
                type: 'search',
                }}
                {...register('region')}
              />
            )}
          /> 
        </Box>
      </>
      )} 
    </>
    )}
  </>
  )
}

export default RegionAddComponent;