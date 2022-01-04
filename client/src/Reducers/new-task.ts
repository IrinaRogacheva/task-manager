import { PayloadAction } from "@reduxjs/toolkit";
import { SET_PRIORITY, SET_TASK_DATE, SET_TASK_NAME } from "../Actions/types";
import { Task } from '../entries';
  
const initialState: Task = {
    id_task: 0,
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
        return {...task, name: payload};

      case SET_TASK_DATE:
        console.log('in SET_TASK_DATE reducer: ' + payload)
        return {...task, date: payload};

      default:
        return task;
    }
  };
  
  export default newTaskReducer;