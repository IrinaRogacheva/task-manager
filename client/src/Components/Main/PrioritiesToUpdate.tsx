import { useDispatch } from 'react-redux';
import { updateTaskPriority } from '../../Actions/tasks';
import { PriorityIcon } from '../Icons';
import './Main.css'

export function PrioritiesToUpdate(props: any) {
    const dispatch = useDispatch()
    
    const getPriorityClassName = (numberOfPriority: number): string|void => {
        if (numberOfPriority === props.priority)
        {
            return 'priorities_selected';
        }
      }

    return (
        <div className='priorities-wrapper'>
            <p className='priorities__header'>Приоритет</p>
            <div className='priorities'>
                <div className={'priorities_icon-wrapper ' + getPriorityClassName(1)} onClick={()=>{dispatch(updateTaskPriority(props.id_task, props.tags, {priority: 1}))}}>
                    <PriorityIcon {...{fill: '#e03131', width: '17px', height: '20px'}}/>
                </div>
                <div className={'priorities_icon-wrapper ' + getPriorityClassName(2)} onClick={()=>dispatch(updateTaskPriority(props.id_task, props.tags, {priority: 2}))}>
                    <PriorityIcon {...{fill: '#ffb000', width: '17px', height: '20px'}}/>
                </div>
                <div className={'priorities_icon-wrapper ' + getPriorityClassName(3)} onClick={()=>dispatch(updateTaskPriority(props.id_task, props.tags, {priority: 3}))}>
                    <PriorityIcon {...{fill: '#4772fa', width: '17px', height: '20px'}}/>
                </div>
                <div className={'priorities_icon-wrapper ' + getPriorityClassName(0)} onClick={()=>dispatch(updateTaskPriority(props.id_task, props.tags, {priority: 0}))}>
                    <PriorityIcon {...{fill: '#a3a3a3', width: '17px', height: '20px'}}/>
                </div>
            </div>
        </div>
      );
}