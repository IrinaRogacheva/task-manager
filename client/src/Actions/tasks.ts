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

export const getTasksOfProject = (projectId: number) => async (dispatch: AppDispatch) => {
    try {
        const res = await TasksDataService.getTasksOfProject(projectId);

        dispatch({
            type: GET_TASKS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const getTasksOfTag = (tagId: number) => async (dispatch: AppDispatch) => {
    try {
        const res = await TasksDataService.getTasksOfTag(tagId);

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
        const insertedTask = await TasksDataService.getById(res.data.insertId);
        if (task.id_tag)
        {
            await TasksDataService.addTagToTask(res.data.insertId, task.id_tag);
        }

        dispatch({
            type: ADD_TASK,
            payload: insertedTask.data[0],
        });
  
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const updateTaskStatus = (id: number, data: any) => async (dispatch: AppDispatch) => {
    try {
      const res = await TasksDataService.updateStatus(id, data);
      const updatedTask = await TasksDataService.getById(id);

      dispatch({
        type: UPDATE_TASK,
        payload: updatedTask.data[0],
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const updateTaskName = (id: number, data: any) => async (dispatch: AppDispatch) => {
    try {
      const res = await TasksDataService.updateName(id, data);
      const updatedTask = await TasksDataService.getById(id);

      dispatch({
        type: UPDATE_TASK,
        payload: updatedTask.data[0],
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