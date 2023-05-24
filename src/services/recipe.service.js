import http from "../http-common";

const getAll = () => {
  return http.get("/recipes");
};

const get = id => {
  return http.get(`/recipes/${id}`);
};

const create = data => {
  return http.post("/recipes", data);
};

const update = (id, data) => {
  return http.put(`/recipes/${id}`, data);
};

// const addRegion = (id, regionData) => {
//   return http.put(/'recipes/addregion/$id', regionData);
// };

const remove = id => {
  return http.delete(`/recipes/${id}`);
};

const removeAll = () => {
  return http.delete(`/recipes`);
};

const findByTitle = title => {
  return http.get(`/recipes?title=${title}`);
};

const RecipeService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
  // addRegion
};

export default RecipeService;