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
            ):(<div></div>)}
            {region.subRegion ? (
              <div>
                <label>
                  <strong>Sub Region:</strong>
                </label>{" "}
                {region.subRegion}
              </div>
            ):(<div></div>)}
            {region.intermediateRegion ? (
              <div>
                <label>
                  <strong>Intermediate Region:</strong>
                </label>{" "}
                {region.intermediateRegion}
              </div>
            ):(<div></div>)}
             {region.countryCode ? (
              <div>
                <label>
                  <strong>Country Code:</strong>
                </label>{" "}
                {region.countryCode}
              </div>
            ):(<div></div>)}
             {region.lat ? (
              <div>
                <label>
                  <strong>Latitude:</strong>
                </label>{" "}
                {region.lat}
              </div>
            ):(<div></div>)}
             {region.lng ? (
              <div>
                <label>
                  <strong>Longitude:</strong>
                </label>{" "}
                {region.lng}
              </div>
            ):(<div></div>)}
            <br></br>
            <br></br>
          </div>
        ))}
        <h4>Add another region. </h4>
        <button onClick={goAddRegion}>Add a Region</button>
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