import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import ProjectsDataService from "../../Services/projects.service";
import './Sidebar.css'
import { setCurrentTab, setCurrentTabProjectId } from '../../Actions/view';
import { setTaskProject } from '../../Actions/new-task';
import { ProjectContextMenu } from './ProjectContextMenu';

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

    const dispatch = useDispatch()
    const view = useSelector((state: RootState) => state.view)
    const newTask = useSelector((state: RootState) => state.newTask)

    const processClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (props.isChangingModeOn) {
            const closestElement = (e.target as HTMLElement).closest(`.project-context-menu`)
            if ((e.target as HTMLElement).tagName !== "svg" && (e.target as HTMLElement).tagName !== "path" && !closestElement)
            {
                dispatch(setCurrentTab("project"))
                dispatch(setCurrentTabProjectId(props.project.id_project))
            }
        } else {
            if (newTask.id_project === props.project.id_project) {
                dispatch(setTaskProject(null))
            } else {
                dispatch(setTaskProject(props.project.id_project))
            }
        }
    }
    return (
        <div data-name="project" data-id={props.project.id_project} onClick={(e)=>{processClick(e)}} className={`dropdown_list__item-wrapper ${(props.isChangingModeOn && view.currentTab === "project" && view.currentTabProjectId === props.project.id_project)?"sidebar__button_current":""} ${!props.isChangingModeOn && newTask.id_project===props.project.id_project?"new_task_project_current":""}`}>
            <span className='dropdown_list__marker' style={{backgroundColor: "#" + props.project.color}}></span>
            <li className='dropdown_list__item'>
                {props.project.name}
            </li>
            {props.isChangingModeOn &&
            <>
            <div className="sidebar__number-of-tasks">{countOfTasks}</div>
            <ProjectContextMenu {...{id_project: props.project.id_project}}/>        
            </>
            }
        </div> 
    );
}