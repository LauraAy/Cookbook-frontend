import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import CreatorDataService from "../services/creator.service";
import CreatorRecipeDataService from "../services/creatorRecipe.service";
import DeleteConfirmation from "../components/deleteConfirmation.component.js";

const CreatorEdit = props => {
  const { recipeId, creatorId }= useParams();
  let navigate = useNavigate();

  const initialCreatorState = {
    id: null,
    creatorName: "",
    about: "",
    link: ""
  };

  const [creator, setCreator] = useState(initialCreatorState);
  const [type, setType] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);

  //get creator
  const getCreator = id => {
    CreatorDataService.get(id)
      .then(response => {
        setCreator(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if(creatorId)
    getCreator(creatorId);
  }, [creatorId]);


  //set form input to currentCreator
  const handleInputChange = event => {
    const { name, value } = event.target;
    setCreator({ ...creator, [name]: value });
  };
 

  //update Creator
  const updateCreator = () => {
    CreatorDataService.update(creator.id, creator)
      .then(response => {
        console.log(response.data);
        navigate("/recipes/" + recipeId)
      })
      .catch(e => {
        console.log(e);
      });
  };

  //Display delete confirmation modal based on type
  const showDeleteModal = (type) => {
    setType(type);

    if (type === "creator") {
      setDeleteMessage('Are you sure you want to delete the creator?');
    }

    setDisplayConfirmationModal(true);
  };

  //Hide delete confirmation modal
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  //Remove creator from this recipe
  const removeCreator = () => {
    CreatorRecipeDataService.removeCreator(recipeId, creatorId)
    .then(response => {
      console.log(response.data)
      navigate("/recipes/" + recipeId)
    })
    .catch(e => {
      console.log(e)
    })
  }

  //Delete Creator
  const submitDelete = () => {
    CreatorDataService.destroy(creator.id)
      .then(response => {
        console.log(response.data);
        navigate("/recipes/" + recipeId)
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
    {creator ? (
      <div className="edit-form">
        <h4>Creator</h4>
        <form>
          <div className="form-group">
            <label htmlFor="title">Recipe Creator Name</label>
            <input
              type="text"
              className="form-control"
              id="creatorName"
              name="creatorName"
              value={creator.creatorName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">About Recipe Creator</label>
            <input
              type="text"
              className="form-control"
              id="about"
              name="about"
              value={creator.about}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="recipeType">Link</label>
            <input
              type="text"
              className="form-control"
              id="link"
              name="link"
              value={creator.link}
              onChange={handleInputChange}
            />
          </div>
        </form>

        <button
          type="submit"
          onClick={updateCreator}
        >
          Update
        </button>
        <button onClick={() => {removeCreator(creator.id)}}>
          Remove Creator from This Recipe 
        </button>
        <button onClick={() => showDeleteModal("creator")} >
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

export default CreatorEdit;