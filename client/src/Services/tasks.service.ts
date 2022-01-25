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

  getTasksOfProject(projectId: number) {
    return http.get(`/get_tasks_of_project/${projectId}`);
  }

  getTasksOfTag(tagId: number) {
    return http.get(`/get_tasks_of_tag/${tagId}`);
  }

  getTodayTasks() {
    const date = moment().format('YYYY-MM-DD')
    return http.get(`/get_today_tasks/${date}`);
  }

  getById(id:number) {
    return http.get(`/get_task_by_id/${id}`);
  }

  addTask(task: Task) {
    return http.post("/add_task", task);
  }

  updateStatus(id: number, data: any) {
    return http.put(`/update_task_status/${id}`, data);
  }

  updateName(id: number, data: any) {
    return http.put(`/update_task_name/${id}`, data);
  }

  addTagToTask(idTask: number, idTag: number) {
    return http.post(`/add_tag_to_task`, {id_task: idTask, id_tag: idTag});
  }

  getTasksWithTags() {
    return http.get(`/get_tasks_with_tags`);
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