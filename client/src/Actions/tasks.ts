import { ADD_TASK, CLEAR_TRASH, GET_TASKS, TAKE_BACK_TASK, UPDATE_TASK } from "./types";
import TasksDataService from "../Services/tasks.service";
import { AppDispatch } from "../store";
import { Tag, Task } from "../entries";

export const sortByDate = (tasks: Array<Task>) => async (dispatch: AppDispatch) => {
  tasks.sort((a, b) => (a.id_task > b.id_task) ? -1:1)
  dispatch({
    type: GET_TASKS,
    payload: [...tasks],
  });
}

export const sortByPriority = (tasks: Array<Task>) => async (dispatch: AppDispatch) => {
  tasks.sort((a, b) => (a.priority && b.priority && (a.priority > b.priority)) ? 1:(a.priority && b.priority && (b.priority > a.priority))?-1:(a.priority && !b.priority)?-1:(b.priority && !a.priority?1:(a.name > b.name)?1:-1))
  dispatch({
    type: GET_TASKS,
    payload: [...tasks],
  });
}

export const sortByName = (tasks: Array<Task>) => async (dispatch: AppDispatch) => {
  tasks.sort((a, b) => (a.name > b.name) ? 1:-1)
  dispatch({
    type: GET_TASKS,
    payload: [...tasks],
  });
}

export const searchTasks = (idAuthor: number, findBy: string) => async (dispatch: AppDispatch) => {
  try {
      const res = await TasksDataService.searchTask(idAuthor, findBy);
      const resTasksWithTag = await TasksDataService.getTasksWithTags(idAuthor);
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

export const getIncomingTasks = (idAuthor: number) => async (dispatch: AppDispatch) => {
    try {
        const res = await TasksDataService.getAll(idAuthor);
        const resTasksWithTag = await TasksDataService.getTasksWithTags(idAuthor);
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

export const getDoneTasks = (idAuthor: number) => async (dispatch: AppDispatch) => {
    try {
        const res = await TasksDataService.getDoneTasks(idAuthor);
        const resTasksWithTag = await TasksDataService.getTasksWithTags(idAuthor);
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

export const getDeletedTasks = (idAuthor: number) => async (dispatch: AppDispatch) => {
    try {
        const res = await TasksDataService.getDeletedTasks(idAuthor);
        const resTasksWithTag = await TasksDataService.getTasksWithTags(idAuthor);
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

export const getTodayTasks = (idAuthor: number) => async (dispatch: AppDispatch) => {
    try {
        const res = await TasksDataService.getTodayTasks(idAuthor);
        const resTasksWithTag = await TasksDataService.getTasksWithTags(idAuthor);
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

export const getTasksOfProject = (projectId: number, idAuthor: number) => async (dispatch: AppDispatch) => {
    try {
        const res = await TasksDataService.getTasksOfProject(projectId);
        const resTasksWithTag = await TasksDataService.getTasksWithTags(idAuthor);
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

export const getTasksOfTag = (tagId: number, idAuthor: number) => async (dispatch: AppDispatch) => {
    try {
        const res = await TasksDataService.getTasksOfTag(tagId);
        const resTasksWithTag = await TasksDataService.getTasksWithTags(idAuthor);
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

export const addTask = (task: Task, idAuthor: number) => async (dispatch: AppDispatch) => {
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
      dispatch({
          type: ADD_TASK,
          payload: insertedTask.data[0],
      });

      return Promise.resolve(res.data);
  } catch (err) {
      return Promise.reject(err);
  }
};

export const updateTaskStatus = (id: number, tags: Array<Tag>, data: any) => async (dispatch: AppDispatch) => {
    try {
      const res = await TasksDataService.updateStatus(id, data);
      const updatedTask = await TasksDataService.getById(id);
      updatedTask.data[0].id_tags = tags

      dispatch({
        type: UPDATE_TASK,
        payload: updatedTask.data[0],
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const updateTaskPriority = (id: number, tags: Array<Tag>, data: any) => async (dispatch: AppDispatch) => {
    try {
      const res = await TasksDataService.updatePriority(id, data);
      const updatedTask = await TasksDataService.getById(id);
      updatedTask.data[0].id_tags = tags

      dispatch({
        type: UPDATE_TASK,
        payload: updatedTask.data[0],
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const updateTaskDescription = (id: number, tags: Array<Tag>, data: any) => async (dispatch: AppDispatch) => {
    try {
      const res = await TasksDataService.updateDescription(id, data);
      const updatedTask = await TasksDataService.getById(id);
      updatedTask.data[0].id_tags = tags

      dispatch({
        type: UPDATE_TASK,
        payload: updatedTask.data[0],
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const deleteTagFromTask = (id: number, tags: Array<Tag>, id_tag: number) => async (dispatch: AppDispatch) => {
    try {
      const res = await TasksDataService.deleteTagFromTask(id, id_tag);
      const updatedTask = await TasksDataService.getById(id);
      updatedTask.data[0].id_tags = tags.filter(tag => tag.id_tag !== id_tag)

      dispatch({
        type: UPDATE_TASK,
        payload: updatedTask.data[0],
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const addTagInTask = (id: number, tags: Array<Tag>, tag: Tag) => async (dispatch: AppDispatch) => {
    try {
      const res = await TasksDataService.addTagToTask(id, tag.id_tag);
      const updatedTask = await TasksDataService.getById(id);
      if (tags)
          {
            tags.push(tag)
          } else {
              tags = [tag]
          }
      updatedTask.data[0].id_tags = tags

      dispatch({
        type: UPDATE_TASK,
        payload: updatedTask.data[0],
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const updateTaskProject = (id: number, tags: Array<Tag>, data: any) => async (dispatch: AppDispatch) => {
    try {
      const res = await TasksDataService.updateProject(id, data);
      const updatedTask = await TasksDataService.getById(id);
      updatedTask.data[0].id_tags = tags

      dispatch({
        type: UPDATE_TASK,
        payload: updatedTask.data[0],
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const updateTaskName = (id: number, tags: Array<Tag>, data: any) => async (dispatch: AppDispatch) => {
    try {
      const res = await TasksDataService.updateName(id, data);
      const updatedTask = await TasksDataService.getById(id);
      updatedTask.data[0].id_tags = tags

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


  export const clearTrash = (idAuthor: number) => async (dispatch: AppDispatch) => {
    try {
      const res = await TasksDataService.clearTrash(idAuthor);
  
      dispatch({
        type: CLEAR_TRASH,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };