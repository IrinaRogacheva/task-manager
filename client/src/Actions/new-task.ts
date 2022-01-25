import { Tag } from "../entries";
import { AppDispatch } from "../store";
import { SET_PRIORITY, SET_PROJECT, ADD_TAG_TO_NEW_TASK, SET_TASK_DATE, SET_TASK_NAME, CLEAR_TAGS_LIST, DELETE_TAG_TO_NEW_TASK } from "./types";

export const setPriority = (priority: number) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_PRIORITY,
        payload: priority,
    });
};

export const setTaskName = (name: string) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_TASK_NAME,
        payload: name,
    });
};

export const setTaskProject = (idProject: number|null) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_PROJECT,
        payload: idProject,
    });
};

export const addTagToNewTask = (tag: Tag) => (dispatch: AppDispatch) => {
    dispatch({
        type: ADD_TAG_TO_NEW_TASK,
        payload: tag,
    });
};

export const deleteTagToNewTask = (idTag: number) => (dispatch: AppDispatch) => {
    dispatch({
        type: DELETE_TAG_TO_NEW_TASK,
        payload: idTag,
    });
};

export const clearTagsList = () => (dispatch: AppDispatch) => {
    dispatch({
        type: CLEAR_TAGS_LIST,
        payload: [],
    });
};

export const setTaskDate = (date: string|null) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_TASK_DATE,
        payload: date,
    });
};