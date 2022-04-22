import { PayloadAction } from "@reduxjs/toolkit";
import { ADD_TASK, CLEAR_TRASH, GET_TASKS, UPDATE_TASK } from "../Actions/types";
import { Task } from '../entries';

const initialState: Array<Task> = [];

  function tasksReducer(tasks = initialState, action: PayloadAction<any>): Array<Task> {
    const { type, payload } = action;
  
    switch (type) {
      case ADD_TASK:
        return [payload, ...tasks];
  
      case GET_TASKS:
        return payload;
  
      case UPDATE_TASK:
        if (payload.status !== 0)
        {
          return tasks
          .filter(task => task.id_task !== payload.id_task)
        }
        return tasks
          .map((task) => {
          if (task.id_task === payload.id_task) {
            return {
              ...payload,
            };
          } else {
            return task;
          }
        });

      case CLEAR_TRASH:
        return [];
  
      default:
        return tasks;
    }
  };
  
  export default tasksReducer;