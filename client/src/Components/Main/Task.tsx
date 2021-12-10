import React, { useRef, useState } from 'react'
import { Task } from '../../entries';
import { ContextMenuIcon } from '../Icons';
import './Main.css'
import { TaskContextMenu } from './TaskContextMenu';

export default function TasksList(task: Task) {
  const [isTaskContextMenuVisible, setIsTaskContextMenuVisible] = useState(true)
  const [isTaskHover, setIsTaskHover] = useState(false)

  let contextMenuIcon: JSX.Element;
  if (isTaskHover) {
    contextMenuIcon = <ContextMenuIcon {...{fill: "#7a7a7a"}}/>
  } else {
    contextMenuIcon = <ContextMenuIcon {...{fill: "#a3a3a3"}}/>
  }
  
  const taskContextMenuRef = useRef<HTMLDivElement>(null);

  return (
    <div key={task.id_task}>
        <li className='main_task-wrapper'>
            <div className='main_task-checkbox'></div>
            <input name='every_task' value={task.name} className='main_tasks-list__item'/>
            <div onClick={()=>{setIsTaskContextMenuVisible(!isTaskContextMenuVisible)}} className='main_context-menu-wrapper' onMouseEnter={()=>{setIsTaskHover(true)}} onMouseLeave={()=>{setIsTaskHover(false)}}>
                {contextMenuIcon}
            </div>
        </li>
        <div style={{position: 'relative'}} ref={taskContextMenuRef}>
            <TaskContextMenu {...{style: {display: (isTaskContextMenuVisible?'none':'block')}, attr: {tabIndex: 0}}}/>
        </div>
    </div>
    );
}