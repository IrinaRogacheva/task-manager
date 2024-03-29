import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateTaskStatus } from '../../Actions/tasks';
import { setDeletedIdTask, setDeletedMesageVisibility, setDeletedTaskIndex, setDeletedTaskTags } from '../../Actions/view';
import { ContextMenuIcon, TrashCan } from '../Icons';
import './Main.css'
import { PrioritiesToUpdate } from './PrioritiesToUpdate';

export function TaskContextMenu(props: any) {
  const dispatch = useDispatch()
  const setTaskDeleted = () => {
    dispatch(updateTaskStatus(props.id_task, props.tags, { status: 2 }));
    dispatch(setDeletedIdTask(props.id_task));
    dispatch(setDeletedTaskIndex(props.task_index));
    dispatch(setDeletedTaskTags(props.id_tags));
    dispatch(setDeletedMesageVisibility(true));
    setTimeout(() => dispatch(setDeletedMesageVisibility(false)), 4000);
  }

  const [isTaskHover, setIsTaskHover] = useState(false)

  let contextMenuIcon: JSX.Element;
  if (isTaskHover) {
    contextMenuIcon = <ContextMenuIcon {...{fill: "#7a7a7a"}}/>
  } else {
    contextMenuIcon = <ContextMenuIcon {...{fill: "#a3a3a3"}}/>
  }

  const setTaskContextMenuVisible = ()=> {
    const taskContextMenu = document.querySelector(`[data-name="task_context_menu_${props.id_task}"]`)
    if (taskContextMenu)
    {
      if ((taskContextMenu as HTMLElement).style.display === 'none') {
        (taskContextMenu as HTMLElement).style.display = "block"
      } else {
        (taskContextMenu as HTMLElement).style.display = "none"
      }
    }
  }

    return (
      <>
        <div onClick={setTaskContextMenuVisible} className='main_context-menu-wrapper' onMouseEnter={()=>{setIsTaskHover(true)}} onMouseLeave={()=>{setIsTaskHover(false)}}>
          {contextMenuIcon}
        </div>
        <div data-name={`task_context_menu_${props.id_task}`} className="task-context-menu context-menu" style={{display: 'none'}} tabIndex={0}>
          <PrioritiesToUpdate {...{priority: props.priority, id_task: props.id_task, tags: props.tags}}/>
          <button className='task-context-menu__button' onClick={() => { setTaskDeleted()}}>
            <TrashCan {...{fill: "#a3a3a3", width: "17px", height: "15px"}}/>
            <p className="sidebar__text task-context-menu__text">Удалить</p>
          </button>
        </div>
      </>
      );
}