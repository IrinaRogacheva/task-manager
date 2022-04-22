import { Project } from "../entries";
import http from "../http-common";

class ProjectsDataService {
  getProjects(idUser: number) {
    return http.get(`/get_projects/${idUser}`);
  }

  getById(id: number) {
    return http.get(`/get_project/${id}`);
  }

  getProjectNameById(id: number) {
    return http.get(`/get_project_name/${id}`);
  }

  getCountOfTasks(id: number) {
    return http.get(`/get_count_of_tasks_in_project/${id}`);
  }

  addProject(task: Project) {
    return http.post("/add_project", task);
  }

  addUserInProject(idUser: number, idProject: number) {
    return http.post("/add_user_in_project", {id_user: idUser, id_project: idProject});
  }

  deleteProject(idProject: number) {
    return http.delete(`/delete_project/${idProject}`);
  }

  updateProject(updatedProject: Project) {
    return http.put(`/update_project`, updatedProject);
  }
}

export default new ProjectsDataService();