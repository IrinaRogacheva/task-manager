import React, { useEffect, useState } from 'react'
import './Main.css'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { setTaskDate } from '../../Actions/new-task';
import moment from 'moment';
import { RootState } from '../../store';
require('dayjs/locale/ru')

export function CalendarContext(props: any) {
  const dispatch = useDispatch()

  const [value, setValue] = useState(new Date())

  function onChange(nextValue: Date) {
    setValue(nextValue)
    dispatch(setTaskDate(new Date(dayjs(nextValue).format('YYYY-MM-DD'))))
  }

  const newTask = useSelector(((state: RootState) => state.newTask))
  useEffect(() => {
    if (newTask.date) { 
      setValue(newTask.date)
      console.log("newTask.date: ", value)
    } else {
      setValue(new Date())
    }
  }, [newTask.date]);

  dayjs.locale('ru')

    return (
      <div className="calendar context-menu" style={props.style} {...props.attr}>
        <div className='calendar-icons-wrapper'>
          <button onClick={() => { dispatch(setTaskDate(new Date(moment().format('YYYY-MM-DD')))); props.setIsCalendarVisible(false) }} className='calendar-icon calendar-today'></button>
          <button onClick={() => { dispatch(setTaskDate(new Date(moment().add(1,'days').format('YYYY-MM-DD')))); props.setIsCalendarVisible(false) }} className='calendar-icon calendar-tomorrow'></button>
          <button onClick={() => { dispatch(setTaskDate(new Date(moment().add(7, 'days').format('YYYY-MM-DD')))); props.setIsCalendarVisible(false) }} className='calendar-icon calendar-next_week'></button>
          <button onClick={() => { dispatch(setTaskDate(new Date(moment().add(1, 'months').format('YYYY-MM-DD')))); props.setIsCalendarVisible(false) }} className='calendar-icon calendar-next_month'></button>
        </div>
        <Calendar {...{ value: new Date(), minDate: new Date() }} formatMonthYear={(locale, date) => dayjs(date).format('MMMM YYYY')} onChange={onChange} value={value} />
        </div>
      );
}