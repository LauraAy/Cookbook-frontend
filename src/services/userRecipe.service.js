import http from "../http-common";

//Get all recipes with userId
const findUserRecipes = id => {
  return http.get(`/userRecipes/${id}`)
};

//Get all recipes with userId by title
const findByTitle = (id, title) => {
    return http.get(`/userRecipes/titleSearch/${id}?title=${title}`);
  };

//Get all creators with recipes by userId 
const findUserRecipeCreators = id => {
  return http.get(`userRecipes/creators/${id}`)
}

//Get all regions with recipes by creatorName and user id
const findByCreatorName = creatorName => {
    return http.get(`/userRecipes/creatorSearch?creatorName=${creatorName}`);
  };

//Get all regions with recipes by userId 
const findUserRecipeRegions = id => {
  return http.get(`userRecipes/regions/${id}`)
}

//Get all regions with recipes by country and user id 
const findByCountry = country => {
  return http.get(`/userRecipes/regionSearch?country=${country}`);
};

//Get all regions with recipes by regionName and user id
const findByRegionName = regionName => {
    return http.get(`/userRecipes/regionSearch?regionName=${regionName}`);
  };
  

const RegionRecipeService = {
  findUserRecipes,
	findByTitle,
  // findUserRecipeCreators,
	findByCreatorName,
  findByCountry,
  findByRegionName,
};

export default RegionRecipeService;