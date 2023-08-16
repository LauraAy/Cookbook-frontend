import React, { useState, useEffect } from "react";
import recipeDataService from "../services/recipe.service";
import { Link } from "react-router-dom";
import { Autocomplete, TextField, Pagination} from '@mui/material';
import { Box, List, Tag, ListItem, Divider } from "@chakra-ui/react";
import usePagination from "../utils/pagination.util";


const RecipesAll = ()=> {
  //variables for set data and search status
  const [recipes, setRecipes] = useState ([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  
//retrieve recipe function and useEffect to run retrieve recipes on load
  useEffect(() => {
  retrieveRecipes();
}, []);

const retrieveRecipes = () => {
  recipeDataService.getAll()
  .then(response => {
    setRecipes(response.data);
    console.log(response.data);
  })
  .catch(e => {
    console.log(e);
  });
};

//variables for set up pagination
let [page, setPage] = useState(1);
const PER_PAGE = 5;
const count = Math.ceil(recipes.length / PER_PAGE);
const _DATA = usePagination(recipes, PER_PAGE);
// const refreshList = () => {
//   retrieveRecipes();
//   setCurrentRecipe(null);
//   setCurrentIndex(-1);
// };

//
const handleChange = (e, p) => {
  setPage(p);
  _DATA.jump(p);
};
//set recipe as active on click
const setActiveRecipe = (recipe, index) => {
  setCurrentRecipe(recipe);
  setCurrentIndex(index);
};

//title search
const findByTitle = () => {
  const searchTitle = selectedRecipe.title
  console.log(selectedRecipe.title)
  recipeDataService.findByTitle(searchTitle)
  .then (response => {
    setRecipes(response.data);
    setSearchActive(true)
    setCurrentRecipe(null)
    console.log(response.data);
  })
  .catch(e => {
    console.log(e);
  });
};

//reset to initial state
const resetAll = () => {
  retrieveRecipes()
  setSearchActive(false)
}
return (
  <div>
    <Box p="5">
    <Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />

      <List p="10" pt="3" spacing={2}>
        {_DATA.currentData().map(v => {
          return (
            <ListItem key={v.title} listStyleType="disc">
              <span>{v.title}: </span>{" "}
              <Divider display="inline" orientation="vertical" />
              <span> {v.description}</span>{" "}
              <Divider display="inline" orientation="vertical" />
              {/* <span>
                <Tag color="#0f4211">${v.msrp}</Tag>
              </span> */}
            </ListItem>
          );
        })}
      </List>

      <Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
      </Box>


  <div className="list row">
    <div>
      {searchActive ? (
        <div>
          <div className="col-md-8">
            <button onClick={resetAll}>Return to all recipes</button>
          </div>
        </div>
      ):(
        <div>
          <div className="col-md-8">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options = {recipes.map((recipe) => recipe)}
              getOptionLabel={(recipe) => recipe.title }
              onChange={(event, value) => setSelectedRecipe(value)}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Search Recipe Titles" />}
            />
            <button onClick={findByTitle}>Search</button>
            <br></br>
            <br></br>
          </div>
        </div>
      )}
    </div>
    <div className="col-md-6">
        <h4>Recipes List</h4>

        <ul className="list-group">
          {recipes &&
          recipes.map((recipe, index) => (
            <li
              className={
                "list-group-item " + (index === currentIndex ? "active" : "")
                }
              onClick={() => setActiveRecipe(recipe, index)}
              key={index}
            >
              <div>
                <strong>
                {recipe.title}
                </strong>
              </div>
              <div>
                {recipe.description}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="col-md-6">
        {currentRecipe ? (
          <div>
            <h4>Recipe</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentRecipe.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentRecipe.description}
            </div>
            <div>
              <label>
                <strong>Recipe Type:</strong>
              </label>{" "}
              {currentRecipe.recipeType}
              </div>
            <div>
              <label>
                <strong>ServingSize:</strong>
              </label>{" "}
              {currentRecipe.servingSize}
            </div>
            <div>
              <label>
                <strong>Ingredients:</strong>
              </label>{" "}
              {currentRecipe.ingredients}
            </div>
            <div>
              <label>
                <strong>Directions:</strong>
              </label>{" "}
              {currentRecipe.directions}
            </div>
            <div>
              <label>
                <strong>Contributed by:</strong>
              </label>{" "}
               ?
            </div>

            <Link
              to={"/recipes/" + currentRecipe.id}
            >
              <button>
              View Full Recipe
              </button>
            </Link>
            <Link
           
              to={"/recipes/edit/" + currentRecipe.id}
              className="badge badge-warning"
            >
              <button>
              Edit
              </button>
            </Link>
          </div>
          ) : (
          <div>
            <br />
              <p>Please click on a recipe...</p>
          </div>
          )}
        </div>
      </div>
    </div>
    );
  }

  export default RecipesAll;