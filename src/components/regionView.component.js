import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RegionRecipeDataService from "../services/regionRecipe.service";
import { Box, Button, Divider, Grid, Tooltip, Typography, } from '@mui/material';
 import { Delete } from  '@mui/icons-material';

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
      <Box mt={2}>
        <Typography variant="h6" mx={4}>{region.country}</Typography>
        <Box mx={4} mb={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
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
            </Grid>
            <Grid item xs={12} sm={4}>
              <Tooltip title="Remove this region from recipe.">
                <Button 
                  onClick={() => {removeRegion(region.id)}}
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                >
                  Remove
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
        <Divider></Divider>
      </Box>
      )}
      <Tooltip title="Add another region to this recipe.">
        <Button 
          onClick={goAddRegion}
          variant="outlined"
          sx={{ m: 2 }}
        >
          Add Another Region
        </Button>
      </Tooltip>
    </>
    ):(
    <>
      <Typography variant="h6">Add a region for this recipe now!</Typography>
      <Tooltip title="Add a region to this recipe.">
      <Typography variant="subtitle1">Where in this world is this recipe from? Add the region or 
      regions where this recipe originated.</Typography>
        <Button 
          onClick={goAddRegion}
          variant="contained"
          sx={{ m: 2 }}
        >
          Add Region
        </Button>
      </Tooltip>
    </>
    )}
  </>
  )
}

export default RegionViewComponent