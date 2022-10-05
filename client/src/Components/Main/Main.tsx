import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearTrash } from '../../Actions/tasks';
import { RootState } from '../../store';
import './Main.css'
import NewTaskInput from './NewTaskInput';
import TasksList from './TasksList';
import ProjectsDataService from "../../Services/projects.service";
import TagsDataService from "../../Services/tags.service";
import { SortWindow } from './SortWindow';

export function Main(props: any) {
  const [title, setTitle] = useState("")
  function getNameOfCurrentProject(id: number): string {
    async function makeRequest() {
      const res = await ProjectsDataService.getProjectNameById(id)
      setTitle(res.data[0].name)
    }
    makeRequest()
    return title
  }

  function getNameOfCurrentTag(id: number): string {
    async function makeRequest() {
      const res = await TagsDataService.getTagNameById(id)
      setTitle(res.data[0].name)
    }
    makeRequest()
    return title
  }

  const view = useSelector(((state: RootState) => state.view))
  const idAuthor = useSelector(((state: RootState) => state.user.id_user))
  const [sortWindow, setSortWindow] = useState(false)
  const dispatch = useDispatch()
    return (
      <div className="main" style={{ width: (view.sidebarVisibility ? '45%' : '65%'), padding: (view.sidebarVisibility ? '20px 30px' : '20px 50px') }}>
          <div className='main_title_wrapper'>
            <p className='main__title'>{(view.currentTab==="incoming")?"Входящие":(view.currentTab==="today"?"Сегодня":(view.currentTab==="next_week"?"Следующие 7 дней":(view.currentTab==="done"?"Выполнено":(view.currentTab==="deleted"?"Корзина":(view.currentTab==="project"?getNameOfCurrentProject(view.currentTabProjectId):(view.currentTab==="tag"?getNameOfCurrentTag(view.currentTabTagId):""))))))}</p>
            <div style={{position: 'relative'}}>
            {(view.currentTab === "deleted") &&
            <button onClick={()=>{dispatch(clearTrash(idAuthor))}} title='Очистить корзину' className='clear-trash-icon'></button>
            }
            <button onClick={()=>{setSortWindow(!sortWindow)}} className='sort-tasks-icon'></button>
            <SortWindow {...{sortWindow: sortWindow, setSortWindow: setSortWindow}}/>
            </div>
          </div>
          {(view.currentTab !== "done" && view.currentTab !== "deleted") &&
          <NewTaskInput/>
          }
          <TasksList/>
          
        </div>
      );
}