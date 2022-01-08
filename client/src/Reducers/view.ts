import { PayloadAction } from "@reduxjs/toolkit";
import { SET_CREATE_PROJECT, SET_CREATE_TAG, SET_CURRENT_PROJECT_ID, SET_CURRENT_TAB, SET_CURRENT_TAG_ID, SET_DELETED_ID_TASK, SET_DELETED_MESSAGE_VISIBILITY, SET_DONE_ID_TASK, SET_DONE_MESSAGE_VISIBILITY, TOGGLE_SIDEDEBAR_VISIBILITY } from "../Actions/types";
import { View } from '../entries';

const initialState: View = {
    sidebarVisibility: true,
    doneTaskMessageVisibility: false,
    deletedTaskMessageVisibility: false,
    idTaskDone: 0,
    idTaskDeleted: 0,
    currentTab: "incoming",
    currentTabProjectId: 0,
    currentTabTagId: 0,
    countOfIncoming: 0,
    countOfToday: 0,
    isCreateProject: false,
    isCreateTag: false
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

      case SET_CURRENT_TAB:
        return {...view, currentTab: payload};

      case SET_CURRENT_PROJECT_ID:
        return {...view, currentTabProjectId: payload};

      case SET_CURRENT_TAG_ID:
        return {...view, currentTabTagId: payload};

      case SET_CREATE_PROJECT:
        return {...view, isCreateProject: payload};

      case SET_CREATE_TAG:
        return {...view, isCreateTag: payload};

      default:
        return view;
    }
  };
  
  export default viewReducer;