import { Task } from "../entries";
import http from "../http-common";

class TasksDataService {
  getAll() {
    return http.get('/get_tasks');
  }

/*
  get(id) {
    return http.get(`/tutorials/${id}`);
  }
*/
  addTask(task: Task) {
    return http.post("/add_task", task);
  }
/*
  update(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tutorials/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }*/
}

export default new TasksDataService();