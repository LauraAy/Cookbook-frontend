import React, { useState, Fragment, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Paper, Box, Button, FormControl, Stack, TextField, Typography } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import RecipeDataService from "../services/recipe.service";
import RegionDataService from "../services/region.service";
import RegionRecipeDataService from "../services/regionRecipe.service";

const filter = createFilterOptions();

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


useEffect(() => {
    retrieveRegions();
    retrieveRecipe(id);
  }, []);

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

  const retrieveRecipe = id => {
    RecipeDataService.get(id)
      .then(response => {
        setCurrentRecipe(response.data);
        console.log(response.data);
        console.log(currentRecipe.id);
      })
      .catch(e => {
       
      });
  };

  const retrieveRegion = id => {
    RegionDataService.get(id)
      .then(response => {
        setCurrentRegion(response.data);
        console.log(response.data);
      })
      .catch(e => {
       
      });
  };

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

  const handleRegionChange = async (event, option) => {
    setRegionId(option.id);
    console.log(option.id)
  }
  useEffect(()=>{
    console.log(regionId)
    retrieveRegion(regionId)
  }, [regionId])

   //validation functions
   const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('title is required')
    });
  
    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm({
      defaultValues: { "servingSize": null, "recipeType": ""},
      resolver: yupResolver(validationSchema)
    });

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
    navigate("/creators/add/:id")
  }

  const addPairing = () => {
    navigate("/pairings/add/:id")
  }

return (
<div>
  { submitted ? (
    <div>
      <Typography variant="h6" >You've added {currentRegion.country} to {currentRecipe.title}!</Typography> 
      <br></br>
      <br></br>
      <Button onClick={returnRecipe}>View Recipe Page</Button>
      <br></br>
      <br></br>
      <Button onClick={addAnotherRegion}>Add Another Region</Button>
      <Button onClick={addCreator}>Add a Recipe Creator</Button>
      <Button onClick={addPairing}>Add a Recipe Pairing</Button>
    </div>
    ):(
    <div>
      {currentRegion? (
        <div>
          <h4>Region</h4>
          <div>
            <label>
              <strong>Region</strong>
            </label>{" "}
            {currentRegion.regionName}
          </div>
          <div>
            <label>
              <strong>Country</strong>
            </label>{" "}
            {currentRegion.country}
          </div>
          <div>
            <label>
              <strong>Latitude:</strong>
            </label>{" "}
            {currentRegion.lat}
          </div>
          <div>
            <label>
              <strong>Longitude:</strong>
            </label>{" "}
            {currentRegion.long}
          </div> 
          <br></br>
          <br></br>
          <div>
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
            <br></br>
            <br></br>
            <Button onClick={saveRegionRecipe}>
              Add Region
            </Button>
          </div>
        </div>
        ): (
        <div>
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
        </div>
      )} 
    </div>
  )}
</div>
)}

export default RegionAddComponent;