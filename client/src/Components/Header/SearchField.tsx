import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchTasks } from '../../Actions/tasks'
import { RootState } from '../../store'
import './Header.css'

export function SearchField() {
    const [fillColor, setfillColor] = useState("#fff")
    const inputRef = useRef<HTMLInputElement>(null)
    const dispatch = useDispatch()
    const idUser = useSelector((state: RootState) => state.user.id_user)
    const submitReview = () => {
        if (inputRef.current && inputRef.current.value.length > 0 && inputRef.current.value.replace(/\s/g, '').length > 0)
        {
          dispatch(searchTasks(idUser, inputRef.current.value))
        }
      }

    return (
        <div className="search-field" onMouseEnter={()=>{setfillColor("#444")}} onMouseLeave={()=>{setfillColor("#fff")}} onFocus={()=>{setfillColor("#444")}}>
            <div className="icon search-field__magnifier">
                <svg fill={fillColor} viewBox="0 0 512.005 512.005" width="20px" height="20px">
                    <path d="M508.885 493.784L353.109 338.008c32.341-35.925 52.224-83.285 52.224-135.339C405.333 90.925 314.41.002 202.666.002S0 90.925 0 202.669s90.923 202.667 202.667 202.667c52.053 0 99.413-19.883 135.339-52.245l155.776 155.776a10.645 10.645 0 007.552 3.136c2.731 0 5.461-1.045 7.552-3.115a10.7 10.7 0 00-.001-15.104zM202.667 384.003c-99.989 0-181.333-81.344-181.333-181.333S102.677 21.336 202.667 21.336 384 102.68 384 202.669s-81.344 181.334-181.333 181.334z"></path>
                </svg>
            </div>
            <input ref={inputRef} onKeyDown={(e)=>{if (e.key === 'Enter') {submitReview()}}} className="search-field__input" type="text" name="search" placeholder="Поиск"/>
        </div>
      );
}