import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateTaskStatus } from '../../Actions/tasks';
import { setDeletedIdTask, setDeletedMesageVisibility } from '../../Actions/view';
import { ContextMenuIcon, TrashCan } from '../Icons';
import './Main.css'

export function TaskContextMenu(props: any) {
  const dispatch = useDispatch()
  const setTaskDeleted = () => {
    dispatch(updateTaskStatus(props.id_task, {status: 2}))
    dispatch(setDeletedIdTask(props.id_task))
    dispatch(setDeletedMesageVisibility(true))
    setTimeout(()=>dispatch(setDeletedMesageVisibility(false)), 4000)
  }

  const [isTaskHover, setIsTaskHover] = useState(false)

  let contextMenuIcon: JSX.Element;
  if (isTaskHover) {
    contextMenuIcon = <ContextMenuIcon {...{fill: "#7a7a7a", id: props.id_task}}/>
  } else {
    contextMenuIcon = <ContextMenuIcon {...{fill: "#a3a3a3", id: props.id_task}}/>
  }

  const setTaskContextMenuVisible = ()=> {
    const taskContextMenu = document.querySelector(`[data-name="task_context_menu_${props.id}"]`)
    if ((taskContextMenu as HTMLElement).style.display === 'none') {
      (taskContextMenu as HTMLElement).style.display = "block"
    } else {
      (taskContextMenu as HTMLElement).style.display = "none"
    }
  }

    return (
      <>
        <div onClick={setTaskContextMenuVisible} className='main_context-menu-wrapper' onMouseEnter={()=>{setIsTaskHover(true)}} onMouseLeave={()=>{setIsTaskHover(false)}}>
          {contextMenuIcon}
        </div>
        <div data-name={`task_context_menu_${props.id}`} className="task-context-menu context-menu" style={{display: 'none'}} tabIndex={0}>
          <button className='task-context-menu__button' onClick={()=>{setTaskDeleted()}}>
            <TrashCan {...{fill: "#a3a3a3", width: "17px", height: "15px"}}/>
            <p className="sidebar__text task-context-menu__text">Удалить</p>
          </button>
        </div>
        </>
      );
}