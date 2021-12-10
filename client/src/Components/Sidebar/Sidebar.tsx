import React from 'react'
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
    return (
        <div className="sidebar">
            <button className="sidebar__button">
                <DrawerIcon/>
                <p className="sidebar__text">Входящие</p>
                <p className="sidebar__number-of-tasks">{props.numberOfIncoming}</p>
            </button>
            <button className="sidebar__button">
                <DayOfCalendarIcon/>
                <p className="sidebar__text">Сегодня</p>
                <p className="sidebar__number-of-tasks">{props.numberOfTodayTasks}</p>
            </button>
            <button className="sidebar__button">
                <CalendarIcon/>
                <p className="sidebar__text">Следующие 7 дней</p>
                <p className="sidebar__number-of-tasks">{props.numberOfUpcoming}</p>
            </button>
            <div className="dropdown-lists">
                <DropdownList isChangingModeOn={true} {...{ items: props.projectsNames, dropdownListName: 'Проекты', numberOfTasksInItem: props.numberOfTasksInProject, colorsOfItems: props.colorsOfProjects }}/>
                <DropdownList isChangingModeOn={true} {...{ items: props.tagsNames, dropdownListName: 'Теги', numberOfTasksInItem: props.numberOfTasksInTag, colorsOfItems: props.colorsOfTags }}/>
            </div>
            <button className="sidebar__button">
                <Tick/>
                <p className="sidebar__text">Выполнено</p>
            </button>
            <button className="sidebar__button">
                <TrashCan/>
                <p className="sidebar__text">Корзина</p>
            </button>
        </div>
      );
}