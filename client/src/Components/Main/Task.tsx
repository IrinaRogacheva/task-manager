import dayjs from 'dayjs'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentTask } from '../../Actions/current-task'
import { updateTaskName, updateTaskStatus } from '../../Actions/tasks'
import { addSelectedTask, clearSelection, deleteSelectedTask, setCurrentTab, setCurrentTabTagId, setCurrentTaskId, setDoneIdTask, setDoneMesageVisibility, setDoneTaskIndex, setDoneTaskTags, setIsMultipleTaskSelection } from '../../Actions/view'
import { Tag, Task } from '../../entries'
import { RootState } from '../../store'
import './Main.css'
import { TaskContextMenu } from './TaskContextMenu'

export default function TasksListItem(props: any) {
  const P1 = "main_task-checkbox_p1"
  const P2 = "main_task-checkbox_p2"
  const P3 = "main_task-checkbox_p3"

  const dispatch = useDispatch()
  const setTaskDone = () => {
    dispatch(updateTaskStatus(props.task.id_task, props.task.id_tags ?? [], { status: 1 }))
    dispatch(setDoneIdTask(props.task.id_task))
    dispatch(setDoneTaskIndex(props.task_index))
    dispatch(setDoneTaskTags(props.task.id_tags))
    dispatch(setDoneMesageVisibility(true))
    setTimeout(() => dispatch(setDoneMesageVisibility(false)), 4000)
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
    if (inputValue.length > 0 && inputValue.replace(/\s/g, '').length > 0) {
      const timeOutId = setTimeout(() => dispatch(updateTaskName(props.task.id_task, props.task.id_tags ?? [], { name: inputValue })), 1000);
      return () => clearTimeout(timeOutId);
    }
  }, [inputValue]);

  const view = useSelector((state: RootState) => state.view)

  const WriteDate = () => {
    const REFERENCE = moment();
    const TODAY = REFERENCE.clone().startOf('day');
    const TOMORROW = REFERENCE.clone().add(1, 'days').startOf('day');
    var YESTERDAY = REFERENCE.clone().subtract(1, 'days').startOf('day');
    var A_WEEK_OLD = REFERENCE.clone().subtract(7, 'days').startOf('day');

    let date: string
    if (moment(props.task.date).isSame(TODAY, 'd')) {
      date = "Сегодня"
    } else if (moment(props.task.date).isSame(TOMORROW, 'd')) {
      date = "Завтра"
    } else if (moment(props.task.date).isSame(YESTERDAY, 'd')) {
      date = "Вчера"
    } else {
      if (new Date(props.task.date).getFullYear() > new Date().getFullYear()) {
        date = dayjs(props.task.date).format('D MMM, YYYY')
      } else {
        date = dayjs(props.task.date).format('D MMM')
      }
    }
    return date
  }

  const tasks: Array<Task> = useSelector((state: RootState) => state.tasks)
  const clickHandler = (e: MouseEvent) => {
    dispatch(setCurrentTask(props.task));
    if (e.ctrlKey && view.currentTaskId !== null && !view.isMultipleTaskSelection) {
      dispatch(setIsMultipleTaskSelection(true));
      dispatch(addSelectedTask(tasks.find(task => { return task.id_task === view.currentTaskId }) as Task));
      dispatch(addSelectedTask(props.task));
    } else if (e.ctrlKey && view.currentTaskId !== null && view.isMultipleTaskSelection) {
      if (view.selectedTasks.filter(task => task.id_task === props.task.id_task).length > 0) {
        dispatch(deleteSelectedTask(props.task.id_task));
        dispatch(setCurrentTaskId(null));
      } else {
        dispatch(addSelectedTask(props.task));
      }
    } else if (!e.ctrlKey && view.isMultipleTaskSelection) {
      dispatch(setIsMultipleTaskSelection(false));
      dispatch(clearSelection());
    }
  }

  const [currentTaskClass, setCurrentTaskClass] = useState("")
  useEffect(() => {
    if (!view.isMultipleTaskSelection) {
      if (view.currentTaskId === props.task.id_task) {
        setCurrentTaskClass("main_task-block_current")
      } else {
        setCurrentTaskClass("")
      }
    } else {
      if (view.selectedTasks.filter(task => task.id_task === props.task.id_task).length > 0) {
        setCurrentTaskClass("main_task-block_current")
      } else {
        setCurrentTaskClass("")
      }
    }
  }, [view.currentTaskId, view.selectedTasks, view.isMultipleTaskSelection]);

  return (<>
    <div style={{ marginLeft: "3px" }} onClick={(e) => { clickHandler(e as unknown as MouseEvent) }} data-name="task" data-id={props.task.id_task} className={`main_task-block ${currentTaskClass}`}>
        <li className={`main_task-wrapper`} onClick={()=>{dispatch(setCurrentTaskId(props.task.id_task))}}>
        <div onClick={() => { if (view.currentTab !== "deleted" && view.currentTab !== "done") { setTaskDone(); setDoneMesageVisibility(true) }}} className={"main_task-checkbox " + (props.task.priority===1?P1:(props.task.priority===2?P2:(props.task.priority===3?P3:"")) + (view.currentTab==="deleted"?" disabled":""))}></div>
            <input autoComplete='off' value={inputValue} onChange={(e)=>{setInputValue(e.target.value)}} className='main_tasks-list__item'/>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className='task_tags'>
            {props.task.id_tags && (props.task.id_tags as Array<Tag>).map((tag) => {
              return <div key={props.task.id_task + "_" + tag.id_tag} onClick={() => { dispatch(setCurrentTab("tag")); dispatch(setCurrentTabTagId(tag.id_tag)) }} className='task_tag' style={{ background: `#${tag.color}` }}>
                <p className='task_tag__name'>{tag.name}</p>
              </div>
            })}
          </div>
          {props.task.date &&
            <p className={`task_date ${(moment().diff(props.task.date, 'd') > 0) ? ' task_date__past' : ''}`}>{WriteDate()}</p>
          }
        </div>    
        </li>
        {(view.currentTab !== "deleted") &&
        <TaskContextMenu key={props.task.id_task} {...{id_task: props.task.id_task, task_index: props.task_index, priority: props.task.priority, tags: props.task.id_tags}}/>        
        }
    </div>
    </>);
}