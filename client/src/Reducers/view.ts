import { PayloadAction } from "@reduxjs/toolkit";
import { GET_COUNT_OF_INCOMING, GET_COUNT_OF_TODAY, SET_CURRENT_TAB, SET_DELETED_ID_TASK, SET_DELETED_MESSAGE_VISIBILITY, SET_DONE_ID_TASK, SET_DONE_MESSAGE_VISIBILITY, TOGGLE_SIDEDEBAR_VISIBILITY } from "../Actions/types";
import { View } from '../entries';

const initialState: View = {
    sidebarVisibility: true,
    doneTaskMessageVisibility: false,
    deletedTaskMessageVisibility: false,
    idTaskDone: 0,
    idTaskDeleted: 0,
    currentTab: "incoming",
    currentTabProjectId: null,
    currentTabTagId: null,
    countOfIncoming: 0,
    countOfToday: 0
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

      case GET_COUNT_OF_INCOMING:
        return {...view, ...payload};  

      case GET_COUNT_OF_TODAY:
        return {...view, ...payload};

      default:
        return view;
    }
  };
  
  export default viewReducer;