import http from "../http-common";

class RecipeDataService {
    getAll() {
        return http.get("/recipes");
    }

    get(id) {
        return http.get(`/recipes/${id}`);
      }

    create(data) {
        return http.post("/recipes", data);
    }

    update(id, data) {
        return http.put(`/tutorials/${id}`, data);
      }

      delete(id) {
        return http.delete(`/tutorials/${id}`);
      }

    deleteAll() {
        return http.delete('/recipes');
    }

    findByTitle(title) {
        return http.get(`/tutorials?title=${title}`);
      }
}

export default new RecipeDataService();