import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
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
  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentRecipe({ ...currentRecipe, [name]: value });
  };
 

  //update recipe
  const updateRecipe = () => {
    RecipeDataService.update(currentRecipe.id, currentRecipe)
      .then(response => {
        console.log(response.data);
        navigate("/recipes/" + currentRecipe.id)
      })
      .catch(e => {
        console.log(e);
      });
  };

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

  return (
    <div>
    {currentRecipe ? (
      <div className="edit-form">
        <h4>Recipe</h4>
        <form>
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
        </form>

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