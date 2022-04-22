import { PayloadAction } from "@reduxjs/toolkit";
import { SET_CURRENT_TASK_TAB, UPDATE_CURRENT_TASK } from "../Actions/types";
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
    id_tags: [],
    id_author: 1,
    status: 0,
  };

  function currentTaskReducer(task = initialState, action: PayloadAction<any>): Task {
    const { type, payload } = action;
  
    switch (type) {
        case SET_CURRENT_TASK_TAB:
            return {...payload}

        case UPDATE_CURRENT_TASK:
            return {...task, ...payload}

      default:
        return task;
    }
  };
  
  export default currentTaskReducer;