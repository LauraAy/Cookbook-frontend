import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RegionRecipeDataService from "../services/regionRecipe.service";
import { Autocomplete, Box, Button, Divider,  List, ListItem, ListItemButton,  
  ListItemText, Pagination, TextField, Typography, } from '@mui/material';

const RegionViewComponent = params => {
  const { id } = useParams();
  let navigate = useNavigate(); 
  const [currentRecipe, setCurrentRecipe] = useState ([]);
  const [ region, setRegion] = useState ([])

  //get regions for current recipe
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

  //navigate to add region page
  const goAddRegion = () => {
    navigate("/regions/add/" + id)
  }

  //refresh
  const refreshPage = () => {
    navigate(0);
  }

  //delete region
  const removeRegion = currentRegionId => {
    const recipeId = currentRecipe.id
    const regionId = currentRegionId

    RegionRecipeDataService.removeRegion(recipeId, regionId)
    .then(response => {
     console.log(response.data)
      refreshPage()
    })
    .catch(e => {
      console.log(e)
    })
  } 

  return (
  <>
    {region.length ? (
    <>
      {region.map((region) => 
      <>
        <Typography variant="h6" mx={4}>{region.country}</Typography>
        <Box mx={4} mb={4}>
          <Typography variant="body1"sx={{ m: 1 }}>
            {region.regionName && (
            <>
              <strong>Region: </strong>
              {region.regionName}
            </>
            )}
          </Typography>
          <Typography variant="body1"sx={{ m: 1 }}>
            {region.subRegion && (
            <>
              <strong>Sub Region: </strong>
              {region.subRegion}
            </>
            )}
          </Typography>
          <Typography variant="body1"sx={{ m: 1 }}>
            {region.intermediateRegion && (
            <>
              <strong>Intermediate Region: </strong>
              {region.intermediateRegion}
            </>
            )}
          </Typography>
          <Typography variant="body1"sx={{ m: 1 }}>
            {region.lat && (
            <>
              <strong>Latitude: </strong>
              {region.lat}
            </>
            )}
          </Typography>
          <Typography variant="body1"sx={{ m: 1 }}>
            {region.lng && (
            <>
              <strong>Longitude: </strong>
              {region.lng}
            </>
            )}
          </Typography>
          <Typography variant="body1"sx={{ m: 1 }}>
            {region.countryCode && (
            <>
              <strong>Country Code: </strong>
              {region.countryCode}
            </>
            )}
          </Typography>
          <Button 
            onClick={() => {removeRegion(region.id)}}
            variant="contained"
            color="error"
          >
            Remove from Recipe
          </Button>
        <Divider></Divider>
        </Box>
        </>
      )}
      <Button 
        onClick={goAddRegion}
        variant="contained"
      >
        Add Another Region
      </Button>
   
    </>
    ):(
    <>
    </>
    )}
  </>
  )
}

export default RegionViewComponent