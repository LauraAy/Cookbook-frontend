import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import RecipeDataService from "../services/recipe.service";
import RegionDataService from "../services/region.service";
import RegionRecipeDataService from "../services/regionRecipe.service";
import { useParams, useNavigate } from 'react-router-dom';

const RegionAddComponent = () => { 
const { id } = useParams();
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
const [submitted, setSubmitted] = useState(false)


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

const saveRegionRecipe = () => {
    var data = {
      regionId: currentRegion.id,
      recipeId: currentRecipe.id
    };

    RegionRecipeDataService.create(data)
      .then(response => {
        setRegionRecipe({
            regionId: response.data.regionId,
            recipeId: response.data.regionid
        })
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });

  };

  const handleRegionChange = async (event) => {
    setRegionId(event.target.value);
    console.log(regionId)
  }
  useEffect(()=>{
    console.log(regionId)
    retrieveRegion(regionId)
  }, [regionId])

  const returnRecipe = () => {
    navigate("/recipes/" + id)
    setSubmitted(false)
  }

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
                key={index}
            >
            {region.country}
            </option>
            )}
        </select>
      </Form>
      <br></br>
      <br></br>
      <button onClick={saveRegionRecipe} class="btn btn-success">
          Add Region
      </button>
    </div>
    </div>
    ) : (
    <div>
    <p>Please select a region from the dropdown.</p> 
      <Form>
        <select class="form-control" onChange={handleRegionChange} >
            <option>Select a Region</option>
           
    
            {regions.map((region, index) => 
            <option
                value= {region.id}
                key={index}
            >
            {region.country}
            </option>
            )}
        </select>
      </Form>
    </div>
    )} 
    </div>
    )}

export default RegionAddComponent;