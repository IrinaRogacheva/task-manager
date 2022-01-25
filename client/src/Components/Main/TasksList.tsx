import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './Main.css'
import { getDeletedTasks, getDoneTasks, getIncomingTasks, getTasksOfProject, getTasksOfTag, getTodayTasks } from '../../Actions/tasks'
import { RootState } from '../../store';
import Task from './Task';

export default function TasksList(props: any) {
  const dispatch = useDispatch();
  const tasksList = useSelector((state: RootState) => state.tasks)
  const view = useSelector((state: RootState) => state.view)

  useEffect(() => {
    if (view.currentTab === "incoming") {
      dispatch(getIncomingTasks());
    } else if (view.currentTab === "done")
    {
      dispatch(getDoneTasks())
    } else if (view.currentTab === "today")
    {
      dispatch(getTodayTasks())
    } else if (view.currentTab === "deleted") {
      dispatch(getDeletedTasks())
    }
    else if (view.currentTab === "project") {
      dispatch(getTasksOfProject(view.currentTabProjectId))
    }
    else if (view.currentTab === "tag") {
      dispatch(getTasksOfTag(view.currentTabTagId))
    }
  }, [dispatch, view.currentTab, view.currentTabProjectId, view.currentTabTagId]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const closestElement = (e.target as HTMLElement).closest(`[data-name="task"]`)
        const projectContextMenu = document.querySelectorAll(`.task-context-menu`)
        if (projectContextMenu) {
          projectContextMenu.forEach((menu) => {
            if((menu as HTMLElement).style.display === "block" && !(menu as HTMLElement).contains(e.target as HTMLElement)) {
              if(closestElement) {
                  if ((menu as HTMLElement).dataset.name !== `task_context_menu_${(closestElement as HTMLElement).dataset.id}`) {
                      (menu as HTMLElement).style.display = "none"
                      console.log('onClick at other element than context menu')
                  } 
              } else {
                (menu as HTMLElement).style.display = "none"
              }
            }
          })
        }
      }
      document.addEventListener('click', onClick)
      return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <ul className='main_tasks-list'>
      {tasksList.map((task, index)=>{
        return <Task key={task.id_task} {...{task: task, task_index: index}}/>
      })}
    </ul>
  );
}