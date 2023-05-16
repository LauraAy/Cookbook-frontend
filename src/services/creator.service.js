import http from "../http-common";

class creatorDataService {
  getAll() {
    return http.get("/creators");
  }

  get(id) {
    return http.get(`/creators/${id}`);
  }

  create(data) {
    return http.post("/creators", data);
  }

  update(id, data) {
    return http.put(`/creators/${id}`, data);
  }

  delete(id) {
    return http.delete(`/creators/${id}`);
  }

  deleteAll() {
    return http.delete(`/creators`);
  }
 
}

export default new creatorDataService();