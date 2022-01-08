import { PayloadAction } from "@reduxjs/toolkit";
import { ADD_PROJECT, GET_PROJECTS } from "../Actions/types";
import { Project } from '../entries';
  
const initialState: Array<Project> = [];

  function projectsReducer(projects = initialState, action: PayloadAction<any>): Array<Project> {
    const { type, payload } = action;
  
    switch (type) {
      case ADD_PROJECT:
        return [...projects, payload];
  
      case GET_PROJECTS:
        return payload;
  /*
      case UPDATE_TUTORIAL:
        return tutorials.map((tutorial) => {
          if (tutorial.id === payload.id) {
            return {
              ...tutorial,
              ...payload,
            };
          } else {
            return tutorial;
          }
        });
  
      case DELETE_TUTORIAL:
        return tutorials.filter(({ id }) => id !== payload.id);
  
      case DELETE_ALL_TUTORIALS:
        return [];*/
  
      default:
        return projects;
    }
  };
  
  export default projectsReducer;