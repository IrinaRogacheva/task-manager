import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProjects } from '../../Actions/projects'
import { setCreateProject } from '../../Actions/view'
import { RootState } from '../../store'
import { Arrow, Plus } from '../Icons'
import { ProjectsListItem } from './ProjectsListItem'

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
    const idUser = useSelector((state: RootState)=>state.user.id_user)

    useEffect(() => {
      dispatch(getProjects(idUser))
  }, []);

    useEffect(() => {
      const onClick = (e: MouseEvent) => {
        const closestElement = (e.target as HTMLElement).closest(`[data-name="project"]`)
          const projectContextMenu = document.querySelectorAll(`.project-context-menu`)
          if (projectContextMenu) {
            projectContextMenu.forEach((menu) => {
              if((menu as HTMLElement).style.display === "block" && !(menu as HTMLElement).contains(e.target as HTMLElement)) {
                if(closestElement) {
                    if ((menu as HTMLElement).dataset.name !== `project_context_menu_${(closestElement as HTMLElement).dataset.id}`) {
                        (menu as HTMLElement).style.display = "none"
                        console.log('onClick at other element than context menu')
                    } 
                } else {
                  (menu as HTMLElement).style.display = "none"
                }
              }
            })
          }
        }
        document.addEventListener('click', onClick)
        return () => document.removeEventListener('click', onClick)
    }, [])

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