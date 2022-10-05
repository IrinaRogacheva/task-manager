import moment from "moment";
import { Task, TaskToDB } from "../entries";
import http from "../http-common";

class TasksDataService {
  getAll(idAuthor: number) {
    return http.get(`/get_tasks/${idAuthor}`);
  }

  getCountOfIncoming(idAuthor: number) {
    return http.get(`/get_count_of_incoming/${idAuthor}`);
  }

  getCountOfToday(idAuthor: number) {
    const date = moment().format('YYYY-MM-DD')
    return http.get(`/get_count_of_today/${date}/${idAuthor}`);
  }

  getDoneTasks(idAuthor: number) {
    return http.get(`/get_done_tasks/${idAuthor}`);
  }

  getDeletedTasks(idAuthor: number) {
    return http.get(`/get_deleted_tasks/${idAuthor}`);
  }

  getTasksOfProject(projectId: number) {
    return http.get(`/get_tasks_of_project/${projectId}`);
  }

  getTasksOfTag(tagId: number) {
    return http.get(`/get_tasks_of_tag/${tagId}`);
  }

  getTodayTasks(idAuthor: number) {
    const date = moment().format('YYYY-MM-DD')
    return http.get(`/get_today_tasks/${date}/${idAuthor}`);
  }

  getById(id:number) {
    return http.get(`/get_task_by_id/${id}`);
  }

  addTask(task: TaskToDB) {
    return http.post("/add_task", task);
  }

  updateStatus(id: number, data: any) {
    return http.put(`/update_task_status/${id}`, data);
  }

  updatePriority(id: number, data: any) {
    return http.put(`/update_task_priority/${id}`, data);
  }

  updateDescription(id: number, data: any) {
    return http.put(`/update_task_description/${id}`, data);
  }

  updateProject(id: number, data: any) {
    return http.put(`/update_task_project/${id}`, data);
  }

  updateName(id: number, data: any) {
    return http.put(`/update_task_name/${id}`, data);
  }

  addTagToTask(idTask: number, idTag: number) {
    return http.post(`/add_tag_to_task`, {id_task: idTask, id_tag: idTag});
  }

  deleteTagFromTask(idTask: number, idTag: number) {
    return http.delete(`/delete_tag_from_task/${idTask}/${idTag}`);
  }

  getTasksWithTags(idAuthor: number) {
    return http.get(`/get_tasks_with_tags/${idAuthor}`);
  }

  clearTrash(idAuthor: number) {
    return http.delete(`/delete_tasks/${idAuthor}`);
  }

  searchTask(idUser: number, findBy: string) {
    return http.get(`/search_tasks/${findBy}/${idUser}`);
  }

/*
  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }*/
}

export default new TasksDataService();