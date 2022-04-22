import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentTask } from '../../Actions/current-task'
import { updateTaskName, updateTaskStatus } from '../../Actions/tasks'
import { setCurrentTab, setCurrentTabTagId, setCurrentTaskId, setDoneIdTask, setDoneMesageVisibility, setDoneTaskIndex } from '../../Actions/view'
import { Tag } from '../../entries'
import { RootState } from '../../store'
import './Main.css'
import { TaskContextMenu } from './TaskContextMenu'

export default function TasksListItem(props: any) {
  const P1 = "main_task-checkbox_p1"
  const P2 = "main_task-checkbox_p2"
  const P3 = "main_task-checkbox_p3"

  const dispatch = useDispatch()
  const setTaskDone = () => {
    dispatch(updateTaskStatus(props.task.id_task, props.task.id_tags??[], {status: 1}))
    dispatch(setDoneIdTask(props.task.id_task))
    setDoneTaskIndex(props.task_index)
    dispatch(setDoneMesageVisibility(true))
    setTimeout(()=>dispatch(setDoneMesageVisibility(false)), 4000)
  }

  const [inputValue, setInputValue] = useState(props.task.name)

  const firstUpdate = useRef(true);
  useEffect(() => {
    setInputValue(props.task.name)
  }, [props.task.name]);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (inputValue.length > 0 && inputValue.replace(/\s/g, '').length > 0)
    {
      const timeOutId = setTimeout(() => dispatch(updateTaskName(props.task.id_task, props.task.id_tags??[], {name: inputValue})), 1000);
      return () => clearTimeout(timeOutId);
    }
  }, [inputValue]);

  const view = useSelector((state: RootState) => state.view)

  return (<>
    <div style={{marginLeft: "3px"}} onClick={()=>{dispatch(setCurrentTask(props.task))}} data-name="task" data-id={props.task.id_task} className={`main_task-block ${(view.currentTaskId === props.task.id_task)?"main_task-block_current":""}`}>
        <li className={`main_task-wrapper`} onClick={()=>{dispatch(setCurrentTaskId(props.task.id_task))}}>
            <div onClick={()=>{if(view.currentTab !== "deleted" && view.currentTab !== "done"){setTaskDone()}}} className={"main_task-checkbox " + (props.task.priority===1?P1:(props.task.priority===2?P2:(props.task.priority===3?P3:"")) + (view.currentTab==="deleted"?" disabled":""))}></div>
            <input autoComplete='off' value={inputValue} onChange={(e)=>{setInputValue(e.target.value)}} className='main_tasks-list__item'/>
            <div className='task_tags'>
              {props.task.id_tags && (props.task.id_tags as Array<Tag>).map((tag)=>{
                return <div key={props.task.id_task + "_" + tag.id_tag} onClick={()=>{dispatch(setCurrentTab("tag"));dispatch(setCurrentTabTagId(tag.id_tag))}} className='task_tag' style={{background: `#${tag.color}`}}>
                  <p className='task_tag__name sidebar__text'>{tag.name}</p>
                </div>
              })}
            </div>
        </li>
        {(view.currentTab !== "deleted") &&
        <TaskContextMenu key={props.task.id_task} {...{id_task: props.task.id_task, task_index: props.task_index, priority: props.task.priority, tags: props.task.id_tags}}/>        
        }
    </div>
    </>);
}