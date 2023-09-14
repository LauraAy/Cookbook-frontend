import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import EverythingDataService from "../services/everything.service";
// import Accordion from 'react-bootstrap/Accordion';
import RecipeViewComponent from '../components/recipeView.component.js'
import RegionViewComponent from '../components/regionView.component.js'
import CreatorViewComponent from "../components/creatorView.component";
import PairingViewComponent from "../components/pairingView.component";
import { Accordion, AccordionSummary, AccordionDetails, Box, Typography} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const RecipeViewPage = params => {
  const { id } = useParams();
  const [currentRecipe, setCurrentRecipe] = useState ([]);

  const getRecipeEverything = id => {
    EverythingDataService.getRecipeEverything(id)
    .then(response => {
      setCurrentRecipe(response.data);
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };
  
  useEffect(() => {
    if(id)
    getRecipeEverything(id);
  }, [id]);

  var regionMap = currentRecipe.region?.map ((region) => region.regionName)
  var regionFil = regionMap?.filter(elements => {
    return elements !== null;
   });


  // let filteredMap = currentRecipe.region.map((region) => (region))
  // const filteredRegion = Array.from(new Set(currentRecipe.region.map((currentRecipeFil) => currentRecipeFil.regionName)))
  // .map((filRecipe) => (filRecipe))

  // console.log([filteredMap])
  // console.log([filteredRegion])
  
  console.log(regionFil)

  return (
  <>
    <Box>
      <Typography variant="h4" sx={{ m: 1 }} >{currentRecipe.title}</Typography>
      <Box mx={4} my={2} >
      <Typography variant="body1" sx={{ m: 1 }} ><strong>Description: </strong>{currentRecipe.description}</Typography>
      <Typography variant="body1" sx={{ m: 1 }} >
        {regionFil &&
        <>
          {regionFil.length > 1 ? (
          <>
            <strong>Regions: </strong>
            {regionFil.map((regionName, index) =>
            <>
              {regionName && (
              <>
                {(index ? ', ' : '') + regionName }
              </>
              )} 
            </>
            )}
          </>
          ):(
          <>
            <strong>Region: </strong>
            {currentRecipe.region.map((region) =>
              <>
                {region.regionName}
              </>
            )}
          </>
          )}
        </>
        }
      </Typography>
      <Typography variant="body1" sx={{ m: 1 }} >
        {currentRecipe.region &&
        <>
          {currentRecipe.region.length > 1 ? (
          <>
            <strong>Countries: </strong>
            {currentRecipe.region.map((region, index) => 
            <>
              {region.country && (
              <>
                {(index ? ', ' : '') + region.country}
              </>
              )} 
            </>
            )}
          </>
          ):(
          <>
            <strong>Country: </strong>
            {currentRecipe.region.map((region, index) => 
              <>
                {region.country}
              </>
            )} 
          </>
          )}
        </>
        }
      </Typography>
      <Typography variant="body1" sx={{ m: 1 }} >
        <strong>Recipe Creator: </strong>
        {currentRecipe.creator &&
          currentRecipe.creator.map((creator) => (
            <>
              {creator.creatorName}
            </>
          )
        )}
      </Typography>
      <Typography variant="body1"sx={{ m: 1 }}>
        {currentRecipe.source && (
        <>
          <strong>Recipe Source: </strong>
          {currentRecipe.source}
        </>
        )}
      </Typography>
    </Box>

    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h5">Full Recipe</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <RecipeViewComponent />
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h5" textAlign="center">Region Details</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <RegionViewComponent />
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h5">Recipe Creator Details</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <CreatorViewComponent />
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h5">Recipe Pairing Details</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <PairingViewComponent />
      </AccordionDetails>
    </Accordion>  
    <Link
      to={"/user/recipes/" }
      className="badge badge-warning"
    >
      <button>
      View your recipes.
      </button>
    </Link>
    <Link
      to={"/recipes/"}
      className="badge badge-warning"
    >
      <button>
      View all recipes.
      </button>
    </Link>
  </Box>
</>
)}

export default RecipeViewPage