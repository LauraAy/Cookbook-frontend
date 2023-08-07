import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import { useParams, useNavigate } from 'react-router-dom';
import PairingDataService from "../services/pairing.service";
import PairingRecipeDataService from "../services/pairingRecipe.service";
import RecipeDataService from "../services/recipe.service";
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
    more: "",
    recipeOne: "",
    recipeTwo: "",
    recipeThree: ""
  };

  const [pairing, setPairing] = useState(initialPairingState);
  const [recipes, setRecipes] = useState([])
  const [recipeOne, setRecipeOne] = useState ([])
  const [recipeOneId, setRecipeOneId] = useState ("")
  const [recipeTwo, setRecipeTwo] = useState ([])
  const [recipeTwoId, setRecipeTwoId] = useState ("")
  const [recipeThree, setRecipeThree] = useState ([])
  const [recipeThreeId, setRecipeThreeId] = useState ("")
  const [type, setType] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [changeRecipeOne, setChangeRecipeOne] = useState(false)
  const [changeRecipeTwo, setChangeRecipeTwo] = useState(false)
  const [changeRecipeThree, setChangeRecipeThree] = useState(false)
  
  
  //get pairing
  const getPairing = id => {
    PairingDataService.get(id)
      .then(response => {
        setPairing(response.data);
        console.log(response.data);
        if(response.data.recipeOne !== null) {
          setRecipeOneId(response.data.recipeOne)
        }
        if(response.data.recipeTwo !== null) {
          setRecipeTwoId(response.data.recipeTwo)
        }
        if(response.data.recipeThree !== null) {
          setRecipeThreeId(response.data.recipeThree)
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

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
    if(pairingId)
    getPairing(pairingId);
    retrieveRecipes()
  }, [pairingId]);



  const getRecipeOne = id => {
    RecipeDataService.get(id)
    .then(response => {
      setRecipeOne(response.data)
      console.log (response.data)
    })
    .catch(e => {
      console.log(e);
    });
  }

  const getRecipeTwo = id => {
    RecipeDataService.get(id)
    .then(response => {
      setRecipeTwo(response.data)
      console.log (response.data)
    })
    .catch(e => {
      console.log(e);
    });
  }

  const getRecipeThree = id => {
    RecipeDataService.get(id)
    .then(response => {
      setRecipeThree(response.data)
      console.log (response.data)
    })
    .catch(e => {
      console.log(e);
    });
  }

  useEffect(() => {
    if (recipeOneId) {
      getRecipeOne(recipeOneId)
    } else {
      console.log("not there")
    }

    if (recipeTwoId) {
      getRecipeTwo(recipeTwoId)
    } else {
      console.log("not there")
    }

    if (recipeThreeId) {
      getRecipeThree(recipeThreeId)
    } else {
      console.log("not there")
    }

  }, [recipeOneId, recipeTwoId, recipeThreeId]);


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

  //set changeRecipeOne to true
  const handleChangeRecipeOne = () => {
    setChangeRecipeOne(true)
  }

   //set changeRecipeTwo to true
   const handleChangeRecipeTwo = () => {
    setChangeRecipeTwo(true)
  }

   //set changeRecipeThree to true
   const handleChangeRecipeThree = () => {
    setChangeRecipeThree(true)
  }

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
        <br></br>
        <br></br>
        { changeRecipeOne ? (
          <div>
            <p>Please select a Recipe from the dropdown.</p> 
            <Form>
              <select className="form-control"  name="recipeOne"
              value={pairing.recipeOne}
              onChange={handleInputChange} >
                <option>Select a Recipe</option>
                {recipes.map((recipes, index) => 
                  <option
                    value= {recipes.id}
                    key={index}
                  >
                    {recipes.title} 
                  </option>
                )}
              </select>
            </Form>
          </div>
        ):(
          <div>
          { pairing.recipeOne ? (
            <div>
              {recipeOne.title}
              <br></br>
              <button onClick={handleChangeRecipeOne}>Change this recipe</button>
            </div>
          ):(
            <div>
              <button onClick={handleChangeRecipeOne}>Add Recipe One</button>
            </div>
          )}
         </div>
        )}
        <br></br>
        <br></br>
        { changeRecipeTwo ? (
          <div>
            <p>Please select a Recipe from the dropdown.</p> 
            <Form>
            <select class="form-control"  name="recipeTwo"
              value={pairing.recipeTwo}
              onChange={handleInputChange} >
                <option>Select a Recipe</option>
                {recipes.map((recipes, index) => 
                  <option
                    value= {recipes.id}
                    key={index}
                  >
                    {recipes.title} 
                  </option>
                )}
              </select>
            </Form>
          </div>
        ):(
          <div>
          { pairing.recipeTwo ? (
            <div>
              {recipeTwo.title}
              <br></br>
              <button onClick={handleChangeRecipeTwo}>Change this recipe</button>
            </div>
          ):(
            <div>
              <button onClick={handleChangeRecipeTwo}>Add Recipe Two</button>
            </div>
          )}
         </div>
        )}
        <br></br>
        <br></br>
        { changeRecipeThree ? (
          <div>
            <p>Please select a Recipe from the dropdown.</p> 
            <Form>
            <select class="form-control"  name="recipeThree"
              value={pairing.recipeThree}
              onChange={handleInputChange} >
                <option>Select a Recipe</option>
                {recipes.map((recipes, index) => 
                  <option
                    value= {recipes.id}
                    key={index}
                  >
                    {recipes.title} 
                  </option>
                )}
              </select>
            </Form>
          </div>
        ):(
          <div>
          { pairing.recipeThree ? (
            <div>
              {recipeThree.title}
              <br></br>
              <button onClick={handleChangeRecipeThree}>Change this recipe</button>
            </div>
          ):(
            <div>
              <button onClick={handleChangeRecipeThree}>Add Recipe Three</button>
            </div>
          )}
         </div>
        )}
        <br></br>
        <br></br>
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