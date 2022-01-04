import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateTask } from '../../Actions/tasks'
import { setDoneIdTask, setDoneMesageVisibility } from '../../Actions/view'
import { Task } from '../../entries'
import { ContextMenuIcon } from '../Icons'
import './Main.css'
import { TaskContextMenu } from './TaskContextMenu'

export default function TasksList(task: Task) {
  const [isTaskContextMenuVisible, setIsTaskContextMenuVisible] = useState(true)
  const [isTaskHover, setIsTaskHover] = useState(false)

  const P1 = "main_task-checkbox_p1"
  const P2 = "main_task-checkbox_p2"
  const P3 = "main_task-checkbox_p3"

  let contextMenuIcon: JSX.Element;
  if (isTaskHover) {
    contextMenuIcon = <ContextMenuIcon {...{fill: "#7a7a7a"}}/>
  } else {
    contextMenuIcon = <ContextMenuIcon {...{fill: "#a3a3a3"}}/>
  }
  
  const taskContextMenuRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch()
  const setTaskDone = () => {
    dispatch(updateTask(task.id_task, {status: 1}))
    dispatch(setDoneIdTask(task.id_task))
    dispatch(setDoneMesageVisibility(true))
    setTimeout(()=>dispatch(setDoneMesageVisibility(false)), 4000)
  }

  return (
    <div>
        <li className='main_task-wrapper'>
            <div onClick={()=>setTaskDone()} className={ "main_task-checkbox " + (task.priority===1?P1:(task.priority===2?P2:(task.priority===3?P3:"")))}></div>
            <input name='every_task' value={task.name} className='main_tasks-list__item'/>
            <div onClick={()=>{setIsTaskContextMenuVisible(!isTaskContextMenuVisible)}} className='main_context-menu-wrapper' onMouseEnter={()=>{setIsTaskHover(true)}} onMouseLeave={()=>{setIsTaskHover(false)}}>
                {contextMenuIcon}
            </div>
        </li>
        <div style={{position: 'relative'}} ref={taskContextMenuRef}>
            <TaskContextMenu {...{style: {display: (isTaskContextMenuVisible?'none':'block')}, attr: {tabIndex: 0}, id_task: task.id_task}}/>
        </div>
    </div>
    );
}