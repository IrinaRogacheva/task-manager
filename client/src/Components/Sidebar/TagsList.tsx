import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTags } from '../../Actions/tags'
import { RootState } from '../../store'
import { Arrow, Plus } from '../Icons'
import { TagsListItem } from './TagsListItem'
import './Sidebar.css'
import { setCreateTag } from '../../Actions/view'

export function TagsList(props: any) {
    const [isOpen, setIsOpen] = useState(false)
    const [display, setDisplay] = useState('none')
    const [rotateClass, setRotateClass] = useState('')

    const toggleList = () => {
        isOpen ? setDisplay('none') : setDisplay('block')
        isOpen ? setRotateClass('') : setRotateClass('rotate')
        setIsOpen(!isOpen)
    }

    const dispatch = useDispatch()
    const tags = useSelector((state: RootState)=>state.tags)
    useEffect(() => {
        dispatch(getTags())
    }, []);

    return (
        <div className='dropdown_list'>
            <div className='dropdown_list__header'>
                <div className='dropdown_list__header_clickable' onClick={toggleList}>
                <div className={"dropdown_list__arrow-wrapper " + rotateClass}>
                    <Arrow {...{fill: "#8c8c8c", width: "13px", height: "13px"}}/>
                </div>
                <p className='dropdown_list__header-text'>Теги</p>
                </div>
                {props.isChangingModeOn &&
                    <div className='dropdown_list__plus-wrapper something' onClick={()=>{dispatch(setCreateTag(true))}}>
                        <Plus {...{fill: "#8c8c8c", width: "15px", height: "15px"}}/>
                    </div>
                }
            </div>
            <ul style={{display: display}} className='dropdown_list__body'>
                {tags.map((tag)=>{
                    return <div key={tag.id_tag}>
                        <TagsListItem {...{tag: tag, isChangingModeOn: props.isChangingModeOn}}/>
                    </div> 
                })}
            </ul>
        </div>
      );
}