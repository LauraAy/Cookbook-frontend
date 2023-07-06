import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import RecipeDataService from "../services/recipe.service";
import RegionDataService from "../services/region.service";
import { useParams, useNavigate } from 'react-router-dom';
import AuthService from "../services/auth.service.js";

const AddRegion = () => { 
const { id } = useParams()

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

const initialRegionState = {
    id:null
}

const [recipe, setRecipe] = useState(initialRecipeState);
const [regions, setRegions] = useState([]);
const [currentRegion, setCurrentRegion] = useState (initialRegionState)
const [currentRecipe, setCurrentRecipe] = useState(initialRecipeState);
const [currentIndex, setCurrentIndex] = useState(-1);


useEffect(() => {
    retrieveRegions();
    retrieveRecipe(id);
  }, []);


  const retrieveRegions = () => {
    RegionDataService.getAll()
    .then(response => {
      setRegions(response.data);
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };

  const retrieveRecipe = id => {
    RecipeDataService.get(id)
      .then(response => {
        setCurrentRecipe(response.data);
        console.log(response.data);
        console.log(currentRecipe.id);
      })
      .catch(e => {
       
      });
  };

const addRegion = regionId => {
    var data = {
      regionId: currentRegion.id
    };

    RecipeDataService.update(currentRecipe.id, data)
      .then(response => {
        setCurrentRecipe({ ...currentRecipe, regionId });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
      // setRegion(initialRegionState);
  };

  const refreshDropdown = () => {
    retrieveRegions();
    setCurrentRegion(null);
    setCurrentIndex(-1);
  };
  
  const setActiveRegion = (region, index) => {
    setCurrentRegion(region);
    setCurrentIndex(index);
    console.log("I tried.")
  };

 // const initialRegionState = {
  //   regionId: null,
  //   country: ""
  // };

return (
<div>
{currentRegion ? ( 
    <div>
        <h4>Region</h4>
        <div>
            <label>
                <strong>Region</strong>
            </label>{" "}
            {currentRegion.regionName}
        </div>
        <div>
            <label>
                <strong>Country</strong>
            </label>{" "}
            {currentRegion.country}
        </div>
        <div>
            <label>
                <strong>Latitude:</strong>
            </label>{" "}
            {currentRegion.lat}
        </div>
        <div>
            <label>
                <strong>Longitude:</strong>
            </label>{" "}
            {currentRegion.long}
        </div> 
    <br></br>
    <br></br>
    <div>
    <p>Please select a region from the dropdown.</p>   
    <Form.Select aria-label="Default select example" >
        <option>Open this select menu</option>
        {regions &&
        regions.map((region, index) => (
        <option
            onClick={() => setActiveRegion(region, index)}
            className={
            "list-group-item " + (index === currentIndex ? "active" : "")
            }
            key={index}
        >
        {region.country}
        </option>

        ))}
    </Form.Select>


    <ul className="list-group">
        {regions &&
        regions.map((region, index) => (
        <li
        className={
        "list-group-item " + (index === currentIndex ? "active" : "")
        }
        onClick={() => setActiveRegion(region, index)}
        key={index}
        >
            {region.country}
        </li>
        ))}
    </ul>
    <button onClick={addRegion} class="btn btn-success">
        Add Region
    </button>
</div>
</div>
) : (
    <div>
        <p>Please select a region from the dropdown.</p>   
        <Form.Select aria-label="Default select example" >
            <option>Open this select menu</option>
            {regions &&
            regions.map((region, index) => (
            <option
                onClick={() => setActiveRegion(region, index)}
                className={
                "list-group-item " + (index === currentIndex ? "active" : "")
                }
                key={index}
            >
            {region.country}
            </option>
    
            ))}
        </Form.Select>
    

        <ul className="list-group">
            {regions &&
            regions.map((region, index) => (
            <li
            className={
            "list-group-item " + (index === currentIndex ? "active" : "")
            }
            onClick={() => setActiveRegion(region, index)}
            key={index}
            >
                {region.country}
            </li>
            ))}
        </ul>
        <button onClick={addRegion} class="btn btn-success">
            Add Region
        </button>
    </div>
    )} 
</div>
)}

export default AddRegion;