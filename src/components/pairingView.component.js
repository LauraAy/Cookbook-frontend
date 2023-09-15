import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import PairingRecipeDataService from "../services/pairingRecipe.service";
import RecipeDataService from "../services/recipe.service";
import { Box, Button, Divider, Grid, Tooltip, Typography, } from '@mui/material';
import { Delete } from  '@mui/icons-material';

const PairingViewComponent = params => {
  const { id } = useParams();
  let navigate = useNavigate(); 

  const [currentRecipe, setCurrentRecipe] = useState ([]);
  const [ pairing, setPairing] = useState ([])
  const [recipeOne, setRecipeOne] = useState ([])
  const [recipeOneId, setRecipeOneId] = useState ("")
  const [recipeTwo, setRecipeTwo] = useState ([])
  const [recipeTwoId, setRecipeTwoId] = useState ("")
  const [recipeThree, setRecipeThree] = useState ([])
  const [recipeThreeId, setRecipeThreeId] = useState ("")
  const [recipes, setRecipes] = useState ([])

  //get up to three related recipes
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

  //get recipe pairing
  const getRecipePairings = id => {
    PairingRecipeDataService.getRecipePairings(id)
    .then(response => {
      setCurrentRecipe(response.data);
      setPairing(response.data.pairings)
      if(response.data.pairings.recipeOne !== null) {
        setRecipeOneId(response.data.pairings.recipeOne)
      }
      if(response.data.pairings.recipeTwo !== null) {
        setRecipeTwoId(response.data.pairings.recipeTwo)
      }
      if(response.data.pairings.recipeThree !== null) {
        setRecipeThreeId(response.data.pairings.recipeThree)
      }
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };

  useEffect(() => {
    if(id)
    getRecipePairings(id);
  }, [id]);


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

    // useEffect(() => {
    //   if (recipeTwoId) {
    //     getRecipeOne(recipeTwoId)
    //   } else {
    //     console.log("not there")
    //   }
    //   }, [recipeTwoId]);

    //   useEffect(() => {
    //     if (recipeThreeId) {
    //       getRecipeOne(recipeThreeId)
    //     } else {
    //       console.log("not there")
    //     }
    //     }, [recipeThreeId]);

  //navigation functions
  const goAddPairing = () => {
    navigate("/pairings/add/" + id)
  }

  const editPairing = () => {
    navigate("/pairings/edit/" + currentRecipe.id + "/" + pairing.id)
  }

  const recipeOneNav = () => {

    const recipeId = recipeOne.id
    
    navigate("/recipes/" + recipeId)
  };

  const recipeTwoNav = () => {

    const recipeId = recipeTwo.id
    
    navigate("/recipes/" + recipeId)
  };
  const recipeThreeNav = () => {

    const recipeId = recipeThree.id
    
    navigate("/recipes/" + recipeId)
  };

  const refreshPage = () => {
    navigate(0);
  }

  //Remove pairing from this recipe
  const removePairing = currentPairingId => {
    const recipeId = currentRecipe.id
    const pairingId = currentPairingId

    PairingRecipeDataService.removePairing(recipeId, pairingId)
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
    {pairing ? (
    <>
      <Box mt={2}>
        <Typography variant="h6" mx={4}>{pairing.pairingName}</Typography>
        <Box mx={4} mb={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <Typography variant="body1"sx={{ m: 1 }}>
                {pairing.description && (
                <>
                  <strong>Description: </strong>
                  {pairing.description}
                </>
                )}
              </Typography>
              <Typography variant="body1"sx={{ m: 1 }}>
                {pairing.drinks && (
                <>
                  <strong>Drinks: </strong>
                  {pairing.drinks}
                </>
                )}
              </Typography>
              <Typography variant="body1"sx={{ m: 1 }}>
                {pairing.shows && (
                <>
                  <strong>Shows: </strong>
                  {pairing.shows}
                </>
                )}
              </Typography>
              <Typography variant="body1"sx={{ m: 1 }}>
                {pairing.books && (
                <>
                  <strong>Books: </strong>
                  {pairing.books}
                </>
                )}
              </Typography>
              <Typography variant="body1"sx={{ m: 1 }}>
                {pairing.music && (
                <>
                  <strong>Music: </strong>
                  {pairing.music}
                </>
                )}
              </Typography>
              <Typography variant="body1"sx={{ m: 1 }}>
                {pairing.decor && (
                <>
                  <strong>Crafts and decor: </strong>
                  {pairing.decor}
                </>
                )}
              </Typography>
              <Typography variant="body1"sx={{ m: 1 }}>
                {pairing.recipeOne && (
                <>
                  <strong>Related Recipe 1: </strong>
                  {recipeOne.title}
                  <Button
                   onClick={recipeOneNav}
                  >
                    View Recipe
                  </Button>
                </>
                )}
              </Typography>
              <Typography variant="body1"sx={{ m: 1 }}>
                {pairing.recipeTwo && (
                <>
                  <strong>Related Recipe 2: </strong>
                  {recipeTwo.title}
                </>
                )}
              </Typography>
              <Typography variant="body1"sx={{ m: 1 }}>
                {pairing.recipeThree && (
                <>
                  <strong>Related Recipe 3: </strong>
                  {recipeThree.title}
                </>
                )}
              </Typography>
              <Tooltip title="Edit this pairing.">
                <Button
                  onClick={editPairing}
                  variant="outlined"
                  sx={{ my: 2 }}
                >
                  Edit Pairing
                </Button>
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Tooltip title="Remove this pairing from recipe.">
                <Button 
                  onClick={() => {removePairing(pairing.id)}}
                  variant="outlined"
                  color="error"
                  startIcon={<Delete />}
                >
                  Remove
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
        <Divider></Divider>
      </Box>
    </>
    ):(
    <>
      <Typography variant="h6">Add a recipe pairing for this recipe now!</Typography>
      <Typography variant="subtitle1">Drinks? Music? Decor? Add all the things to pair 
      with this recipe for the perfect meal.</Typography>
      <Tooltip title="Add a pairing to this recipe.">
        <Button 
          onClick={goAddPairing}
          variant="contained"
          sx={{ m: 2 }}
        >
          Add Pairing
        </Button>
      </Tooltip>
    </>
    )}
  </>
  )
}
    
 

//       <div>
//         {pairing.length ? (
//           <div >
//             {/* <button onClick={(getRecipes)}>TEST</button> */}
//             <h2> {pairing.pairingName} </h2>
//             {pairing.description && (
//               <div>
//                 <label>
//                   <strong>Description:</strong>
//                 </label>{" "}
//                 {pairing.description}
//               </div>
//             )}
//             {pairing.drinks && (
//               <div>
// 								<label>
//                   <strong>Drinks:</strong>
//                 </label>{" "}
// 								{pairing.drinks}
//               </div>
//             )}
// 						{pairing.shows && (
//               <div>
//                 <label>
//                   <strong>Shows:</strong>
//                 </label>{" "}
//                 {pairing.shows}
//               </div>
//             )}
// 						{pairing.books && (
//               <div>
//                 <label>
//                   <strong>Books:</strong>
//                 </label>{" "}
//                 {pairing.books}
//               </div>
//             )}
// 						{pairing.music && (
//               <div>
//                 <label>
//                   <strong>Music:</strong>
//                 </label>{" "}
//                 {pairing.music}
//               </div>
//             )}
// 						{pairing.decor && (
//               <div>
//                 <label>
//                   <strong>Decor:</strong>
//                 </label>{" "}
//                 {pairing.decor}
//               </div>
//             )}
// 						{pairing.recipeOne && (
//               <div>
//                 <label>
//                   <strong>Related Recipe 1:</strong>
//                 </label>{" "}
//                  <Link to={"/recipes/" + recipeOne.id}>
//                   {recipeOne.title}
//                 </Link>
//                 <br></br>
//                 <br></br>
//               </div>
//             )}
//             {pairing.recipeTwo && (
//               <div>
//                 <label>
//                   <strong>Related Recipe 2:</strong>
//                 </label>{" "}
//                  <Link to={"/recipes/" + recipeTwo.id}>
//                   {recipeTwo.title}
//                 </Link>
//                 <br></br>
//                 <br></br>
//               </div>
//             )}
//              {pairing.recipeThree && (
//               <div>
//                 <label>
//                   <strong>Related Recipe 3:</strong>
//                 </label>{" "}
//                  <Link to={"/recipes/" + recipeThree.id}>
//                   {recipeThree.title}
//                 </Link>
//                 <br></br>
//                 <br></br>
//               </div>
//             )}
//             	{pairing.more && (
//               <div>
//                 <label>
//                   <strong>More:</strong>
//                 </label>{" "}
//                 {pairing.more}
//               </div>
//             )}
//             <Link to={"/pairings/edit/" + currentRecipe.id + "/" + pairing.id}>
// 							<button>Edit This Recipe Pairing</button>
//             </Link>
//             <br></br>
//             <br></br>
//             <button onClick={() => {removePairing(pairing.id)}}>Remove Pairing from This Recipe </button>
//             <br></br>
//             <br></br>
// 					</div>
//         ):(  
//           <div> 
//             <h2>Add a Pairing now!</h2>
//             <button onClick={goAddPairing}>Add a recipe pairing.</button>
//           </div>
//         )}
//       </div>
//     </>
// )}

export default PairingViewComponent