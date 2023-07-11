import http from "../http-common";

const getAll = () => {
  return http.get("/regions");
};

const get = id => {
  return http.get(`/regions/${id}`);
};

const create = data => {
  return http.post("/regions", data);
};

const update = (id, data) => {
  return http.put(`/regions/${id}`, data);
};

const remove = id => {
  return http.delete(`/regions/${id}`);
};

const removeAll = () => {
  return http.delete(`/regions`);
};

const RegionService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};

export default RegionService;