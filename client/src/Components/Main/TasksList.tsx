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
  const idAuthor = useSelector((state: RootState) => state.user.id_user)

  useEffect(() => {
    if (view.currentTab === "incoming") {
      dispatch(getIncomingTasks(idAuthor));
    } else if (view.currentTab === "done")
    {
      dispatch(getDoneTasks(idAuthor))
    } else if (view.currentTab === "today")
    {
      dispatch(getTodayTasks(idAuthor))
    } else if (view.currentTab === "deleted") {
      dispatch(getDeletedTasks(idAuthor))
    }
    else if (view.currentTab === "project") {
      dispatch(getTasksOfProject(view.currentTabProjectId, idAuthor))
    }
    else if (view.currentTab === "tag") {
      dispatch(getTasksOfTag(view.currentTabTagId, idAuthor))
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
  const projects = useSelector((state: RootState) => state.projects)
  return (
    <ul className='main_tasks-list'>
      {tasksList.map((task, index)=>{
        return <div key={task.id_task} style={{position: "relative"}}>    
        <div style={{width: "3px", background: `#${(task.id_project !== null)?(projects.find(el => el.id_project === task.id_project)?.color):"transparent"}`, height: "40px" ,position: "absolute"}}></div>
        <Task {...{task: task, task_index: index}}/>
        </div>
      })}
    </ul>
  );
}