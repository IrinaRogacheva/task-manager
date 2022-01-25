import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearTrash } from '../../Actions/tasks';
import { RootState } from '../../store';
import './Main.css'
import NewTaskInput from './NewTaskInput';
import TasksList from './TasksList';
import ProjectsDataService from "../../Services/projects.service";
import TagsDataService from "../../Services/tags.service";

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
  const dispatch = useDispatch()
    return (
        <div className="main">
          <div className='main_title_wrapper'>
            <p className='main__title'>{(view.currentTab==="incoming")?"Входящие":(view.currentTab==="today"?"Сегодня":(view.currentTab==="next_week"?"Следующие 7 дней":(view.currentTab==="done"?"Выполнено":(view.currentTab==="deleted"?"Корзина":(view.currentTab==="project"?getNameOfCurrentProject(view.currentTabProjectId):(view.currentTab==="tag"?getNameOfCurrentTag(view.currentTabTagId):""))))))}</p>
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