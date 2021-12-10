import { AppDispatch } from "../store";
import { SET_PRIORITY, SET_TASK_NAME } from "./types";

export const setPriority = (priority: number) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_PRIORITY,
        payload: priority,
    });
};

export const setTaskName = (name: string) => (dispatch: AppDispatch) => {
    console.log('name in setTaskName action: ' + name)
    dispatch({
        type: SET_TASK_NAME,
        payload: name,
    });
};