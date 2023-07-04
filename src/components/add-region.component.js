import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import RecipeDataService from "../services/recipe.service";
import RegionDataService from "../services/region.service";
import AuthService from "../services/auth.service.js";

const AddRegion = () => { 

const [regions, setRegions] = useState([]);
const [currentRegion, setCurrentRegion] = useState (null)
const [currentRecipe, setCurrentRecipe] = useState (null)


useEffect(() => {
    retrieveRegions();
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

const addRegion = regionId => {
    var data = {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      regionId: currentRegion.currentRegionId
    };

    RecipeDataService.update(recipe.id, data)
      .then(response => {
        setRecipe({ ...recipe, regionId });
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
    </div>
) : (
    <div>
        <p>Please select a region from the dropdown.</p>   
        <Form.Select aria-label="Default select example" >
            <option>Open this select menu</option>
            {regions &&
            regions.map((region, index) => (
            <option
                onChange={() => setActiveRegion(region, index)}
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
        <button onClick={addRegion} className="btn">
            Add Region
        </button>
        <br></br>
        <br></br>
        <button className="btn btn-success" onClick={newRecipe}>
            Add another recipe
        </button>
    </div>
    )} 
</div>
)}

export default addRegion;