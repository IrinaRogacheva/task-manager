import { PayloadAction } from "@reduxjs/toolkit";
import { SET_PRIORITY, SET_PROJECT, ADD_TAG_TO_NEW_TASK, SET_TASK_DATE, SET_TASK_NAME, CLEAR_TAGS_LIST, DELETE_TAG_TO_NEW_TASK, SET_AUTHOR_ID } from "../Actions/types";
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

  function newTaskReducer(task = initialState, action: PayloadAction<any>): Task {
    const { type, payload } = action;
  
    switch (type) {
      case SET_AUTHOR_ID:
        return {...task, id_author: payload};

      case SET_PRIORITY:
        return {...task, priority: payload};

      case SET_TASK_NAME:
        return {...task, name: payload};

      case SET_TASK_DATE:
        return {...task, date: payload};

      case SET_PROJECT:
        return {...task, id_project: payload};

      case ADD_TAG_TO_NEW_TASK:
        return {...task, id_tags: [...task.id_tags, payload]};  

      case DELETE_TAG_TO_NEW_TASK:
        return {...task, id_tags: task.id_tags.filter(tag => tag.id_tag !== payload)};

      case CLEAR_TAGS_LIST:
        return {...task, id_tags: []};

      default:
        return task;
    }
  };
  
  export default newTaskReducer;