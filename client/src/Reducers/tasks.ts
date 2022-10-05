import { PayloadAction } from "@reduxjs/toolkit";
import { ifError } from "assert";
import { ADD_TASK, CLEAR_TRASH, GET_TASKS, TAKE_BACK_TASK, UPDATE_TASK } from "../Actions/types";
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

      case TAKE_BACK_TASK:
        console.log("take_back_task")
        if (tasks.length > 0) {
          let newTasksArray: Array<Task> = tasks.slice();
          newTasksArray.splice(payload.index, 0, payload.task);
          return newTasksArray
        } else {
          return [{ ...payload.task }];
        }
        
      case CLEAR_TRASH:
        return [];
  
      default:
        return tasks;
    }
  };
  
  export default tasksReducer;