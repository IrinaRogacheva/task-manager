import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateTaskName, updateTaskStatus } from '../../Actions/tasks'
import { setCurrentTaskId, setDoneIdTask, setDoneMesageVisibility } from '../../Actions/view'
import { Task } from '../../entries'
import { RootState } from '../../store'
import './Main.css'
import { TaskContextMenu } from './TaskContextMenu'

export default function TasksListItem(task: Task) {
  const P1 = "main_task-checkbox_p1"
  const P2 = "main_task-checkbox_p2"
  const P3 = "main_task-checkbox_p3"

  const dispatch = useDispatch()
  const setTaskDone = () => {
    dispatch(updateTaskStatus(task.id_task, {status: 1}))
    dispatch(setDoneIdTask(task.id_task))
    dispatch(setDoneMesageVisibility(true))
    setTimeout(()=>dispatch(setDoneMesageVisibility(false)), 4000)
  }

  const [inputValue, setInputValue] = useState(task.name)

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (inputValue.length > 0 && inputValue.replace(/\s/g, '').length > 0)
    {
      const timeOutId = setTimeout(() => dispatch(updateTaskName(task.id_task, {name: inputValue})), 1000);
      return () => clearTimeout(timeOutId);
    }
  }, [inputValue]);

  const view = useSelector((state: RootState) => state.view)
  return (
    <div data-name="task" data-id={task.id_task} className={`main_task-block ${(view.currentTaskId === task.id_task)?"main_task-block_current":""}`}>
        <li className={`main_task-wrapper`} onClick={()=>{dispatch(setCurrentTaskId(task.id_task))}}>
            <div onClick={()=>{if(view.currentTab !== "deleted" && view.currentTab !== "done"){setTaskDone()}}} className={"main_task-checkbox " + (task.priority===1?P1:(task.priority===2?P2:(task.priority===3?P3:"")) + (view.currentTab==="deleted"?" disabled":""))}></div>
            <input name='every_task' value={inputValue} onChange={(e)=>{setInputValue(e.target.value)}} className='main_tasks-list__item'/>
        </li>
        {(view.currentTab !== "deleted") &&
        <TaskContextMenu key={task.id_task} {...{id_task: task.id_task}}/>        
        }
    </div>
    );
}