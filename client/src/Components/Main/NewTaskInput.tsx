import React, { useRef, useState, FocusEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPriority, setTaskName } from '../../Actions/new-task';
import { addTask } from '../../Actions/tasks';
import { selectNewTask } from '../../store';
import { AddDate, Arrow, Plus } from '../Icons';
import { Calendar } from './Calendar';
import './Main.css'
import { TaskCondiments } from './TaskCondiments';

export default function NewTaskInput(props: any) { 
  const [isHover, setIsHover] = useState(false)
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(false)
  const [isCalendarVisible, setIsCalendarVisible] = useState(true)
  const [isCondimentsVisible, setIsCondimentsVisible] = useState(true)
  const [isAddingTaskModeOn, setIsAddingTaskModeOn] = useState(false)

  const checkIsPlaceholderVisible = (e: FocusEvent) => {
    if (e.relatedTarget !== null || (e.target as HTMLInputElement).value.length > 0) {
      setIsPlaceholderVisible(true) //hide
    }
    else
    {
      setIsPlaceholderVisible(false) //show
    }
  }

  const checkIsAddingTaskModeOn = (e: FocusEvent) => {
    if(e.relatedTarget !== null) {
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
      if(!(calendarRef.current as HTMLDivElement).contains(e.target as Node) && !(condimentsRef.current as HTMLDivElement).contains(e.target as Node)  && !(condimentsButtonRef.current as HTMLDivElement).contains(e.target as Node) && !(calendarButtonRef.current as HTMLDivElement).contains(e.target as Node))
      {
        setIsCondimentsVisible(true)
        setIsCalendarVisible(true)
        console.log('onClick at other element')
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [isCalendarVisible, isCondimentsVisible])

  
  const dispatch = useDispatch()
  const newTask = useSelector(selectNewTask)
  
  const submitReview = () => {
    if (inputRef.current)
    {
      console.log('inputRef.current.value: '+ inputRef.current.value)
      dispatch(setTaskName(inputRef.current.value))
      console.log('newTask.name: '+newTask.name)
      dispatch(addTask(newTask))
      dispatch(setPriority(0))
      inputRef.current.value = ""
    }
  }

  return (
    <div>
      <div className='main_input-wraper' onMouseEnter={()=>{setIsHover(true)}} onMouseLeave={()=>{setIsHover(false)}}>
        <div onClick={()=>{(inputRef.current as HTMLInputElement).focus()}} className='main_placeholder-wraper' style={{display: (isPlaceholderVisible?'none':'flex')}}>
          {plus}
          <div className='main__placeholder'>Добавить задачу</div>
        </div>
        <input ref={inputRef} onKeyDown={(e)=>{if (e.key === 'Enter') {submitReview()}}} className='main__input' name='task' autoComplete="off" type='text' onFocus={()=>{setIsPlaceholderVisible(true);setIsAddingTaskModeOn(true)}} onBlur={(e)=>{checkIsAddingTaskModeOn(e as FocusEvent); checkIsPlaceholderVisible((e as FocusEvent))}}/>
        <div className='main_input-condiments' style={{display: (isAddingTaskModeOn?'flex':'none')}}>
          <div ref={calendarButtonRef} tabIndex={0} onClick={()=>{setIsCalendarVisible(!isCalendarVisible);setIsCondimentsVisible(true)}} className='input-icon main__input-icon_right-border'>
            <AddDate/>
          </div>
          <div ref={calendarRef}>
            <Calendar {...{style: {display: (isCalendarVisible?'none':'block')}, attr: {tabIndex: 0}}}/>
          </div>
          <div ref={condimentsButtonRef} tabIndex={0} onClick={()=>{setIsCondimentsVisible(!isCondimentsVisible);setIsCalendarVisible(true)}} className='input-icon input-icon__arrow'>
            <Arrow {...{fill: "#f58c74", width: "13px", height: "13px"}}/>
          </div>
          <div ref={condimentsRef}>
            <TaskCondiments {...{style: {display: (isCondimentsVisible?'none':'block')}, attr: {tabIndex: 0}}}/>
          </div>
        </div>
      </div>
    </div>
  );
}