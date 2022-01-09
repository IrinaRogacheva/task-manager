import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import TagsDataService from "../../Services/tags.service";
import './Sidebar.css'
import { setCurrentTab, setCurrentTabTagId } from '../../Actions/view';
import { setTaskTag } from '../../Actions/new-task';

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
    const processClick = () => {
        if (props.isChangingModeOn) {
            dispatch(setCurrentTab("tag"))
            dispatch(setCurrentTabTagId(props.tag.id_tag))
        } else {
            dispatch(setTaskTag(props.tag.id_tag))
        }
    }

    return (
        <div onClick={()=>{processClick()}} className={`dropdown_list__item-wrapper ${(view.currentTab === "tag" && view.currentTabTagId === props.tag.id_tag)?"sidebar__button_current":""} ${newTask.id_tag===props.tag.id_tag?"new_task_project_current":""}`}>
            <span className='dropdown_list__marker' style={{backgroundColor: "#" + props.tag.color}}></span>
            <li className='dropdown_list__item'>
                {props.tag.name}
            </li>
            {props.isChangingModeOn &&
            <div className="sidebar__number-of-tasks">{countOfTasks}</div>
            }
        </div> 
    );
}