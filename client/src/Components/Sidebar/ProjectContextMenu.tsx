import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { deleteProject } from '../../Actions/projects';
import { setUpdateProject, setUpdatingId } from '../../Actions/view';
import { ContextMenuIcon } from '../Icons';
import './../Main/Main.css'

export function ProjectContextMenu(props: any) {
  const dispatch = useDispatch()

  const [isProjectHover, setIsProjectHover] = useState(false)

  let contextMenuIcon: JSX.Element;
  if (isProjectHover) {
    contextMenuIcon = <ContextMenuIcon {...{fill: "#7a7a7a"}}/>
  } else {
    contextMenuIcon = <ContextMenuIcon {...{fill: "#a3a3a3"}}/>
  }

  const setProjectContextMenuVisible = ()=> {
    const projectContextMenu = document.querySelector(`[data-name="project_context_menu_${props.id_project}"]`)
    if (projectContextMenu)
    {
      if ((projectContextMenu as HTMLElement).style.display === 'none') {
        (projectContextMenu as HTMLElement).style.display = "block"
      } else {
        (projectContextMenu as HTMLElement).style.display = "none"
      }
    }
  }

  const closeProjectContextMenu = ()=> {
    const projectContextMenu = document.querySelector(`[data-name="project_context_menu_${props.id_project}"]`)
    if (projectContextMenu)
    {
     (projectContextMenu as HTMLElement).style.display = "none"
    }
  }

    return (
      <>
        <div onClick={setProjectContextMenuVisible} className='main_context-menu-wrapper sidebar_context-menu-wrapper' onMouseEnter={()=>{setIsProjectHover(true)}} onMouseLeave={()=>{setIsProjectHover(false)}}>
          {contextMenuIcon}
        </div>
        <div data-name={`project_context_menu_${props.id_project}`} className="project-context-menu context-menu" style={{display: 'none'}} tabIndex={0}>
          <button className='task-context-menu__button' onClick={()=>{dispatch(deleteProject(props.id_project))}}>
            <p className="sidebar__text task-context-menu__text">Удалить</p>
          </button>
          <button className='task-context-menu__button' onClick={()=>{dispatch(setUpdateProject(true));dispatch(setUpdatingId(props.id_project));closeProjectContextMenu()}}>
            <p className="sidebar__text task-context-menu__text">Изменить</p>
          </button>
        </div>
      </>
      );
}