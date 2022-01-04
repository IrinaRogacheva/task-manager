import { ADD_TASK, CLEAR_TRASH, GET_TASKS, UPDATE_TASK } from "./types";
import TasksDataService from "../Services/tasks.service";
import { AppDispatch } from "../store";
import { Task } from "../entries";

export const getIncomingTasks = () => async (dispatch: AppDispatch) => {
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

export const getDoneTasks = () => async (dispatch: AppDispatch) => {
    try {
        const res = await TasksDataService.getDoneTasks();

        dispatch({
            type: GET_TASKS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const getDeletedTasks = () => async (dispatch: AppDispatch) => {
    try {
        const res = await TasksDataService.getDeletedTasks();

        dispatch({
            type: GET_TASKS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const getTodayTasks = () => async (dispatch: AppDispatch) => {
    try {
        const res = await TasksDataService.getTodayTasks();

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

export const updateTask = (id: number, data: any) => async (dispatch: AppDispatch) => {
    try {
      const res = await TasksDataService.update(id, data);
  
      dispatch({
        type: UPDATE_TASK,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const clearTrash = () => async (dispatch: AppDispatch) => {
    try {
      const res = await TasksDataService.clearTrash();
  
      dispatch({
        type: CLEAR_TRASH,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };