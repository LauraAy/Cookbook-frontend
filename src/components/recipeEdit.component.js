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
      defaultValues: { title: currentRecipe.title, description: currentRecipe.description, "servingSize": null, "recipeType": ""},
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
        <Box>
          <FormControl fullWidth>
            <TextField
              sx={{ mt: 2, mb: 2 }}
              // required
              id="title"
              name="title"
              label="Title"
              InputLabelProps={{
                shrink: true,
              }}
              // defaultValue={currentRecipe.title}
              // onChange={handleInputChange}
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
          </FormControl>
          <TextField
            sx={{ mt: 2, mb: 2 }}
            id="description"
            name="description"
            label="Recipe Description"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={currentRecipe.description}
            // onChange={handleInputChange}
            fullWidth
            margin="dense"
            multiline
            rows={2}
            {...register('description')}
          />  
          <Button
            onClick={handleSubmit(updateRecipe)}
          >
          Update
        </Button>  
        <Button onClick={handleSubmit(runTest)}>
          Test
        </Button>      
        </Box>
      </Paper>
    </Fragment>
    

     {currentRecipe ? (
      <div className="edit-form">
        <h4>Recipe</h4>
        {/* <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={currentRecipe.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={currentRecipe.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="recipeType">Recipe Type</label>
            <input
              type="text"
              className="form-control"
              id="recipeType"
              name="recipeType"
              value={currentRecipe.recipeType}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="servingSize">ServingSize</label>
            <input
              type="text"
              className="form-control"
              id="servingSize"
              name="servingSize"
              value={currentRecipe.servingSize}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ingredients">Ingredients</label>
            <input
              type="text"
              className="form-control"
              id="ingredients"
              name="ingredients"
              value={currentRecipe.ingredients}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="directions">Directions</label>
            <input
              type="text"
              className="form-control"
              id="directions"
              name="directions"
              value={currentRecipe.directions}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="source">Source</label>
            <input
              type="text"
              className="form-control"
              id="source"
              name="source"
              value={currentRecipe.source}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>
              <strong>Status:</strong>
            </label>
            {currentRecipe.published ? "Published" : "Pending"}
          </div>
        </form> */}

        {/* {currentRecipe.published ? (
          <button
            className="badge badge-primary mr-2"
            onClick={() => updatePublished(false)}
          >
            UnPublish
          </button>
        ) : (
          <button
            className="badge badge-primary mr-2"
            onClick={() => updatePublished(true)}
          >
            Publish
          </button>
        )} */}

        <button
          type="submit"
          className="badge badge-success"
          onClick={updateRecipe}
        >
          Update
        </button>

        <button className="badge badge-danger mr-2" onClick={() => showDeleteModal("recipe")} >
          Delete
        </button>
    
        <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} type={type} message={deleteMessage}  />
      </div>
    ) : (
      <div>
        <br />
        <p>Please click on a Recipe...</p>
      </div>
    )}
  </div>
  );
};

export default RecipeEdit;