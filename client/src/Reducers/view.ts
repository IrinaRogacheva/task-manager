import { PayloadAction } from "@reduxjs/toolkit";
import { SET_CREATE_PROJECT, SET_CREATE_TAG, SET_CURRENT_PROJECT_ID, SET_CURRENT_TAB, SET_CURRENT_TAG_ID, SET_CURRENT_TASK, SET_CURRENT_TASK_TAB, SET_DELETED_ID_TASK, SET_DELETED_MESSAGE_VISIBILITY, SET_DELETED_TASK_INDEX, SET_DONE_ID_TASK, SET_DONE_MESSAGE_VISIBILITY, SET_DONE_TASK_INDEX, SET_UPDATE_PROJECT, SET_UPDATE_TAG, SET_UPDATING_ID, TOGGLE_SIDEDEBAR_VISIBILITY } from "../Actions/types";
import { View } from '../entries';

const initialState: View = {
    sidebarVisibility: true,
    doneTaskMessageVisibility: false,
    deletedTaskMessageVisibility: false,
    idTaskDone: 0,
    idTaskDeleted: 0,
    doneTaskIndex: 0,
    deletedTaskIndex: 0,
    currentTab: "incoming",
    currentTabProjectId: 0,
    currentTabTagId: 0,
    currentTaskId: null,
    countOfIncoming: 0,
    countOfToday: 0,
    isCreateProject: false,
    isCreateTag: false,
    isUpdateProject: false,
    isUpdateTag: false,
    updatingId: 0,
  };

  function viewReducer(view = initialState, action: PayloadAction<any>): View {
    const { type, payload } = action;
  
    switch (type) {
      case TOGGLE_SIDEDEBAR_VISIBILITY:
        return {...view, sidebarVisibility: payload};

      case SET_DONE_MESSAGE_VISIBILITY:
        return {...view, doneTaskMessageVisibility: payload};

      case SET_DELETED_MESSAGE_VISIBILITY:
        return {...view, deletedTaskMessageVisibility: payload};

      case SET_DONE_ID_TASK:
        return {...view, idTaskDone: payload};

      case SET_DELETED_ID_TASK:
        return {...view, idTaskDeleted: payload};

      case SET_DONE_TASK_INDEX:
        return {...view, doneTaskIndex: payload};
  
      case SET_DELETED_TASK_INDEX:
        return {...view, deletedTaskIndex: payload};

      case SET_CURRENT_TAB:
        return {...view, currentTab: payload};

      case SET_CURRENT_PROJECT_ID:
        return {...view, currentTabProjectId: payload};

      case SET_CURRENT_TAG_ID:
        return {...view, currentTabTagId: payload};
        
      case SET_CURRENT_TASK:
        return {...view, currentTaskId: payload};

      case SET_CREATE_PROJECT:
        return {...view, isCreateProject: payload};

      case SET_CREATE_TAG:
        return {...view, isCreateTag: payload};

      case SET_UPDATE_PROJECT:
        return {...view, isUpdateProject: payload};

      case SET_UPDATE_TAG:
        return {...view, isUpdateTag: payload}

      case SET_UPDATING_ID:
        return {...view, updatingId: payload};
      
      default:
        return view;
    }
  };
  
  export default viewReducer;