import { ADD_TASK, GET_TASKS } from "./types";
import TasksDataService from "../Services/tasks.service";
import { AppDispatch } from "../store";
import { Task } from "../entries";

export const getTasks = () => async (dispatch: AppDispatch) => {
    try {
        const res = await TasksDataService.getAll();

        dispatch({
            type: GET_TASKS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const addTask = (task: Task) => async (dispatch: AppDispatch) => {
    try {
        const res = await TasksDataService.addTask(task);
  
        dispatch({
            type: ADD_TASK,
            payload: res.data,
        });
  
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};