import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import RecipeDataService from "../services/recipe.service";
import RegionDataService from "../services/region.service";
import RegionRecipeDataService from "../services/regionRecipe.service";
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

const initialRegionRecipeState = {
    regionId: null,
    recipeId: null
}

const initialCurrentRegionState = {
    id: null, 
    country: "",
    lat: null,
    lng: null,
    alpha2Code: "",
    alpah3Code: "",
    countryCode: "",
    regionName: "",
    subRegion: "",
    intermediateRegion: ""

}

const [regions, setRegions] = useState([]);
const [currentRecipe, setCurrentRecipe] = useState(initialRecipeState);
const [regionId, setRegionId] = useState()
const [currentRegion, setCurrentRegion] = useState ()
const [regionRecipe, setRegionRecipe] = useState(initialRegionRecipeState);
const [currentIndex, setCurrentIndex] = useState(0);


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

  const retrieveRegion = id => {
    RegionDataService.get(id)
      .then(response => {
        setCurrentRegion(response.data);
        console.log(response.data);
      })
      .catch(e => {
       
      });
  };


const addRegion = regionId => {
    var data = {
      regionId: currentRegion.id,
      recipeId: currentRegion.id
    };

    RegionRecipeDataService.create(data)
      .then(response => {
        setRegionRecipe({
            regionId: response.data.regionId,
            recipeId: response.data.regionid
        })
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
      // setRegion(initialRegionState);
  };

//   const refreshDropdown = () => {
//     retrieveRegions();
//     setCurrentRegion(null);
//     setCurrentIndex(-1);
//   };
  
  const setActiveRegion = (region, index) => {
    setCurrentRegion(region);
    setCurrentIndex(index);
    console.log("I tried.")
  };

  const getRegion = (id) => {

  }

  const handleRegionChange = (e, index) => {
    setRegionId(e.target.value);
    setCurrentIndex(index);
    retrieveRegion(regionId)
    console.log(regionId)
  }

 // const initialRegionState = 
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

<Form>
    <select class="form-control" onChange={handleRegionChange} >
        <option>Select a Region</option>
       

        {regions.map((region, index) => 
        <option
            value= {region.id}
            // onSelect={() => setActiveRegion(region, index)}
            // className={
            // "list-group-item " + (index === currentIndex ? "active" : "")
            // }
            key={index}
        >
        {region.country}
        </option>
        )}
    </select>
    </Form>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
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