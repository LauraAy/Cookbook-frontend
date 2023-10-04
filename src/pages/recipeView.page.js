import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import EverythingDataService from "../services/everything.service";
// import Accordion from 'react-bootstrap/Accordion';
import RecipeViewComponent from '../components/recipeView.component.js'
import RegionViewComponent from '../components/regionView.component.js'
import CreatorViewComponent from "../components/creatorView.component";
import PairingViewComponent from "../components/pairingView.component";
import { Accordion, AccordionSummary, AccordionDetails, Box, Button, Typography} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
// import { makeStyles } from "@material-ui/core/styles";


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

  //filters for regionName
  var regionMap = currentRecipe.region?.map ((region) => region.regionName)
  var regionFil = regionMap?.filter(elements => {
    return elements !== null;
   });

  var regionClean = Array.from(new Set(regionFil));


  return (
  <>
    <Typography variant="h4" sx={{ m: 1 }} >{currentRecipe.title}</Typography>
    <Box mx={4} mt={2} mb={4}>
      <Typography variant="body1" sx={{ m: 1 }} ><strong>Description: </strong>{currentRecipe.description}</Typography>
      <Typography variant="body1" sx={{ m: 1 }} >
        {regionClean &&
        <>
          {regionClean.length > 1 ? (
          <>
            <strong>Regions: </strong>
            {regionClean.map((regionName, index) =>
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
              <>
                {regionClean}
              </>
          
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
        {currentRecipe.creator &&
        <>
          {currentRecipe.creator.length > 1 ? (
          <>
            <strong>Creators: </strong>
            {currentRecipe.creator.map((creator, index) =>
            <>
              {creator.creatorName && (
              <>
                {(index ? ', ' : '') + creator.creatorName }
              </>
              )} 
            </>
            )}
          </>
          ):(
          <>
            {currentRecipe.creator.map((creator, index) =>
            <>
              <strong>creator: </strong>
              <>
                {creator.creatorName}
              </>
            </>
            )}
           
          
          </>
          )}
        </>
        }
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
        <Typography variant="h5" align="center" sx={{width: '100%'}} >Full Recipe</Typography>
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
        <Typography variant="h5" align="center" sx={{width: '100%'}}>Region Details</Typography>
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
        <Typography variant="h5" align="center" sx={{width: '100%'}} >Recipe Creator Details</Typography>
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
        <Typography variant="h5" align="center" sx={{width: '100%'}}>Recipe Pairing Details</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <PairingViewComponent />
      </AccordionDetails>
    </Accordion>  
    <Link
      to={"/user/recipes/" }
      className="badge badge-warning"
    >
      <Button 
        variant="outlined"
        sx={{ mx: 2, my: 4 }}
      >
        View your recipes.
      </Button>
    </Link>
    <Link
      to={"/recipes/"}
      className="badge badge-warning"
    >
      <Button 
        variant="outlined"
        sx={{m: 2}}
      >
        View all recipes.
      </Button>
    </Link>
  
</>
)}

export default RecipeViewPage