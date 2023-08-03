import http from "../http-common";

//Create new creator recipe association
const create = data => {
    return http.post("/creatorRecipes", data);
  };

//Get all recipes with creators
const getAllCreatorRecipes = () => {
  return http.get("/creatorRecipes");
};

//Get all recipes with creators
const getAllRecipeCreators = () => {
    return http.get("/creatorRecipes/recipes");
  };

//Get one creator with recipes
const getCreatorRecipes = id => {
  return http.get(`/creatorRecipes/${id}`);
};

//Get one recipe with creators
const getRecipeCreators = id => {
    return http.get(`/creatorRecipes/recipes/${id}`);
  };

//Remove creator from recipe
const removeCreator = (recipeId, creatorId) => {
  return http.delete(`/creatorRecipes/${recipeId}/${creatorId}`);
};

const CreatorRecipeService = {
  create,
  getAllCreatorRecipes,
  getAllRecipeCreators,
  getCreatorRecipes,
  getRecipeCreators,
  removeCreator
};

export default CreatorRecipeService;