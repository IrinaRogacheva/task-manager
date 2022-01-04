import moment from "moment";
import { Task } from "../entries";
import http from "../http-common";

class TasksDataService {
  getAll() {
    return http.get('/get_tasks');
  }

  getCountOfIncoming() {
    return http.get('/get_count_of_incoming');
  }

  getCountOfToday() {
    const date = moment().format('YYYY-MM-DD')
    return http.get(`/get_count_of_today/${date}`);
  }

  getDoneTasks() {
    return http.get('/get_done_tasks');
  }

  getDeletedTasks() {
    return http.get('/get_deleted_tasks');
  }

  getTodayTasks() {
    const date = moment().format('YYYY-MM-DD')
    return http.get(`/get_today_tasks/${date}`);
  }

/*
  get(id) {
    return http.get(`/tutorials/${id}`);
  }
*/
  addTask(task: Task) {
    return http.post("/add_task", task);
  }

  update(id: number, data: any) {
    return http.put(`/update_task/${id}`, data);
  }
/*
  delete(id) {
    return http.delete(`/tutorials/${id}`);
  }
*/
  clearTrash() {
    return http.delete(`/delete_tasks`);
  }
/*
  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }*/
}

export default new TasksDataService();