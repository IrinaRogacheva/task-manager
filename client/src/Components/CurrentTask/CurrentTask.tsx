import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateTaskDescription, updateTaskName } from '../../Actions/tasks';
import { RootState } from '../../store';
import './../Main/Main.css'
import { BottomBlock } from './BottomBlock';
import { CurrentTagsList } from './CurrentTagsList';
import './CurrentTask.css'

export function CurrentTask(props: any) {
    const currentTask = useSelector((state: RootState) => state.currentTask)
    const dispatch = useDispatch()
    const [taskName, setTaskName] = useState(currentTask.name)
    const [textareaText, setTextAreaText] = useState(currentTask.description??"")
    useEffect(() => {
        setTaskName(currentTask.name)
        setTextAreaText(currentTask.description??"")
      }, [currentTask]);  
    
    useEffect(() => {
        if (taskName.length > 0 && taskName.replace(/\s/g, '').length > 0)
        {
          const timeOutId = setTimeout(() => dispatch(updateTaskName(currentTask.id_task, currentTask.id_tags, {name: taskName})), 1000);
          return () => clearTimeout(timeOutId);
        }
      }, [taskName]);

      useEffect(() => {
        if (textareaText.length > 0 && textareaText.replace(/\s/g, '').length > 0)
        {
          const timeOutId = setTimeout(() => dispatch(updateTaskDescription(currentTask.id_task, currentTask.id_tags, {description: textareaText})), 1000);
          return () => clearTimeout(timeOutId);
        }
      }, [textareaText]);
    
    return (
        <div className="current_task">
            <div className="current_task_middle_block">
                <input autoComplete='off' value={taskName} onChange={(e)=>{setTaskName(e.target.value)}} className='current_task__input'/>
                {(taskName.length > 0) && <>
                <textarea onChange={(e)=>{setTextAreaText(e.target.value)}} className='current_task__description' value={textareaText} placeholder='Описание'/>
                <CurrentTagsList {...{tags: currentTask.id_tags, id_task: currentTask.id_task}}/>
                </>}
            </div>
            <BottomBlock {...{id_task: currentTask.id_task, id_project: currentTask.id_project, tags: currentTask.id_tags}}/>
        </div>
      );
}