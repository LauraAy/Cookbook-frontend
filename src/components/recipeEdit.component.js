import React, { useState, Fragment, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Box, Button, FormControl,  Paper, TextField, Typography } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import RecipeDataService from "../services/recipe.service";
import DeleteConfirmation from "../components/deleteConfirmation.component.js"


const RecipeEdit = props => {
  const filter = createFilterOptions();

  const { id }= useParams();
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
  const [currentRecipe, setCurrentRecipe] = useState(initialRecipeState);
  const [recipes, setRecipes] = useState ([]);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [typeValue, setTypeValue] = React.useState(null);
  // const [ingredientValue, setIngredientValue] = useState(currentRecipe.ingredients)
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [deleteText, setDeleteText] = useState(null);



  //get recipe
  const getRecipe = id => {
    RecipeDataService.get(id)
    .then(response => {
      setCurrentRecipe(response.data);
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };
  
  useEffect(() => {
    if(id)
    getRecipe(id);
  }, [id]);

  //get all recipes
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

  useEffect(() => {
    retrieveRecipes();
  }, []);

  //filters for recipeType options
  const filRecipes = recipes.filter((recipes) => recipes.recipeType !== '')
  const filAlphaRecipes = filRecipes.sort()
  const cleanRecipes = Array.from(new Set(filAlphaRecipes.map((filAlphaRecipe) => filAlphaRecipe.recipeType)))
    .map((option) => (option))
  const typeOptions = cleanRecipes.sort()

  //Dialog functions
  const handleClickOpen = () => {
    setDeleteMessage('Are you sure you want to delete the recipe?');
    setDeleteText('Confirming delete will permanently delete this recipe from the database.')
  
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //react-hook-form functions
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm({
    values: { title: currentRecipe.title, description: currentRecipe.description, recipeType: currentRecipe.recipeType, servingSize: currentRecipe.servingSize, 
    ingredients: currentRecipe.ingredients, directions: currentRecipe.directions, source: currentRecipe.source },
  });


  useEffect(() => {
    register("title", "description", "servingSize","ingredients", "directions", "source");
  }, [register]);


   //for ingredients and directions
   const onIngredientStateChange = (content, delta, source, editor, newValue) => {
    setValue("ingredients", editor.getContents());
    setCurrentRecipe.ingredients(editor.getContents())
  };

  const onDirectionsStateChange = (directionState) => {
    setValue("directions", directionState);
  };

  const ingredientContent = watch("ingredients");
  const directionsContent = watch("directions");
 

  const onSubmit = (data) => {
    register("title", "description", "servingSize","ingredients", "directions", "source");
  
    console.log(data);
  };


  //update recipe
  const updateRecipe = (formData) => {
    var data = {
      title: formData.title,
      description: formData.description,
      recipeType: formData.recipeType,
      servingSize: formData.servingSize,
      ingredients: formData.ingredients,
      directions: formData.directions,
      source: formData.source
    };

    RecipeDataService.update(currentRecipe.id, data)
      .then(response => {
        console.log(response.data);
        navigate("/recipes/" + currentRecipe.id)
      })
      .catch(e => {
        console.log(e);
      });
  };

  //Delete Recipe
  const submitDelete = () => {
    RecipeDataService.destroy(currentRecipe.id)
      .then(response => {
        console.log(response.data);
        navigate("/recipes");
      })
      .catch(e => {
        console.log(e);
      });
  };


//   const modules = {
//     toolbar: [
//       [{ header: [1, 2, false] }],
//       ['bold', 'italic', 'underline'],
//       ['image', 'code-block']
//     ]
 
// }
  
  return (
  <div>
    <Fragment>
      <Paper>
        <Typography variant="h6" align="center" margin="dense">
          Edit {currentRecipe.title}
        </Typography>
        <Box sx={{ ml: "10%", mr: "10%" }}>
          <FormControl fullWidth>
            <TextField
              sx={{ mt: 2, mb: 2 }}
              id="title"
              name="title"
              label="Title"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              margin="dense"
              multiline
              rows={1}
              {...register('title')}
              error={errors.title ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.username?.message}
            </Typography>
            <TextField
              sx={{ mt: 2, mb: 2 }}
              id="description"
              name="description"
              label="Recipe Description"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              margin="dense"
              multiline
              rows={2}
              {...register('description')}
            />
            <Autocomplete
              value={currentRecipe.recipeType}
              defaultValue=""
              {...register('recipeType')}
              onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                  const updatedValue = newValue.replace("Add ", "");
                  setValue(updatedValue);
                } else if (newValue && newValue.inputValue) {
				        // Create a new value from the user input
                  setValue(newValue.inputValue);
                } else {
                  setValue(newValue);
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);
                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some((option) => inputValue === option);
                if (inputValue !== "" && !isExisting) {
                  filtered.push(`Add ${inputValue}`);
                }
                return filtered;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              id="recipeType"
              options={typeOptions}
              getOptionLabel= {(option) => {
              // Value selected with enter, right from the input
                if (typeof option === 'string') {
                  const updatedOption = option.replace("Add ", "");
                  return updatedOption;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                  return option.inputValue;
                }
                // Regular option
                return option.toString();
              }}
              renderOption={(props, option) => <li {...props}>{option}</li>}
              freeSolo
              fullWidth
              renderInput={(option) => (
                <TextField   
                  {...option}
                  label="RecipeType" 
                  placeholder={currentRecipe.recipeType}
                  InputLabelProps={{
                    shrink: true
                  }}
                  {...register('recipeType')}
                />
              )}
            />
            
            <TextField
              sx={{ mt: 2, mb: 2 }}
              id="servingSize"
              type="{number}"
              name="servingSize"
              label="Serving Size"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              margin="dense"
              {...register('servingSize')}
            />
            {/* <ReactQuill
                theme="snow"
                value={ingredientContent}
                // value={ingredientContent}
                onChange={(event, newValue) => {
                  setValue("ingredients", newValue)
                }}
                placeholder={currentRecipe.ingredients}
              >

              </ReactQuill> */}
  
              {/* <ReactQuill
                theme="snow"
                value={directionsContent}
                onChange={onDirectionsStateChange}
                placeholder={currentRecipe.directions}
              
              /> */}
            {/* <TextField
              sx={{ mt: 2, mb: 2 }}
              id="outlined-multiline-static"
              defaultValue=""
              name="ingredients"
              label="Ingredients"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              margin="dense"
              multiline
              rows={4}
              {...register('ingredients')}
            /> */}
            {/* <TextField
              sx={{ mt: 2, mb: 2 }}
              id="outlined-multiline-static"
              defaultValue=""
              name="directions"
              label="Directions"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              margin="dense"
              multiline
              rows={4}
              {...register('directions')}
            /> */}
            <TextField
              sx={{ mt: 2, mb: 2 }}
              id="source"
              // defaultValue=""
              name="source"
              label="Recipe Source"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              margin="dense"
              multiline
              rows={1}
              {...register('source')}
            />
          </FormControl>
          <Box 
            sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 10 
            }}
          >
            <Button
              onClick={handleSubmit(onSubmit)}
              sx={{my: 2}}
              variant="contained"
            >
              Update
            </Button>  
            <Button 
              onClick={handleClickOpen}
              sx={{my: 2, ml: 2}}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
            <DeleteConfirmation openDialog={open} closeDialog={handleClose} confirmDialog={submitDelete} message={deleteMessage} text={deleteText}  />
          </Box>   
        </Box>
      </Paper>
    </Fragment>
  </div>
  );
};

export default RecipeEdit;