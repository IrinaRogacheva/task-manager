import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './Main.css'
import { getDeletedTasks, getDoneTasks, getIncomingTasks, getTodayTasks } from '../../Actions/tasks'
import { RootState } from '../../store';
import Task from './Task';

export default function TasksList(props: any) {
  const dispatch = useDispatch();
  const tasksList = useSelector((state: RootState) => state.tasks)
  const view = useSelector((state: RootState) => state.view)
  
  useEffect(() => {
    if (view.currentTab === "incoming") {
      dispatch(getIncomingTasks());
    } else if (view.currentTab === "done")
    {
      dispatch(getDoneTasks())
    } else if (view.currentTab === "today")
    {
      dispatch(getTodayTasks())
    } else if (view.currentTab === "deleted") {
      dispatch(getDeletedTasks())
    }
    
  }, [dispatch, tasksList, view.currentTab]);

  return (
    <ul className='main_tasks-list'>
      {tasksList.map((task)=>{
        return <div key={task.id_task}>
          <Task {...task}/>
        </div>
      })}
    </ul>
  );
}