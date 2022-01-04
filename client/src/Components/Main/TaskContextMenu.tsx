import React from 'react'
import { useDispatch } from 'react-redux';
import { updateTask } from '../../Actions/tasks';
import { setDeletedIdTask, setDeletedMesageVisibility } from '../../Actions/view';
import { TrashCan } from '../Icons';
import './Main.css'

export function TaskContextMenu(props: any) {
  const dispatch = useDispatch()

  const setTaskDeleted = () => {
    dispatch(updateTask(props.id_task, {status: 2}))
    dispatch(setDeletedIdTask(props.id_task))
    dispatch(setDeletedMesageVisibility(true))
    setTimeout(()=>dispatch(setDeletedMesageVisibility(false)), 4000)
  }

    return (
        <div className="task-context-menu context-menu" style={props.style} {...props.attr}>
          <button className='task-context-menu__button' onClick={()=>{setTaskDeleted()}}>
            <TrashCan {...{fill: "#a3a3a3", width: "17px", height: "15px"}}/>
            <p className="sidebar__text task-context-menu__text">Удалить</p>
          </button>
        </div>
      );
}