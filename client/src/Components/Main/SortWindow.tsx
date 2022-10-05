import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { sortByDate, sortByName, sortByPriority } from '../../Actions/tasks';
import { RootState } from '../../store';
import './Main.css'

export function SortWindow(props: any) {
  const dispatch = useDispatch()
  const tasks = useSelector((state: RootState) => state.tasks)

    return (
      <>
        <div className="sort-menu context-menu" style={{ display: (props.sortWindow ? 'block' : 'none') }}>
          <button className='task-context-menu__button' onClick={() => { dispatch(sortByDate(tasks)); props.setSortWindow(false) }}>
            <p className="sidebar__text task-context-menu__text">Произвольно</p>
          </button>
          <button className='task-context-menu__button' onClick={()=>{dispatch(sortByDate(tasks));props.setSortWindow(false)}}>
            <p className="sidebar__text task-context-menu__text">По времени</p>
          </button>
          <button className='task-context-menu__button' onClick={()=>{dispatch(sortByName(tasks));props.setSortWindow(false)}}>
            <p className="sidebar__text task-context-menu__text">По названию</p>
          </button>
          <button className='task-context-menu__button' onClick={()=>{dispatch(sortByPriority(tasks));props.setSortWindow(false)}}>
            <p className="sidebar__text task-context-menu__text">По приоритету</p>
          </button>
        </div>
      </>
      );
}