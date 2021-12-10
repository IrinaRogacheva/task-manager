import { useDispatch, useSelector } from 'react-redux';
import { setPriority } from '../../Actions/new-task';
import { selectNewTask } from '../../store';
import { PriorityIcon } from '../Icons';
import './Main.css'

export function Priorities(props: any) {
    const dispatch = useDispatch()
    const task = useSelector(selectNewTask)

    const getPriorityClassName = (numberOfPriority: number): string|void => {
        if (numberOfPriority === task.priority)
        {
            return 'priorities_selected';
        }
      }

    return (
        <div className='priorities-wrapper'>
            <p className='priorities__header'>Приоритет</p>
            <div className='priorities'>
                <div className={'priorities_icon-wrapper ' + getPriorityClassName(1)} onClick={()=>dispatch(setPriority(1))}>
                    <PriorityIcon {...{fill: '#e03131', width: '17px', height: '20px'}}/>
                </div>
                <div className={'priorities_icon-wrapper ' + getPriorityClassName(2)} onClick={()=>dispatch(setPriority(2))}>
                    <PriorityIcon {...{fill: '#ffb000', width: '17px', height: '20px'}}/>
                </div>
                <div className={'priorities_icon-wrapper ' + getPriorityClassName(3)} onClick={()=>dispatch(setPriority(3))}>
                    <PriorityIcon {...{fill: '#4772fa', width: '17px', height: '20px'}}/>
                </div>
                <div className={'priorities_icon-wrapper ' + getPriorityClassName(0)} onClick={()=>dispatch(setPriority(0))}>
                    <PriorityIcon {...{fill: '#a3a3a3', width: '17px', height: '20px'}}/>
                </div>
            </div>
        </div>
      );
}