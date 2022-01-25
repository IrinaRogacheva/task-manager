import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import TagsDataService from "../../Services/tags.service";
import './Sidebar.css'
import { setCurrentTab, setCurrentTabTagId } from '../../Actions/view';
import { addTagToNewTask, deleteTagToNewTask } from '../../Actions/new-task';
import { TagContextMenu } from './TagContextMenu';

export function TagsListItem(props: any) {
    const [countOfTasks, setCountOfTasks] = useState(0)
    const tasks = useSelector((state: RootState) => state.tasks)
    useEffect(() => {
        async function getCountOfTasks() {
            const res = await TagsDataService.getCountOfTasks(props.tag.id_tag)
            setCountOfTasks(res.data[0].count)
        }
        getCountOfTasks()
      }, [tasks]);

    const view = useSelector((state: RootState) => state.view)
    const newTask = useSelector((state: RootState) => state.newTask)
    const dispatch = useDispatch()
    const processClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (props.isChangingModeOn) {
            const closestElement = (e.target as HTMLElement).closest(`.tag-context-menu`)
            if ((e.target as HTMLElement).tagName !== "svg" && (e.target as HTMLElement).tagName !== "path" && !closestElement)
            {
                dispatch(setCurrentTab("tag"))
                dispatch(setCurrentTabTagId(props.tag.id_tag))
            }
        } else {
            if (newTask.id_tags.includes(props.tag)) {
                dispatch(deleteTagToNewTask(props.tag.id_tag))
            } else {
                dispatch(addTagToNewTask(props.tag))
            }
        }
    }

    return (
        <div data-name="tag" data-id={props.tag.id_tag} onClick={(e)=>{processClick(e)}} className={`dropdown_list__item-wrapper ${(props.isChangingModeOn && view.currentTab === "tag" && view.currentTabTagId === props.tag.id_tag)?"sidebar__button_current":""} ${!props.isChangingModeOn && newTask.id_tags.includes(props.tag)?"new_task_project_current":""}`}>
            <span className='dropdown_list__marker' style={{backgroundColor: "#" + props.tag.color}}></span>
            <li className='dropdown_list__item'>
                {props.tag.name}
            </li>
            {props.isChangingModeOn &&
            <>
            <div className="sidebar__number-of-tasks">{countOfTasks}</div>
            <TagContextMenu {...{id_tag: props.tag.id_tag}}/>        
            </>
            }
        </div> 
    );
}