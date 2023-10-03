import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Paper, Box, Button, FormControl, TextField, Typography } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import RecipeDataService from "../services/recipe.service";
import CreatorDataService from "../services/creator.service";
import CreatorRecipeDataService from "../services/creatorRecipe.service";
import { useParams, useNavigate } from 'react-router-dom';

const filter = createFilterOptions();

const CreatorAddComponent = () => { 
  const { id } = useParams();
  let navigate = useNavigate();

  const initialCreatorState = {
    id: null,
    creatorName: "",
    about: "",
    link: ""
  };

  const initialCreatorRecipeState = {
    creatorId: null,
    recipeId: null
  }

  const [creators, setCreators] = useState([]);  
  const [creator, setCreator] = useState(initialCreatorState);
  const [added, setAdded] = useState(false);
  const [currentCreator, setCurrentCreator] = useState(initialCreatorState)
  const [currentCreatorId, setCurrentCreatorId] = useState()
  const [currentRecipe, setCurrentRecipe] =useState ([]);
  const [creatorRecipe, setCreatorRecipe] = useState (initialCreatorRecipeState);
  const [selected, setSelected] = useState (false)
  const [submitted, setSubmitted] = useState(false);
 
  const [createNew, setCreateNew] = useState(false)
  
  //retrieve recipe and creators
  useEffect(() => {
    retrieveRecipe(id);
    retrieveCreators();
  }, []);

  const retrieveRecipe = id => {
    RecipeDataService.get(id)
    .then(response => {
      setCurrentRecipe(response.data);
      console.log(response.data);
    })
    .catch(e => {   
    });
  };

  const retrieveCreators = () => {
    CreatorDataService.getAll()
    .then(response => {
      setCreators(response.data);
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };

  //react-hook-form and yup functions
  const validationSchema = Yup.object().shape({
    creatorName: Yup.string()
      .required('Creator name is required.'),
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
  
  });
  
  const onSubmit = (data) => {
    console.log(data);
  };

  //create new creator set to true
  const goCreate = () => {
    setCreateNew(true)
  }

  //save creator from form
  const saveCreator = (formData) => {
    var data = {
      creatorName: formData.creatorName,
      about: formData.about,
      link: formData.link
    };

    CreatorDataService.create(data)
    .then(response => {
      setCreator({
        id: response.data.id,
        creatorName: response.data.creatorName,
        about: response.data.about,
        link: response.data.link
      });
      setSubmitted(true);
      setCreator(response.data)
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };

  //attach creator created from form to recipe
  const saveCreatorRecipe = () => {
    var data = {
      creatorId: creator.id,
      recipeId: currentRecipe.id
    };
    
    CreatorRecipeDataService.create(data)
    .then(response => {
      setCreatorRecipe({
        creatorId: response.data.creatorId,
        recipeId: response.data.recipeId
      })
      setAdded(true)
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  }

  //retrieve creator from id based on dropdown selection
  const retrieveCreator = id => {
    CreatorDataService.get(id)
    .then(response => {
      setCreator(response.data);
      setSelected(true)
      console.log(response.data);
    })
    .catch(e => {   
      console.log(e)
    });
  };

  //retrieve creatorId from dropdown selection and run retrieveCreator function
  const handleCreatorChange = async (event, option) => {
    setCurrentCreatorId(option.id);
    console.log(option.id)
  }
  useEffect(()=>{
    console.log(currentCreatorId)
    retrieveCreator(currentCreatorId)
  }, [currentCreatorId])

  //attach creator selected from dropdown to recipe
  const saveCreatorRecipeDropdown = () => {
    var data = {
      creatorId: creator.id,
      recipeId: currentRecipe.id
    };
    
    CreatorRecipeDataService.create(data)
    .then(response => {
      setCreatorRecipe({
        creatorId: response.data.creatorId,
        recipeId: response.data.recipeId
      })
      setAdded(true)
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  }
  
  //Reset form for new creator
  const newCreator = () => {
    setCreator(initialCreatorState);
    setCurrentCreator(initialCreatorState)
    setCreateNew(false);
    setSelected(false);
    setAdded(false);
    setSubmitted(false);
  };
  
  //navigate to recipe page
  const returnRecipe = () => {
    navigate("/recipes/" + id)
  }


  //navigate to add a new region
  const addRegion = () => {
    navigate("/regions/add/:id")
  }

  //navigate to add a new pairing
  const addPairing = () => {
    navigate("/pairings/add/:id")
  }

  return(
  <>
    { added ? (
    <>
      <Paper>
        <Box m={2}>
          <Typography variant="h4">You've added {creator.creatorName} to {currentRecipe.title}</Typography>
        </Box>
        <Box m={2}>
          <Button variant="contained" onClick={returnRecipe}>View Recipe Page</Button>
        </Box>
        <Button sx={{my: 2, ml: 2}} variant="outlined" onClick={newCreator}>Add Another Creator</Button>
        <Button sx={{my: 2, ml: 2}} variant="outlined" onClick={addRegion}>Add a Region</Button>
        <Button sx={{my: 2, ml: 2}} variant="outlined" onClick={addPairing}>Add a Recipe Pairing</Button>
      </Paper>
    </>
    ):(
    <>
      { createNew ? (
      <>
        {submitted ? (
        <>
          <Typography variant="h4">You've created {creator.creatorName}</Typography>
          <Typography variant="h6">Add this recipe creator to {currentRecipe.title}.</Typography>
          <Button sx={{my: 1, ml: 2}} variant="contained" color="primary" onClick={saveCreatorRecipe}>
            Add
          </Button>
        </>      
        ):(
        <>
          <Typography variant="h6" align="center" margin="dense">
            Create a New Recipe Creator
          </Typography>
          <Box sx={{ ml: "10%", mr: "10%" }}>
            <FormControl fullWidth>
              <TextField
                sx={{ mt: 2, mb: 2 }}
                required
                id="creatorName"
                name="creatorName"
                label="creatorName"
                placeholder="creatorName"
                defaultValue=""
                fullWidth
                margin="dense"
                {...register('creatorName')}
                error={errors.creatorName ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.creatorName?.message}
              </Typography>
            </FormControl>
            <TextField
              sx={{ mb: 2 }}
              id="outlined-multiline-static"
              defaultValue=""
              name="about"
              label="About"
              placeholder="About"
              fullWidth
              margin="dense"
              multiline
              rows={2}
              {...register('about')}
            />
            <TextField
              sx={{ mb: 2 }}
              id="outlined-multiline-static"
              defaultValue=""
              name="link"
              label="Link"
              placeholder="Link"
              fullWidth
              margin="dense"
              rows={2}
              {...register('link')}
            />
            <Button onClick= {handleSubmit(onSubmit)}>
              submit
            </Button>
            <Box mt={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(saveCreator)}
              >
                Create Recipe Creator
              </Button>
            </Box>
          </Box>
        </>
        )}
      </>
      ):(
      <>
        { selected ? (
        <>
          <Box mt={2} ml={'10%'} mr={'10%'} mb={2}>
            <Typography variant="h4">
              {creator.creatorName}
            </Typography>
            <Box mt={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={saveCreatorRecipe}
              >
                Add Creator to {currentRecipe.title}
              </Button>
            </Box>
          </Box>
          <Box mx={'10%'} my={2}>
            <Typography variant="h6">Or select a different creator from the dropdown.</Typography>
            <Autocomplete
              fullWidth
              disablePortal
              disableClearable
              onChange={handleCreatorChange}
              id="recipeType"
              options={creators.map((option) => option)}
              getOptionLabel={(option) => option.creatorName}
              renderInput={(option) => (
                <TextField
                  {...option}
                  label="Recipe Creator"
                  InputProps={{
                  ...option.InputProps,
                  type: 'search',
                  }}
                  {...register('creator')}
                />
              )}
            />
          </Box>
        </>
        ):(
        <>
          <Box mr={'10%'} ml={'10%'} mt={2}>
            <Typography variant="h6">Please select a recipe creator from the dropdown.</Typography>
            <Box mt={1}>
              <Autocomplete
                fullWidth
                disablePortal
                disableClearable
                onChange={handleCreatorChange}
                id="recipeType"
                options={creators.map((option) => option)}
                getOptionLabel={(option) => option.creatorName}
                renderInput={(option) => (
                  <TextField
                    {...option}
                    label="Recipe Creator"
                    InputProps={{
                      ...option.InputProps,
                      type: 'search',
                    }}
                    {...register('region')}
                  />
                )}
              />
            </Box>
          </Box>
          <Box mr={'10%'} ml={'10%'} mt={6}>
            <Typography variant="h6">Or create a new Recipe Creator.</Typography>
            <Box mt={1}>
              <Button variant="contained" color="primary" onClick={goCreate}>New Creator</Button>
            </Box>
          </Box>
        </>
        )}
      </>
      )}
    </>
    )}
  </>
  )
}

export default CreatorAddComponent;