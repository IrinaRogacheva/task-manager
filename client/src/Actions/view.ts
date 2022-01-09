import { AppDispatch } from "../store";
import { SET_CURRENT_TASK, SET_CREATE_PROJECT, SET_CREATE_TAG, SET_CURRENT_PROJECT_ID, SET_CURRENT_TAB, SET_CURRENT_TAG_ID, SET_DELETED_ID_TASK, SET_DELETED_MESSAGE_VISIBILITY, SET_DONE_ID_TASK, SET_DONE_MESSAGE_VISIBILITY, TOGGLE_SIDEDEBAR_VISIBILITY } from "./types";

export const toggleSidebarVisibility = (sidebarVisibility: boolean) => (dispatch: AppDispatch) => {
    dispatch({
        type: TOGGLE_SIDEDEBAR_VISIBILITY,
        payload: sidebarVisibility,
    });
};

export const setDoneMesageVisibility = (messageVisibility: boolean) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_DONE_MESSAGE_VISIBILITY,
        payload: messageVisibility,
    });
};

export const setDeletedMesageVisibility = (messageVisibility: boolean) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_DELETED_MESSAGE_VISIBILITY,
        payload: messageVisibility,
    });
};

export const setDoneIdTask = (idTask: number) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_DONE_ID_TASK,
        payload: idTask,
    });
};

export const setDeletedIdTask = (idTask: number) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_DELETED_ID_TASK,
        payload: idTask,
    });
};

export const setCurrentTab = (currentTab: string) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_CURRENT_TAB,
        payload: currentTab,
    });
};

export const setCurrentTabProjectId = (projectId: number) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_CURRENT_PROJECT_ID,
        payload: projectId,
    });
};

export const setCurrentTabTagId = (tagId: number) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_CURRENT_TAG_ID,
        payload: tagId,
    });
};

export const setCurrentTaskId = (taskId: number|null) => (dispatch: AppDispatch) => {
    if (taskId)
    {
        dispatch({
            type: SET_CURRENT_TASK,
            payload: taskId,
        });
    }
};

export const setCreateProject = (isCreateProject: boolean) => (dispatch: AppDispatch) => {
    console.log("setCreateProject")
    dispatch({
        type: SET_CREATE_PROJECT,
        payload: isCreateProject,
    });
};

export const setCreateTag = (isCreateTag: boolean) => (dispatch: AppDispatch) => {
    console.log("setCreateTag")
    dispatch({
        type: SET_CREATE_TAG,
        payload: isCreateTag,
    });
};