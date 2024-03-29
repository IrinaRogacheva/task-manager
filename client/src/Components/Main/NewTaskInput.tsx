import moment from 'moment';
import React, { useRef, useState, FocusEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTagToNewTask, clearTagsList, setPriority, setTaskDate, setTaskName, setTaskProject } from '../../Actions/new-task';
import { addTask } from '../../Actions/tasks';
import { Tag } from '../../entries';
import { RootState } from '../../store';
import { AddDate, Arrow, Plus } from '../Icons';
import { CalendarContext } from './CalendarContext';
import './Main.css'
import { TaskCondiments } from './TaskCondiments';

export default function NewTaskInput(props: any) { 
  const [isHover, setIsHover] = useState(false)
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(false)
  const [isCalendarVisible, setIsCalendarVisible] = useState(false)
  const [isCondimentsVisible, setIsCondimentsVisible] = useState(false)
  const [isAddingTaskModeOn, setIsAddingTaskModeOn] = useState(false)

  const checkIsPlaceholderVisible = (e: FocusEvent) => {
    if ((e.relatedTarget !== null && (e.relatedTarget as HTMLInputElement).type !== "text") || (e.target as HTMLInputElement).value.length > 0) {
      setIsPlaceholderVisible(true) //hide
    }
    else
    {
      setIsPlaceholderVisible(false) //show
    }
  }

  const checkIsAddingTaskModeOn = (e: FocusEvent) => {
    if(e.relatedTarget !== null && (e.relatedTarget as HTMLInputElement).type !== "text") {
      (e.currentTarget as HTMLInputElement).focus()
    }
    else {
      setIsAddingTaskModeOn(false);
    }
  }

  let plus;
  if (isHover) {
    plus = <Plus {...{fill: "#f58c74", width: "13px", height: "13px"}}/>
  } else {
    plus = <Plus {...{fill: "#8c8c8c", width: "13px", height: "13px"}}/>
  }
  const inputRef = useRef<HTMLInputElement>(null);
  const calendarButtonRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const condimentsButtonRef = useRef<HTMLDivElement>(null);
  const condimentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if((condimentsButtonRef.current && condimentsButtonRef.current.contains(e.target as Node)) || (calendarButtonRef.current && calendarButtonRef.current.contains(e.target as Node)))
      {
        return
      }
      if(calendarRef.current && !calendarRef.current.contains(e.target as Node))
      {
        setIsCalendarVisible(false)
      }
      if(condimentsRef.current && !condimentsRef.current.contains(e.target as Node))
      {
        setIsCondimentsVisible(false)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const dispatch = useDispatch()
  const newTask = useSelector(((state: RootState) => state.newTask))
  
  const submitReview = () => {
    if (inputRef.current)
    {
      dispatch(setTaskName(inputRef.current.value))
      setIsCalendarVisible(false)
      setIsCondimentsVisible(false)
    }
  }

  const view = useSelector((state: RootState) => state.view)
  const tags = useSelector((state: RootState) => state.tags)
  useEffect(() => {
    if (view.currentTab === "today" || view.currentTab === "next_week") {
      dispatch(setTaskDate(new Date(moment().format('YYYY-MM-DD'))))
    } else
    {
      dispatch(setTaskDate(null))
    }
    if (view.currentTab === "project") {
      dispatch(setTaskProject(view.currentTabProjectId))
    } else {
      dispatch(setTaskProject(null))
    }
    if (view.currentTab === "tag") {
      dispatch(addTagToNewTask((tags.find(tag => tag.id_tag === view.currentTabTagId) as Tag)))
    } else {
      dispatch(clearTagsList())
    }
  }, [view.currentTab, view.currentTabTagId, view.currentTabProjectId]);

  const idAuthor = useSelector((state: RootState) => state.user.id_user)
  useEffect(() => {
    if (newTask.name.length > 0 && newTask.name.replace(/\s/g, '').length > 0)
    {
      dispatch(addTask(newTask, idAuthor))
      dispatch(setPriority(0))
      dispatch(setTaskName(""))
      dispatch(setTaskProject(null))
      dispatch(clearTagsList())
      if (view.currentTab === "today" || view.currentTab === "next_week") {
        dispatch(setTaskDate(new Date(moment().format('YYYY-MM-DD'))))
      } else
      {
        dispatch(setTaskDate(null))
      }
      if (inputRef.current)
      {
        inputRef.current.value = ""
      }
    }
  }, [newTask.name]);

  return (
    <div>
      <div className='main_input-wraper' onMouseEnter={()=>{setIsHover(true)}} onMouseLeave={()=>{setIsHover(false)}}>
        <div onClick={()=>{(inputRef.current as HTMLInputElement).focus()}} className='main_placeholder-wraper' style={{display: (isPlaceholderVisible?'none':'flex')}}>
          {plus}
          <div className='main__placeholder'>Добавить задачу</div>
        </div>
        <input ref={inputRef} onKeyDown={(e)=>{if (e.key === 'Enter') {submitReview()}}} className='main__input' autoComplete="off" type='text' onFocus={()=>{setIsPlaceholderVisible(true);setIsAddingTaskModeOn(true)}} onBlur={(e)=>{checkIsAddingTaskModeOn(e as FocusEvent); checkIsPlaceholderVisible((e as FocusEvent))}}/>
        <div className='main_input-condiments' style={{/* display: (isAddingTaskModeOn ? 'flex' : 'none') */ }}>
          <div ref={calendarButtonRef} tabIndex={0} onClick={() => { setIsCalendarVisible(!isCalendarVisible); setIsCondimentsVisible(false) }} className='input-icon main__input-icon_right-border'>
            <AddDate />
          </div>
          <div ref={calendarRef}>
            <CalendarContext {...{ style: { display: (isCalendarVisible ? 'block' : 'none') }, attr: { tabIndex: 0 }, isCalendarVisible: isCalendarVisible, setIsCalendarVisible: setIsCalendarVisible }} />
          </div>
          <div ref={condimentsButtonRef} tabIndex={0} onClick={()=>{setIsCondimentsVisible(!isCondimentsVisible);setIsCalendarVisible(false)}} className='input-icon input-icon__arrow'>
            <Arrow {...{fill: "#f58c74", width: "13px", height: "13px"}}/>
          </div>
          <div ref={condimentsRef}>
            <TaskCondiments {...{style: {display: (isCondimentsVisible?'block':'none')}, attr: {tabIndex: 0}}}/>
          </div>
        </div>
      </div>
    </div>
  );
}
