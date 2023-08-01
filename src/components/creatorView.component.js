import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import CreatorRecipeDataService from "../services/creatorRecipe.service";

const CreatorViewComponent = params => {
  const { id } = useParams();
  let navigate = useNavigate(); 

  const [currentRecipe, setCurrentRecipe] = useState ([]);
  const [ creator, setCreator] = useState ([])

const getRecipeCreators = id => {
    CreatorRecipeDataService.getRecipeCreators(id)
    .then(response => {
      setCurrentRecipe(response.data);
      setCreator(response.data.creator)
      console.log(response.data);
      console.log(creator)
    })
    .catch(e => {
      console.log(e);
    });
  };
  
  useEffect(() => {
    if(id)
    getRecipeCreators(id);
  }, [id]);

const goAddCreator = () => {
  navigate("/creators/add/" + id)
}

return (
    <>
      <div>
        {creator.length ? (
          <div >
            {creator.map((creator, index) => (
              <div key={index}>
                <h2> {creator.creatorName} </h2>
                {creator.about ? (
                  <div>
                    <label>
                      <strong>About recipe creator:</strong>
                    </label>{" "}
                    {creator.about}
                  </div>
                ):(<div></div>)}
                {creator.link ? (
                  <div>
                    <label>
                      <strong>Link to recipe creator webpage:</strong>
                    </label>{" "}
                    {creator.link}
                  </div>
                ):(<div></div>)}
                <Link to={"/creators/edit/" + currentRecipe.id + "/" + creator.id}>
                  <button>Edit This Recipe Creator</button>
                </Link>
                <br></br>
                <br></br>
              </div>
            ))}
            <h4>Add another recipe creator. </h4>
            <button onClick={goAddCreator}>Add a recipe creator.</button>
        </div>
        ):(  
          <div> 
            <h2>Add a Creator now!</h2>
            <button onClick={goAddCreator}>Add a recipe creator.</button>
          </div>
        )}
      </div>
    </>
)}

export default CreatorViewComponent