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
  const [currentCreator, setCurrentCreator] = useState(initialCreatorState)
  const [currentCreatorId, setCurrentCreatorId] = useState()
  const [currentRecipe, setCurrentRecipe] =useState ([]);
  const [creatorRecipe, setCreatorRecipe] = useState (initialCreatorRecipeState);
  const [selected, setSelected] = useState (false)
  const [submitted, setSubmitted] = useState(false);
  const [added, setAdded] = useState(false);
  const [createNew, setCreateNew] = useState(false)
  
  //retrieve recipe and creators
  useEffect(() => {
    retrieveCreators();
    retrieveRecipe(id);
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
    
  // //form input to create creator
  // const handleInputChange = event => {
  //   const { name, value } = event.target;
  //   setCreator({ ...creator, [name]: value });
  // };

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
      setCurrentCreatorId(response.data.id)
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };

  //attach creator created from form to recipe
  const saveCreatorRecipe = () => {
    var data = {
      creatorId: currentCreator.id,
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

  //retrieve currentCreator from id based on dropdown selection
  const retrieveCurrentCreator = id => {
    CreatorDataService.get(id)
    .then(response => {
      setCurrentCreator(response.data);
      console.log(response.data);
    })
    .catch(e => {   
      console.log(e)
    });
  };

  const retrieveCreator= id => {
    RegionDataService.get(id)
      .then(response => {
        setCurrentCreator(response.data);
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
      creatorId: currentCreator.id,
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

  //create new creator set to true
  const goCreate = () => {
    setCreateNew(true)
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

  //switch to add a new creator
  const addAnotherCreator = () => {
    newCreator()
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
    <div>
      { added ? (
        <div>
          <h4>You've added {creator.creatorName} to {currentRecipe.title}</h4>
          <br></br>
          <br></br>
          <button onClick={returnRecipe}>View Recipe Page</button>
          <br></br>
          <br></br>
          <button onClick={addAnotherCreator}>Add Another Creator</button>
          <button onClick={addRegion}>Add a Region</button>
          <button onClick={addPairing}>Add a Recipe Pairing</button>
        </div>
      ):(
        <div>
          { createNew ? (
            <div className="submit-form">
              {submitted ? (
                <div>
                  <h2>Success!</h2>
                  <div>
                    <h4>{creator.creatorName}</h4>
                  </div>
                  <button onClick={saveCreatorRecipe}>Add this recipe creator to {currentRecipe.title}.</button>
                </div>
              ):(
              <>
                <Typography variant="h6" align="center" margin="dense">
                  Create a New Recipe
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
              
                  <br></br>
                  <br></br>
                  <button onClick={saveCreator} className="btn btn-success">
                    Submit
                  </button>
                </Box>
              </>
               
              )}
            </div>
          ):(
            <div>
              { selected ? (
                <div>
                  <h1>{currentCreator.creatorName}</h1>
                  <button onClick={saveCreatorRecipeDropdown}>Add this creator to recipe</button>
                </div>
              ):(
              <>
                <Box mr={'10%'} ml={'10%'} mt={2}>
                  <Typography variant="h6">Please select a country from the dropdown.</Typography>
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
            
              
                  <br></br>
                  <br></br>
                  <p>Or create a new Recipe Creator</p>
                  <button onClick={goCreate}>Create New Recipe Creator</button>
              </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )}

export default CreatorAddComponent;