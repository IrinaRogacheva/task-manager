import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { takeBackTask, updateTaskStatus } from '../../Actions/tasks';
import { setDoneMesageVisibility } from '../../Actions/view';
import { Task } from '../../entries';
import { RootState } from '../../store';
import { Plus } from '../Icons';
import './Main.css'

export default function DoneTaskMessage(props: any) {
  const dispatch = useDispatch()
  const view = useSelector(((state: RootState) => state.view))
  const tasks = useSelector((state:RootState) => state.tasks)
  const undoTaskDone = () => {
    dispatch(takeBackTask(view.idTaskDone, view.doneTaskIndex))
    dispatch(updateTaskStatus(view.idTaskDone, (tasks.find(el => el.id_task === view.idTaskDeleted) as Task).id_tags, {status: 0}))
    dispatch(setDoneMesageVisibility(false))
  }

  return (
    <div className='message_about_done_task context-menu' style={{display: (view.doneTaskMessageVisibility?'flex':'none')}}>
        <p className='sidebar__text message_text'>Задача выполнена</p>
        <button className='cancel_button sidebar__text' onClick={()=>{undoTaskDone()}}>Отмена</button>
        <div className='exit_icon' onClick={()=>dispatch(setDoneMesageVisibility(false))}>
            <Plus {...{fill: "#fff", width: "13px", height: "13px", transform: "rotate(45deg)"}}/>
        </div>
    </div>
    );
}