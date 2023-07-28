import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import RecipeDataService from "../services/recipe.service";
import CreatorDataService from "../services/creator.service";
import CreatorRecipeDataService from "../services/creatorRecipe.service";
import { useParams, useNavigate } from 'react-router-dom';

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

  const [creator, setCreator] = useState(initialCreatorState);
  const [currentRecipe, setCurrentRecipe] =useState ([]);
  const [creatorRecipe, setCreatorRecipe] = useState (initialCreatorRecipeState);
  const [submitted, setSubmitted] = useState(false);
  const [added, setAdded] = useState(false);
  
  const handleInputChange = event => {
    const { name, value } = event.target;
    setCreator({ ...creator, [name]: value });
  };
  
  useEffect(() => {
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

  const saveCreator = () => {
    var data = {
      creatorName: creator.creatorName,
      about: creator.about,
      link: creator.link
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
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
};

const saveCreatorRecipe = () => {
    var data = {
      creatorId: creator.id,
      recipeId: currentRecipe.id
    };

    CreatorRecipeDataService.create(data)
      .then(response => {
        setCreatorRecipe({
            creatorId: response.data.creatorId,
            recipeId: response.data.regionid
        })
        setAdded(true)
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
}

const newCreator = () => {
    setCreator(initialCreatorState);
    setSubmitted(false);
    setAdded(false)
  };

  const returnRecipe = () => {
    navigate("/recipes/" + id)
  }

  const addAnotherCreator = () => {
    newCreator()
  }

  const addRegion = () => {
    navigate("/regions/add/:id")
  }

  const addPairing = () => {
    navigate("/pairings/add/:id")
  }


return (
<div>
{added ? (
  <div>
    <h4>You've added {creator.creatorName} added to {currentRecipe.title}</h4>
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
      <div>
        <div className="form-group">
          <label htmlFor="creatorName">Recipe Creator Name</label>
          <input
            type="text"
            className="form-control"
            id="creatorName"
            required
            value={creator.creatorName}
            onChange={handleInputChange}
            name="creatorName"
          />
        </div>
        <div className="form-group">
          <label htmlFor="about">About Recipe Creator</label>
          <input
            type="text"
            className="form-control"
            id="about"
            required
            value={creator.about}
            onChange={handleInputChange}
            name="about"
          />
        </div> 
        <div className="form-group">
          <label htmlFor="link">Link to Recipe Creator Website</label>
          <input
            type="text"
            className="form-control"
            id="link"
            required
            value={creator.link}
            onChange={handleInputChange}
            name="link"
          />
        </div>
        <br></br>
        <br></br>
        <button onClick={saveCreator} className="btn btn-success">
          Submit
        </button>
      </div>
    )}
  </div>  
)}
</div>
)};

export default CreatorAddComponent;