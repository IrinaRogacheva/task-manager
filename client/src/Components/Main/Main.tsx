import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearTrash } from '../../Actions/tasks';
import { RootState } from '../../store';
import './Main.css'
import NewTaskInput from './NewTaskInput';
import TasksList from './TasksList';

export function Main(props: any) {
  const view = useSelector(((state: RootState) => state.view))
  const dispatch = useDispatch()
    return (
        <div className="main">
          <div className='main_title_wrapper'>
            <p className='main__title'>{(view.currentTab==="incoming")?"Входящие":(view.currentTab==="today"?"Сегодня":(view.currentTab==="next_week"?"Следующие 7 дней":(view.currentTab==="done"?"Выполнено":(view.currentTab==="deleted"?"Корзина":"Что-то"))))}</p>
            {(view.currentTab === "deleted") &&
            <button onClick={()=>{dispatch(clearTrash())}} title='Очистить корзину' className='clear-trash-icon'></button>
            }
          </div>
          {(view.currentTab !== "done" && view.currentTab !== "deleted") &&
          <NewTaskInput/>
          }
          <TasksList/>
          
        </div>
      );
}