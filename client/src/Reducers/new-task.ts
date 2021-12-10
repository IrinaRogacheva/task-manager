import { PayloadAction } from "@reduxjs/toolkit";
import { SET_PRIORITY, SET_TASK_NAME } from "../Actions/types";
import { Task } from '../entries';
  
const initialState: Task = {
    id_task: null,
    name: "",
    description: null,
    date: null,
    time: null,
    priority: 0,
    id_parent_task: null,
    id_project: null,
    id_author: 1
  };

  function newTaskReducer(task = initialState, action: PayloadAction<any>): Task {
    const { type, payload } = action;
  
    switch (type) {
      case SET_PRIORITY:
        return {...task, priority: payload};

      case SET_TASK_NAME:
        console.log('in SET_TASK_NAME reducer: ' + payload)
        return {...task, name: payload};

      default:
        return task;
    }
  };
  
  export default newTaskReducer;