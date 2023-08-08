import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RegionRecipeDataService from "../services/regionRecipe.service";

const RegionViewComponent = params => {
  const { id } = useParams();
  let navigate = useNavigate(); 
  const [currentRecipe, setCurrentRecipe] = useState ([]);
  const [ region, setRegion] = useState ([])

const getRecipeRegions = id => {
    RegionRecipeDataService.getRecipeRegions(id)
    .then(response => {
      setCurrentRecipe(response.data);
      setRegion(response.data.region)
      console.log(response.data);
      console.log(region)
    })
    .catch(e => {
      console.log(e);
    });
  };
  
  useEffect(() => {
    if(id)
    getRecipeRegions(id);
  }, [id]);

const goAddRegion = () => {
  navigate("/regions/add/" + id)
}

const refreshPage = () => {
  navigate(0);
}

const removeRegion = currentRegionId => {
  const recipeId = currentRecipe.id
  const regionId = currentRegionId

  RegionRecipeDataService.removeRegion(recipeId, regionId)
  .then(response => {
    console.log(response.data)
    refreshPage()
  
  })
  .catch(e => {
    console.log(e)
  })
}

return (
<>
  <div>
    {region.length ? (
      <div >
        {region.map((region, index) => (
          <div key={index}>
            <h2> {region.country} </h2>
            {region.regionName ? (
              <div>
                <label>
                  <strong>Region Name:</strong>
                </label>{" "}
                {region.regionName}
              </div>
            ): null}
            {region.subRegion ? (
              <div>
                <label>
                  <strong>Sub Region:</strong>
                </label>{" "}
                {region.subRegion}
              </div>
            ): null}
            {region.intermediateRegion ? (
              <div>
                <label>
                  <strong>Intermediate Region:</strong>
                </label>{" "}
                {region.intermediateRegion}
              </div>
            ): null}
             {region.countryCode ? (
              <div>
                <label>
                  <strong>Country Code:</strong>
                </label>{" "}
                {region.countryCode}
              </div>
            ): null}
             {region.lat ? (
              <div>
                <label>
                  <strong>Latitude:</strong>
                </label>{" "}
                {region.lat}
              </div>
            ): null}
             {region.lng ? (
              <div>
                <label>
                  <strong>Longitude:</strong>
                </label>{" "}
                {region.lng}
              </div>
            ): null}
            <br></br>
            <br></br>
            <button onClick={() => {removeRegion(region.id)}}>Remove Region from This Recipe </button>
            <br></br>
            <br></br>
          </div>
        ))}
        <h4>Add another region. </h4>
        <button onClick={goAddRegion}>Add a Region</button>
        <br></br>
        <br></br>
    </div>
    ):(  
      <div> 
        <h2>Add a Region now!</h2>
        <button onClick={goAddRegion}>Add a Region</button>
      </div>
    )}
  </div>
</>

)}

export default RegionViewComponent