import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProjects } from '../../Actions/projects'
import { setCreateProject } from '../../Actions/view'
import { RootState } from '../../store'
import { Arrow, Plus } from '../Icons'
import { ProjectsListItem } from './ProjectsListItem'
import './Sidebar.css'

export function ProjectsList(props: any) {
    const [isOpen, setIsOpen] = useState(false)
    const [display, setDisplay] = useState('none')
    const [rotateClass, setRotateClass] = useState('')

    const toggleList = () => {
        isOpen ? setDisplay('none') : setDisplay('block')
        isOpen ? setRotateClass('') : setRotateClass('rotate')
        setIsOpen(!isOpen)
    }

    const dispatch = useDispatch()
    const projects = useSelector((state: RootState)=>state.projects)
    useEffect(() => {
        dispatch(getProjects())
    }, []);

    return (
        <div className='dropdown_list'>
            <div className='dropdown_list__header'>
                <div className='dropdown_list__header_clickable' onClick={toggleList}>
                <div className={"dropdown_list__arrow-wrapper " + rotateClass}>
                    <Arrow {...{fill: "#8c8c8c", width: "13px", height: "13px"}}/>
                </div>
                <p className='dropdown_list__header-text'>Проекты</p>
                </div>
                {props.isChangingModeOn &&
                    <div className='dropdown_list__plus-wrapper' onClick={()=>{dispatch(setCreateProject(true))}}>
                        <Plus {...{fill: "#8c8c8c", width: "15px", height: "15px"}}/>
                    </div>
                }
            </div>
            <ul style={{display: display}} className='dropdown_list__body'>
                {projects.map((project)=>{
                    return <div key={project.id_project}>
                        <ProjectsListItem {...{project: project, isChangingModeOn: props.isChangingModeOn}}/>
                    </div> 
                })}
            </ul>
        </div>
      );
}