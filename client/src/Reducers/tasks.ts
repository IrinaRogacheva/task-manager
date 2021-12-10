import { PayloadAction } from "@reduxjs/toolkit";
import { ADD_TASK, GET_TASKS } from "../Actions/types";
import { Task } from '../entries';
  
const initialState: Array<Task> = [];

  function tasksReducer(tasks = initialState, action: PayloadAction<any>): Array<Task> {
    const { type, payload } = action;
  
    switch (type) {
      case ADD_TASK:
        return [...tasks, payload];
  
      case GET_TASKS:
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
        return tasks;
    }
  };
  
  export default tasksReducer;