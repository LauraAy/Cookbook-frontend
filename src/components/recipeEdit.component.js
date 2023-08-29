import React, { useState, Fragment, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Paper, Box, Button, FormControl, TextField, Typography } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import RecipeDataService from "../services/recipe.service";
import DeleteConfirmation from "../components/deleteConfirmation.component.js"

const RecipeEdit = props => {
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
  const [message, setMessage] = useState("");
  const [type, setType] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);

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


  //set form input to currentRecipe
  const handleInputChange = (event, option) => {
    const { name, value } = event.target;
    setCurrentRecipe({ ...currentRecipe, [name]: value });
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

  //validation functions
  const validationSchema = Yup.object().shape({
    // title: Yup.string()
    //   .required('title is required')
    });
  
    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm({
      values: { title: currentRecipe.title, description: currentRecipe.description, "servingSize": null, "recipeType": ""},
      resolver: yupResolver(validationSchema)
    });

  //Display delete confirmation modal based on type
  const showDeleteModal = (type) => {
    setType(type);

    if (type === "recipe") {
      setDeleteMessage('Are you sure you want to delete the recipe?');
    }

    setDisplayConfirmationModal(true);
  };

  //Hide delete confirmation modal
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
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

  const runTest = (formData) => {
    console.log(formData)
  }

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
              defaultValue={currentRecipe.description}
              fullWidth
              margin="dense"
              multiline
              rows={2}
              {...register('description')}
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
              onClick={handleSubmit(updateRecipe)}
              sx={{my: 2}}
              variant="contained"
            >
              Update
            </Button>  
            <Button 
              onClick={() => showDeleteModal("recipe")}
              sx={{my: 2, ml: 2}}
              variant="contained"
              color="error"
            >
              Delete
            </Button> 
            <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} type={type} message={deleteMessage}  />
          </Box>   
        </Box>
      </Paper>
    </Fragment>


        {/* <Button className="badge badge-danger mr-2" onClick={() => showDeleteModal("recipe")} >
          Delete
        </Button> */}
    
        {/* <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} type={type} message={deleteMessage}  /> */}
      </div>
  

  );
};

export default RecipeEdit;