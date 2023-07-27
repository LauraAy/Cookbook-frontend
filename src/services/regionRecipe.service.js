import http from "../http-common";

//Create new region recipe association
const create = data => {
    return http.post("/regionRecipes", data);
  };

//Get all recipes with regions
const getAllRegionRecipes = () => {
  return http.get("/regionRecipes");
};

//Get all recipes with regions
const getAllRecipeRegions = () => {
    return http.get("/regionRecipes/recipes");
  };

//Get one region with recipes
const getRegionRecipes = id => {
  return http.get(`/regionRecipes/${id}`);
};

//Get one recipe with regions
const getRecipeRegions = id => {
    return http.get(`/regionRecipes/recipes/${id}`);
  };

const removeRegion = () => {
  return http.delete(`/regionRecipes`);
};

const RegionRecipeService = {
  create,
  getAllRegionRecipes,
  getAllRecipeRegions,
  getRegionRecipes,
  getRecipeRegions,
  removeRegion
};

export default RegionRecipeService;