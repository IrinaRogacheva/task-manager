import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { takeBackTask, updateTaskStatus } from '../../Actions/tasks';
import { setDeletedMesageVisibility } from '../../Actions/view';
import { Task } from '../../entries';
import { RootState } from '../../store';
import { Plus } from '../Icons';
import './Main.css'

export default function DeletedTaskMessage(props: any) {
  const dispatch = useDispatch()
  const view = useSelector(((state: RootState) => state.view))
  const undoTaskDeleted = () => {
    dispatch(takeBackTask(view.idTaskDeleted, view.deletedTaskIndex))
    dispatch(updateTaskStatus(view.idTaskDeleted, view.deletedTaskTags, {status: 0}))
    dispatch(setDeletedMesageVisibility(false))
  }

  return (
    <div className='message_about_done_task' style={{display: (view.deletedTaskMessageVisibility?'flex':'none')}}>
        <p className='message_text'>Задача удалена</p>
        <button className='cancel_button' onClick={()=>{undoTaskDeleted()}}>Отмена</button>
        <div className='exit_icon' onClick={()=>dispatch(setDeletedMesageVisibility(false))}>
            <Plus {...{fill: "#fff", width: "13px", height: "13px", transform: "rotate(45deg)"}}/>
        </div>
    </div>
    );
}