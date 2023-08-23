import React, { useState, Fragment, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Paper, Box, Grid, Button, FillledInput, OutlinedInput, InputLabel, InputAdornment, 
  IconButton, FormHelperText, FormControl, FormControlLabel, Checkbox, TextField, Typography,
  Stack} from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Visibility, VisibilityOff,} from '@mui/icons-material';
import RecipeDataService from "../services/recipe.service";
import AuthService from "../services/auth.service.js";

const filter = createFilterOptions();


const RecipeAddComponent = () => { 
  const currentUser = AuthService.getCurrentUser();
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


  const [recipes, setRecipes] = useState ([]);
  const [recipe, setRecipe] = useState(initialRecipeState);
  const [recipeTypes, setRecipeTypes] = useState ([])
  // const [recipeTypeClean, setRecipeTypeClean] = useState([])
  const [submitted, setSubmitted] = useState(false);
  const [userId, setUserId] = useState(currentUser.id);
  const [value, setValue] = React.useState(null);

  useEffect(() => {
    retrieveRecipes();
  }, []);

  const retrieveRecipes = () => {
    RecipeDataService.getAll()
    .then(response => {
      setRecipes(response.data);
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };


   //validation functions
   const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('title is required')
    });
  
    const {
      register,
      control,
      handleSubmit,
      formState: { errors }
    } = useForm({
      resolver: yupResolver(validationSchema)
    });


 
  
  const handleInputChange = event => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };
  
  const saveRecipe = (formData) => {
    var data = {
      title: formData.title,
      description: formData.description,
      recipeType: formData.recipeType,
      servingSize: formData.servingSize,
      ingredients: formData.ingredients,
      directions: formData.directions,
      source: formData.source,
      userId: userId,
    };

    RecipeDataService.create(data)
    .then(response => {
      setRecipe({
        id: response.data.id,
        title: response.data.title,
        description: response.data.description,
        recipeType: response.data.recipeType,
        servingSize: response.data.servingSize,
        ingredients: response.data.ingredients,
        directions: response.data.directions,
        source: response.data.source,
        userId: response.data.userId,
        
      });
      setSubmitted(true);
      setRecipe(response.data)
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
};

// const recipeTypesClean = Array.from(recipes.filter((recipes) => recipes.recipeType !== ''))

const filRecipes = recipes.filter((recipes) => recipes.recipeType !== '')

const filAlphaRecipes = filRecipes.sort()

// const filAlphaRecipes = filRecipes.map((filAlpha) => {
//   const firstLetter = filAlpha.recipeType[0].toUpperCase();
//   return {
//     firstLetter: /[0-9]/.test(firstLetter) ? 'o-9' : firstLetter, 
//     ...filAlpha
//   }
// })

const cleanRecipes = Array.from(new Set(filAlphaRecipes.map((filAlphaRecipe) => filAlphaRecipe.recipeType)))
  .map((option) => (option))

const options = cleanRecipes.sort()

// const options = top100Films.map((option) => {
//   const firstLetter = option.title[0].toUpperCase();
//   return {
//     firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
//     ...option,
//   };
// });

// const options = Array.from(new Set(filteredRecipes.map((filteredRecipe) => filteredRecipe.recipeType)))
//   .map((option) => {
//   const firstLetter = option[0].toUpperCase();
//   return {
//     firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
//     ...option,
//   };
// });

const runTest = () => {
  console.log(options)

}

// options = {Array.from(new Set(regionRecipes.map((regionRecipe) => regionRecipe.regionName)))
//   .map((regionName) => regionName)}


const newRecipe = () => {
    setRecipe(initialRecipeState);
    setSubmitted(false);
    window.location.reload(false);
  };


return (
    <div>
      {submitted ? (
        <div>
          <h4>Recipe Created!</h4>
          <div>
            {recipe.id}
            <br></br>
            {recipe.title}
          </div>
          <Link
            to={"/recipes/" + recipe.id}
          >
          <button>View Recipe</button>
          </Link>
          <button onClick={newRecipe}>Add Another Recipe</button>
        </div>
        ):(
        <div>
          <Fragment>
            <Paper>
              <Typography variant="h6" align="center" margin="dense">
                Create a New Recipe
              </Typography>
              <Box sx={{ ml: "10%", mr: "10%" }}>
                <FormControl fullWidth>
                  <TextField
                    sx={{ mt: 2, mb: 2 }}
                    required
                    id="title"
                    name="title"
                    label="Title"
                    placeholder="Title"
                    defaultValue=""
                    fullWidth
                    margin="dense"
                    {...register('title')}
                    error={errors.title ? true : false}
                  />
                  <Typography variant="inherit" color="textSecondary">
                    {errors.username?.message}
                  </Typography>
                </FormControl>
                <TextField
                  sx={{ mt: 2, mb: 2 }}
                  id="outlined-multiline-static"
                  defaultValue=""
                  name="description"
                  label="Recipe Description"
                  placeholder="Recipe Description"
                  fullWidth
                  margin="dense"
                  multiline
                  rows={2}
                  {...register('description')}
                />

{/* <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            title: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            title: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.title);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            title: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option.recipeType === 'string') {
          return option.recipeType;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.recipeType;
      }}
      renderOption={(props, option) => <li {...props}>{option.recipeType}</li>}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label="Free solo with text demo" />
      )}
    /> */}

                <Stack spacing={2} >
                  <Autocomplete
                    freeSolo
                    fullWidth
                    id="recipeType"
                    disableClearable
                    options={options.map((option) => option)}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Recipe Type"
                        InputProps={{
                        ...params.InputProps,
                        type: 'search',
                        }}
                        {...register('recipeType')}
                      />
                    )}
                  />
                </Stack> 
              <TextField
                    sx={{ mt: 2, mb: 2 }}
                    id="servingSize"
                    defaultValue=""
                    name="servingSize"
                    label="Serving Size"
                    placeholder="Serving Size"
                    fullWidth
                    margin="dense"
                    {...register('servingSize')}
                  />
                  <TextField
                    sx={{ mt: 2, mb: 2 }}
                    id="outlined-multiline-static"
                    defaultValue=""
                    name="ingredients"
                    label="Ingredients"
                    placeholder="ingredients"
                    fullWidth
                    margin="dense"
                    multiline
                    rows={4}
                    {...register('ingredients')}
                  />
                  <TextField
                    sx={{ mt: 2, mb: 2 }}
                    id="outlined-multiline-static"
                    defaultValue=""
                    name="directions"
                    label="Directions"
                    placeholder="directions"
                    fullWidth
                    margin="dense"
                    multiline
                    rows={4}
                    {...register('directions')}
                  />
                </Box>
                <Box mt={3}>
                  <Button
                    variant="contained"
                    color="primary"
                  onClick={handleSubmit(saveRecipe)}
                  >
                    Create Recipe
                  </Button>
                </Box>
              
            </Paper>
          </Fragment>
        </div>
          )}
          {/* <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={recipe.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={recipe.description}
              onChange={handleInputChange}
              name="description"
            />
          </div> 
          <div className="form-group">
            <label htmlFor="recipeType">Recipe Type</label>
            <input
              type="text"
              className="form-control"
              id="recipeType"
              required
              value={recipe.recipeType}
              onChange={handleInputChange}
              name="recipeType"
            />
          </div>
          <div className="form-group">
            <label htmlFor="servingSize">Serving Size</label>
            <input
              type="text"
              className="form-control"
              id="servingSize"
              required
              value={recipe.servingSize}
              onChange={handleInputChange}
              name="servingSize"
            />
          </div>
          <div className="form-group">
            <label htmlFor="ingredients">Ingredients</label>
            <input
              type="text"
              className="form-control"
              id="ingredients"
              required
              value={recipe.ingredients}
              onChange={handleInputChange}
              name="ingredients"
            />
          </div>
          <div className="form-group">
            <label htmlFor="directions">Directions</label>
            <input
              type="text"
              className="form-control"
              id="directions"
              required
              value={recipe.directions}
              onChange={handleInputChange}
              name="directions"
            />
          </div>
          <div className="form-group">
            <label htmlFor="source">Source</label>
            <input
              type="text"
              className="form-control"
              id="source"
              required
              value={recipe.source}
              onChange={handleInputChange}
              name="source"
            />
          </div>
         
          <button onClick={saveRecipe} className="btn btn-success">
           Submit
          </button>
        </div> */}
    
<Button onClick={runTest}>Test</Button>
    </div>     
  );
};


export default RecipeAddComponent;