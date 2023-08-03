// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import PairingRecipeDataService from "../services/pairingRecipe.service";

// const CreatorViewComponent = params => {
//   const { id } = useParams();
//   let navigate = useNavigate(); 

//   const [currentRecipe, setCurrentRecipe] = useState ([]);
//   const [ pairing, setPairing] = useState ([])

// const getRecipePairings = id => {
//     CreatorRecipeDataService.getRecipeCreators(id)
//     .then(response => {
//       setCurrentRecipe(response.data);
//       setPairing(response.data.pairing)
//       console.log(response.data);
//       console.log(pairing)
//     })
//     .catch(e => {
//       console.log(e);
//     });
//   };

//   useEffect(() => {
//     if(id)
//     getRecipePairings(id);
//   }, [id]);

// const goAddPairing = () => {
//   navigate("/pairings/add/" + id)
// }

// const refreshPage = () => {
//   navigate(0);
// }

// //Remove creator from this recipe
// const removePairing = currentPairingId => {
//   const recipeId = currentRecipe.id
//   const creatorId = currentPairingId

//   PairingRecipeDataService.removePairing(recipeId, pairingId)
//   .then(response => {
//     console.log(response.data)
//     refreshPage()
  
//   })
//   .catch(e => {
//     console.log(e)
//   })
// }

// return (
//     <>
//       <div>
//         {creator.length ? (
//           <div >
//             {creator.map((creator, index) => (
//               <div key={index}>
//                 <h2> {creator.creatorName} </h2>
//                 {creator.about ? (
//                   <div>
//                     <label>
//                       <strong>About recipe creator:</strong>
//                     </label>{" "}
//                     {creator.about}
//                   </div>
//                 ):(<div></div>)}
//                 {creator.link ? (
//                   <div>
//                     <label>
//                       <strong>Link to recipe creator webpage:</strong>
//                     </label>{" "}
//                     {creator.link}
//                   </div>
//                 ):(<div></div>)}
//                 <Link to={"/creators/edit/" + currentRecipe.id + "/" + creator.id}>
//                   <button>Edit This Recipe Creator</button>
//                 </Link>
//                 <br></br>
//                 <br></br>
//                 <button onClick={() => {removeCreator(creator.id)}}>Remove Creator from This Recipe </button>
//                 <br></br>
//                 <br></br>
//               </div>
//             ))}
//             <h4>Add another recipe creator. </h4>
//             <button onClick={goAddCreator}>Add a recipe creator.</button>
//         </div>
//         ):(  
//           <div> 
//             <h2>Add a Creator now!</h2>
//             <button onClick={goAddCreator}>Add a recipe creator.</button>
//           </div>
//         )}
//       </div>
//     </>
// )}

// export default CreatorViewComponent