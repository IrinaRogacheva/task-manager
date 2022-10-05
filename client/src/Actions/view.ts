import { Tag, Task } from "../entries";
import { AppDispatch } from "../store";
import { SET_CURRENT_TASK, SET_CREATE_PROJECT, SET_CREATE_TAG, SET_CURRENT_PROJECT_ID, SET_CURRENT_TAB, SET_CURRENT_TAG_ID, SET_DELETED_ID_TASK, SET_DELETED_MESSAGE_VISIBILITY, SET_DONE_ID_TASK, SET_DONE_MESSAGE_VISIBILITY, TOGGLE_SIDEDEBAR_VISIBILITY, SET_DONE_TASK_INDEX, SET_DELETED_TASK_INDEX, SET_UPDATE_PROJECT, SET_UPDATING_ID, SET_UPDATE_TAG, SET_DONE_TASK_TAGS_ID, SET_DELETED_TASK_TAGS_ID, SET_IS_MULTIPLE_TASK_SELECTION, ADD_SELECTED_TASK, DELETE_SELECTED_TASK, CLEAR_TASK_SELECTION } from "./types";

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

export const setDoneTaskIndex = (index: number) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_DONE_TASK_INDEX,
        payload: index,
    });
};

export const setDeletedTaskIndex = (index: number) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_DELETED_TASK_INDEX,
        payload: index,
    });
};

export const setDoneTaskTags = (tagsIdArray: Array<Tag>) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_DONE_TASK_TAGS_ID,
        payload: tagsIdArray,
    });
};

export const setDeletedTaskTags = (tagsIdArray: Array<Tag>) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_DELETED_TASK_TAGS_ID,
        payload: tagsIdArray,
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
    dispatch({
        type: SET_CREATE_PROJECT,
        payload: isCreateProject,
    });
};

export const setCreateTag = (isCreateTag: boolean) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_CREATE_TAG,
        payload: isCreateTag,
    });
};

export const setUpdateProject = (isUpdateProject: boolean) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_UPDATE_PROJECT,
        payload: isUpdateProject,
    });
};

export const setUpdateTag = (isUpdateTag: boolean) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_UPDATE_TAG,
        payload: isUpdateTag,
    });
};

export const setUpdatingId = (updatingId: number) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_UPDATING_ID,
        payload: updatingId,
    });
};

export const setIsMultipleTaskSelection = (isMultipleTaskSelection: boolean) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_IS_MULTIPLE_TASK_SELECTION,
        payload: isMultipleTaskSelection,
    });
};

export const addSelectedTask = (task: Task) => (dispatch: AppDispatch) => {
    dispatch({
        type: ADD_SELECTED_TASK,
        payload: task,
    });
};

export const deleteSelectedTask = (id_task: number) => (dispatch: AppDispatch) => {
    dispatch({
        type: DELETE_SELECTED_TASK,
        payload: id_task,
    });
};

export const clearSelection = () => (dispatch: AppDispatch) => {
    dispatch({
        type: CLEAR_TASK_SELECTION,
        payload: [],
    });
};