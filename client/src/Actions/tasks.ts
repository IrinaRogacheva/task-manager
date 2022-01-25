import { ADD_TASK, CLEAR_TRASH, GET_TASKS, TAKE_BACK_TASK, UPDATE_TASK } from "./types";
import TasksDataService from "../Services/tasks.service";
import { AppDispatch } from "../store";
import { Task } from "../entries";

export const getIncomingTasks = () => async (dispatch: AppDispatch) => {
    try {
        const res = await TasksDataService.getAll();
        const resTasksWithTag = await TasksDataService.getTasksWithTags();
        let found
        for (const tag of resTasksWithTag.data)
        {
          found = ((res.data as Array<Task>).find((task: Task) => task.id_task === tag.id_task) as Task)
          if (found)
          {
            delete tag.id_task
            if (found.id_tags)
            {
              found.id_tags.push(tag)
            } else {
                found.id_tags = [tag]
            }
          }
        }
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
        const resTasksWithTag = await TasksDataService.getTasksWithTags();
        let found
        for (const tag of resTasksWithTag.data)
        {
          found = ((res.data as Array<Task>).find((task: Task) => task.id_task === tag.id_task) as Task)
          if (found)
          {
            delete tag.id_task
            if (found.id_tags)
            {
              found.id_tags.push(tag)
            } else {
                found.id_tags = [tag]
            }
          }
        }

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
        const resTasksWithTag = await TasksDataService.getTasksWithTags();
        let found
        for (const tag of resTasksWithTag.data)
        {
          found = ((res.data as Array<Task>).find((task: Task) => task.id_task === tag.id_task) as Task)
          if (found)
          {
            delete tag.id_task
            if (found.id_tags)
            {
              found.id_tags.push(tag)
            } else {
                found.id_tags = [tag]
            }
          }
        }

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
        const resTasksWithTag = await TasksDataService.getTasksWithTags();
        let found
        for (const tag of resTasksWithTag.data)
        {
          found = ((res.data as Array<Task>).find((task: Task) => task.id_task === tag.id_task) as Task)
          if (found)
          {
            delete tag.id_task
            if (found.id_tags)
            {
              found.id_tags.push(tag)
            } else {
                found.id_tags = [tag]
            }
          }
        }

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
        const resTasksWithTag = await TasksDataService.getTasksWithTags();
        let found
        for (const tag of resTasksWithTag.data)
        {
          found = ((res.data as Array<Task>).find((task: Task) => task.id_task === tag.id_task) as Task)
          if (found)
          {
            delete tag.id_task
            if (found.id_tags)
            {
              found.id_tags.push(tag)
            } else {
                found.id_tags = [tag]
            }
          }
        }

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
        const resTasksWithTag = await TasksDataService.getTasksWithTags();
        let found
        for (const tag of resTasksWithTag.data)
        {
          found = ((res.data as Array<Task>).find((task: Task) => task.id_task === tag.id_task) as Task)
          if (found)
          {
            delete tag.id_task
            if (found.id_tags)
            {
              found.id_tags.push(tag)
            } else {
                found.id_tags = [tag]
            }
          }
        }

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
      if (task.id_tags.length)
      {
          for (const tag of task.id_tags) 
          {
              await TasksDataService.addTagToTask(res.data.insertId, tag.id_tag);
              if (insertedTask.data[0].id_tags) {
                insertedTask.data[0].id_tags.push(tag)
              } else {
                insertedTask.data[0].id_tags = [tag]
              }
          }
      }
      console.log(JSON.stringify(insertedTask.data[0]))

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

  export const takeBackTask = (id: number, index: number) => async (dispatch: AppDispatch) => {
    try {
      const res = await TasksDataService.getById(id);

      dispatch({
        type: TAKE_BACK_TASK,
        payload: {task: res.data[0], index: index},
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