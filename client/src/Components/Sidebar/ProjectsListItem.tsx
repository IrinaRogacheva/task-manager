import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import ProjectsDataService from "../../Services/projects.service";
import './Sidebar.css'
import { setCurrentTab, setCurrentTabProjectId } from '../../Actions/view';

export function ProjectsListItem(props: any) {
    const [countOfTasks, setCountOfTasks] = useState(0)
    const tasks = useSelector((state: RootState) => state.tasks)
    useEffect(() => {
        async function getCountOfTasks() {
            const res = await ProjectsDataService.getCountOfTasks(props.project.id_project)
            setCountOfTasks(res.data[0].count)
        }
        getCountOfTasks()
      }, [tasks]);

    const view = useSelector((state: RootState) => state.view)
    const dispatch = useDispatch()
    return (
        <div onClick={()=>{dispatch(setCurrentTab("project"));dispatch(setCurrentTabProjectId(props.project.id_project))}} className={`dropdown_list__item-wrapper ${(view.currentTab === "project" && view.currentTabProjectId === props.project.id_project)?"sidebar__button_current":""}`}>
            <span className='dropdown_list__marker' style={{backgroundColor: "#" + props.project.color}}></span>
            <li className='dropdown_list__item'>
                {props.project.name}
            </li>
            {props.isChangingModeOn &&
            <div className="sidebar__number-of-tasks">{countOfTasks}</div>
            }
        </div> 
    );
}