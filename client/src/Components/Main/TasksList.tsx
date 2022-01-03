import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './Main.css'
import { getTasks } from '../../Actions/tasks'
import { RootState } from '../../store';
import Task from './Task';

export default function TasksList(props: any) {
  const dispatch = useDispatch();
  const tasksList = useSelector((state: RootState) => state.tasks)
  
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch, tasksList]);

  return (
    <ul className='main_tasks-list'>
      {tasksList.map((task)=>{
        return <Task {...task}/>
      })}
    </ul>
  );
}