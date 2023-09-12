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

  return (
  <>
    <Box>
      <Typography variant="h4" sx={{ m: 1 }} >{currentRecipe.title}</Typography>
      <Typography variant="body1" sx={{ m: 1 }} ><strong>Description: </strong>{currentRecipe.description}</Typography>
      <Typography variant="body1" sx={{ m: 1 }} >
        <strong>Region: </strong>
        {currentRecipe.region &&
          currentRecipe.region.map((region) => (
            <>
              {region.regionName}&nbsp;&nbsp;
            </>
          ) 
        )}
      </Typography>
      <Typography variant="body1" sx={{ m: 1 }} >
        <strong>Country: </strong>
          {currentRecipe.region &&
            currentRecipe.region.map((region) => (
              <>
                {region.country}&nbsp;&nbsp;
              </>
            ) 
          )}
        </Typography>
        <Typography variant="body1" sx={{ m: 1 }} >
          <strong>Recipe Creator: </strong>
          {currentRecipe.creator &&
            currentRecipe.creator.map((creator) => (
              <>
                {creator.creatorName}&nbsp;&nbsp;
              </>
            )
          )}
        </Typography>

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

      {/* <Accordion.Item eventKey="1">
        <Accordion.Header>Region</Accordion.Header>
        <Accordion.Body>
          <RegionViewComponent />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Recipe Creator</Accordion.Header>
        <Accordion.Body>
          <CreatorViewComponent />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Recipe Pairings</Accordion.Header>
        <Accordion.Body>
          <PairingViewComponent />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion> */}

  
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