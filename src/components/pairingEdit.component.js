import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import PairingDataService from "../services/pairing.service";
import PairingRecipeDataService from "../services/pairingRecipe.service";
import DeleteConfirmation from "../components/deleteConfirmation.component.js";

const PairingEdit = props => {
  const { recipeId, pairingId }= useParams();
  let navigate = useNavigate();

  const initialPairingState = {
    id: null,
    pairingName: "",
    description: "",
    drinks: "",
    shows: "",
    books: "",
    music: "",
    decor: "",
    more: ""
  };

  const [pairing, setPairing] = useState(initialPairingState);
  const [type, setType] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);

  //get pairing
  const getPairing = id => {
    PairingDataService.get(id)
      .then(response => {
        setPairing(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if(pairingId)
    getPairing(pairingId);
  }, [pairingId]);


  //set form input to currentPairing
  const handleInputChange = event => {
    const { name, value } = event.target;
    setPairing({ ...pairing, [name]: value });
  };

  //update Pairing
  const updatePairing = () => {
    PairingDataService.update(pairing.id, pairing)
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

    if (type === "pairing") {
      setDeleteMessage('Are you sure you want to delete the pairing?');
    }
    setDisplayConfirmationModal(true);
  };

  //Hide delete confirmation modal
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  //Remove pairing from this recipe
  const removePairing = () => {
    PairingRecipeDataService.removePairing(recipeId, pairingId)
    .then(response => {
      console.log(response.data)
      navigate("/recipes/" + recipeId)
    })
    .catch(e => {
      console.log(e)
    })
  }

  //Delete Pairing
  const submitDelete = () => {
    PairingDataService.destroy(pairing.id)
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
      <div className="edit-form">
        <h4>Pairing</h4>
        <form>
          <div className="form-group">
            <label htmlFor="pairingName">Recipe Pairing Name</label>
            <input
              type="text"
              className="form-control"
              id="pairingName"
              name="pairingName"
              value={pairing.pairingName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">About Recipe Pairing</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={pairing.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="drinks">Drinks</label>
            <input
              type="text"
              className="form-control"
              id="drinks"
              name="drinks"
              value={pairing.drinks}
              onChange={handleInputChange}
            />
          </div>
					<div className="form-group">
            <label htmlFor="shows">Shows</label>
            <input
              type="text"
              className="form-control"
              id="shows"
              name="shows"
              value={pairing.shows}
              onChange={handleInputChange}
            />
          </div>
					<div className="form-group">
            <label htmlFor="books">Books</label>
            <input
              type="text"
              className="form-control"
              id="books"
              name="books"
              value={pairing.books}
              onChange={handleInputChange}
            />
          </div>
					<div className="form-group">
            <label htmlFor="music">Music</label>
            <input
              type="text"
              className="form-control"
              id="music"
              name="music"
              value={pairing.music}
              onChange={handleInputChange}
            />
          </div>
					<div className="form-group">
            <label htmlFor="decor">Decor</label>
            <input
              type="text"
              className="form-control"
              id="decor"
              name="decor"
              value={pairing.decor}
              onChange={handleInputChange}
            />
          </div>
					<div className="form-group">
            <label htmlFor="more">More</label>
            <input
              type="text"
              className="form-control"
              id="more"
              name="more"
              value={pairing.more}
              onChange={handleInputChange}
            />
          </div>
        </form>

        <button
          type="submit"
          onClick={updatePairing}
        >
          Update
        </button>
        <button onClick={() => {removePairing(pairing.id)}}>
          Remove Pairing from This Recipe 
        </button>
        <button onClick={() => showDeleteModal("pairing")} >
          Delete
        </button>
        <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} type={type} message={deleteMessage}  />
      </div>
  </div>



  );
};

export default PairingEdit;