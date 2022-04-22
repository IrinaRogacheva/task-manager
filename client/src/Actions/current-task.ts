import { Task } from "../entries";
import { AppDispatch } from "../store";
import { SET_CURRENT_TASK_TAB, UPDATE_CURRENT_TASK } from "./types";

export const setCurrentTask = (task: Task) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_CURRENT_TASK_TAB,
        payload: task,
    });
};

export const updateCurrentTask = (data: any) => (dispatch: AppDispatch) => {
    dispatch({
        type: UPDATE_CURRENT_TASK,
        payload: data,
    });
};