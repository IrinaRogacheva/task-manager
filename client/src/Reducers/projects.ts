import { PayloadAction } from "@reduxjs/toolkit";
import { ADD_PROJECT, DELETE_PROJECT, GET_PROJECTS, UPDATE_PROJECT } from "../Actions/types";
import { Project } from '../entries';
  
const initialState: Array<Project> = [];

  function projectsReducer(projects = initialState, action: PayloadAction<any>): Array<Project> {
    const { type, payload } = action;
  
    switch (type) {
      case ADD_PROJECT:
        return [...projects, payload];
  
      case GET_PROJECTS:
        return payload;
  
      case UPDATE_PROJECT:
        return projects.map((project) => {
          if (project.id_project === payload.id_project) {
            return {
              ...project,
              ...payload,
            };
          } else {
            return project;
          }
        });
  
      case DELETE_PROJECT:
        return projects.filter(project => project.id_project !== payload);
  
      default:
        return projects;
    }
  };
  
  export default projectsReducer;