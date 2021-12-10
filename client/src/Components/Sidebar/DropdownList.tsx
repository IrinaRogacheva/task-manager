import React, { useState } from 'react'
import { Arrow, Plus } from '../Icons'
import './Sidebar.css'

export interface DropdownListProps {
    items: Array<string>,
    dropdownListName: string,
    numberOfTasksInItem: {[key: string]: number},
    colorsOfItems: {[key: string]: string},
    isChangingModeOn: boolean|undefined
}

export function DropdownList(props: DropdownListProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [display, setDisplay] = useState('none')
    const [rotateClass, setRotateClass] = useState('')

    const toggleList = () => {
        isOpen ? setDisplay('none') : setDisplay('block')
        isOpen ? setRotateClass('') : setRotateClass('rotate')
        setIsOpen(!isOpen)
    }

    return (
        <div className='dropdown_list'>
            <div className='dropdown_list__header' onClick={toggleList}>
                <div className={"dropdown_list__arrow-wrapper " + rotateClass}>
                    <Arrow {...{fill: "#8c8c8c", width: "13px", height: "13px"}}/>
                </div>
                <p className='dropdown_list__header-text'>{props.dropdownListName}</p>
                {props.isChangingModeOn &&
                    <div className='dropdown_list__plus-wrapper'>
                        <Plus {...{fill: "#8c8c8c", width: "15px", height: "15px"}}/>
                    </div>
                }
            </div>
            <ul style={{display: display}} className='dropdown_list__body'>
                {props.items.map((item)=>{
                    return <div key={props.items.indexOf(item)} className='dropdown_list__item-wrapper'>
                        <span className='dropdown_list__marker' style={{backgroundColor: props.colorsOfItems[item]}}></span>
                        <li className='dropdown_list__item'>
                            {item}
                        </li>
                        {props.isChangingModeOn &&
                            <div className="sidebar__number-of-tasks">{props.numberOfTasksInItem[item]}</div>
                        }
                    </div> 
                })}
            </ul>
        </div>
      );
}