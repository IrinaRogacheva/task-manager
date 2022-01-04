import { AppDispatch } from "../store";
import { SET_PRIORITY, SET_TASK_DATE, SET_TASK_NAME } from "./types";

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

export const setTaskDate = (date: string) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_TASK_DATE,
        payload: date,
    });
};