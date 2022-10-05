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
  const undoTaskDone = () => {
    dispatch(takeBackTask(view.idTaskDone, view.doneTaskIndex))
    dispatch(updateTaskStatus(view.idTaskDone, view.doneTaskTags, {status: 0}))
    dispatch(setDoneMesageVisibility(false))
  }

  return (
    <div className='message_about_done_task' style={{display: (view.doneTaskMessageVisibility?'flex':'none')}}>
        <p className='message_text'>Задача выполнена</p>
        <button className='cancel_button' onClick={()=>{undoTaskDone()}}>Отмена</button>
        <div className='exit_icon' onClick={()=>dispatch(setDoneMesageVisibility(false))}>
            <Plus {...{fill: "#fff", width: "13px", height: "13px", transform: "rotate(45deg)"}}/>
        </div>
    </div>
    );
}