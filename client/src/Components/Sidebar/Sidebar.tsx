import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TasksDataService from "../../Services/tasks.service";
import { setCurrentTab } from '../../Actions/view';
import { RootState } from '../../store';
import { CalendarIcon, DayOfCalendarIcon, DrawerIcon, Tick, TrashCan } from '../Icons';
import { ProjectsList } from './ProjectsList';
import { TagsList } from './TagsList';

export function Sidebar(props: any) {
    const [countOfIncoming, setCountOfIncoming] = useState(0)
    const [countOfToday, setCountOfToday] = useState(0)
    const view = useSelector(((state: RootState) => state.view))
    const tasks = useSelector(((state: RootState) => state.tasks))
    const idAuthor = useSelector(((state: RootState) => state.user.id_user))
    const dispatch = useDispatch()

    useEffect(() => {
        async function getCountOfIncoming() {
            const res = await TasksDataService.getCountOfIncoming(idAuthor)
            setCountOfIncoming(res.data[0].countOfIncoming)
        }
        async function getCountOfToday() {
            const res = await TasksDataService.getCountOfToday(idAuthor)
            setCountOfToday(res.data[0].countOfToday)
        }
        getCountOfIncoming()
        getCountOfToday()
      }, [tasks]);

    return (
        <div className="sidebar" style={{display: (view.sidebarVisibility ? 'block':'none')}}>
            <button onClick={()=>{dispatch(setCurrentTab("incoming"))}} className={`sidebar__button ${(view.currentTab === "incoming")?"sidebar__button_current":""}`}>
                <DrawerIcon/>
                <p className="sidebar__text">Входящие</p>
                <p className="sidebar__number-of-tasks">{countOfIncoming}</p>
            </button>
            <button onClick={()=>{dispatch(setCurrentTab("today"))}} className={`sidebar__button ${(view.currentTab === "today")?"sidebar__button_current":""}`}>
                <DayOfCalendarIcon/>
                <p className="sidebar__text">Сегодня</p>
                <p className="sidebar__number-of-tasks">{countOfToday}</p>
            </button>
            <button onClick={() => { dispatch(setCurrentTab("next_week")) }} className={`sidebar__button ${(view.currentTab === "next_week") ? "sidebar__button_current" : ""}`}>
                <CalendarIcon />
                <p className="sidebar__text">Следующие 7 дней</p>
                <p className="sidebar__number-of-tasks">0</p>
            </button>
            <div className="dropdown-lists">
                <ProjectsList {...{isChangingModeOn: true}}/>
                <TagsList {...{isChangingModeOn: true}}/>
            </div>
            <button style={{margin:"0 3px"}} onClick={()=>{dispatch(setCurrentTab("done"))}} className={`sidebar__button ${(view.currentTab === "done")?"sidebar__button_current":""}`}>
                <Tick/>
                <p className="sidebar__text">Выполнено</p>
            </button>
            <button style={{ marginBottom: "30px" }} onClick={() => { dispatch(setCurrentTab("deleted")) }} className={`sidebar__button ${(view.currentTab === "deleted") ? "sidebar__button_current" : ""}`}>
                <TrashCan {...{fill: "#f58c74", width: "25px", height: "25px"}}/>
                <p className="sidebar__text">Корзина</p>
            </button>
        </div>
      );
}