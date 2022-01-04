import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCountOfIncoming, getCountOfToday, setCurrentTab } from '../../Actions/view';
import { RootState } from '../../store';
import { CalendarIcon, DayOfCalendarIcon, DrawerIcon, Tick, TrashCan } from '../Icons';
import { DropdownList } from './DropdownList';
import './Sidebar.css'

interface SidebarProps {
    numberOfIncoming: number,
    numberOfTodayTasks: number,
    numberOfUpcoming: number,
    projectsNames: Array<string>,
    numberOfTasksInProject: {[key: string]: number},
    colorsOfProjects: {[key: string]: string},
    tagsNames: Array<string>,
    numberOfTasksInTag: {[key: string]: number},
    colorsOfTags: {[key: string]: string},
}

export function Sidebar(props: SidebarProps) {
    const view = useSelector(((state: RootState) => state.view))
    const tasks = useSelector(((state: RootState) => state.tasks))
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCountOfIncoming())
        dispatch(getCountOfToday())
      }, [tasks]);

    return (
        <div className="sidebar" style={{display: (view.sidebarVisibility ? 'block':'none')}}>
            <button onClick={()=>{dispatch(setCurrentTab("incoming"))}} className={`sidebar__button ${(view.currentTab === "incoming")?"sidebar__button_current":""}`}>
                <DrawerIcon/>
                <p className="sidebar__text">Входящие</p>
                <p className="sidebar__number-of-tasks">{view.countOfIncoming}</p>
            </button>
            <button onClick={()=>{dispatch(setCurrentTab("today"))}} className={`sidebar__button ${(view.currentTab === "today")?"sidebar__button_current":""}`}>
                <DayOfCalendarIcon/>
                <p className="sidebar__text">Сегодня</p>
                <p className="sidebar__number-of-tasks">{view.countOfToday}</p>
            </button>
            <button onClick={()=>{dispatch(setCurrentTab("next_week"))}} className={`sidebar__button ${(view.currentTab === "next_week")?"sidebar__button_current":""}`}>
                <CalendarIcon/>
                <p className="sidebar__text">Следующие 7 дней</p>
                <p className="sidebar__number-of-tasks">{props.numberOfUpcoming}</p>
            </button>
            <div className="dropdown-lists">
                <DropdownList isChangingModeOn={true} {...{ items: props.projectsNames, dropdownListName: 'Проекты', numberOfTasksInItem: props.numberOfTasksInProject, colorsOfItems: props.colorsOfProjects }}/>
                <DropdownList isChangingModeOn={true} {...{ items: props.tagsNames, dropdownListName: 'Теги', numberOfTasksInItem: props.numberOfTasksInTag, colorsOfItems: props.colorsOfTags }}/>
            </div>
            <button onClick={()=>{dispatch(setCurrentTab("done"))}} className={`sidebar__button ${(view.currentTab === "done")?"sidebar__button_current":""}`}>
                <Tick/>
                <p className="sidebar__text">Выполнено</p>
            </button>
            <button onClick={()=>{dispatch(setCurrentTab("deleted"))}} className={`sidebar__button ${(view.currentTab === "deleted")?"sidebar__button_current":""}`}>
                <TrashCan {...{fill: "#f58c74", width: "25px", height: "25px"}}/>
                <p className="sidebar__text">Корзина</p>
            </button>
        </div>
      );
}