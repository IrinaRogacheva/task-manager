import { ADD_PROJECT, DELETE_PROJECT, GET_PROJECTS, UPDATE_PROJECT } from "./types";
import ProjectsDataService from "../Services/projects.service";
import { AppDispatch } from "../store";
import { Project} from "../entries";

export const getProjects = () => async (dispatch: AppDispatch) => {
    try {
        const res = await ProjectsDataService.getProjects();

        dispatch({
            type: GET_PROJECTS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const addProject = (project: Project) => async (dispatch: AppDispatch) => {
    try {
        const res = await ProjectsDataService.addProject(project);
        const insertedProject = await ProjectsDataService.getById(res.data.insertId);
  
        dispatch({
            type: ADD_PROJECT,
            payload: insertedProject.data[0],
        });
  
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deleteProject = (idProject: number) => async (dispatch: AppDispatch) => {
    try {
        const res = await ProjectsDataService.deleteProject(idProject);
  
        dispatch({
            type: DELETE_PROJECT,
            payload: idProject,
        });
  
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const updateProject = (updatedProject: Project) => async (dispatch: AppDispatch) => {
    try {
      const res = await ProjectsDataService.updateProject(updatedProject);

      dispatch({
        type: UPDATE_PROJECT,
        payload: updatedProject,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };