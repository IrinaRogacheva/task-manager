import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentTask } from '../../Actions/current-task';
import { updateTaskProject } from '../../Actions/tasks';
import { RootState } from '../../store';
import './../Main/Main.css'
import './../Sidebar/Sidebar.css'

export function ProjectsList(props: any) {
  const dispatch = useDispatch()
  const projects = useSelector((state: RootState) => state.projects)
  const [selectedProject, setSelectedProject] = useState(null)
  useEffect(() => {
    setSelectedProject(props.id_project)
  }, [props.id_project]);

    return (
      <>
        <div className="projects_list context-menu" style={{display: (props.projectsWindow?'block':'none')}}>
          <button style={{paddingLeft: "30px"}} className={`task-context-menu__button ${(!selectedProject)?'new_task_project_current':""}`} onClick={()=>{dispatch(updateTaskProject(props.id_task, props.tags, {id_project: null}));dispatch(updateCurrentTask({id_project: null}));props.setProjectsWindow(false)}}>
            <p className="sidebar__text task-context-menu__text">Входящие</p>
          </button>
          {projects.map((project)=>{
                    return <button key={project.id_project} className={`task-context-menu__button ${(selectedProject === project.id_project)?'new_task_project_current':""}`} onClick={()=>{dispatch(updateTaskProject(props.id_task, props.tags, {id_project: project.id_project}));dispatch(updateCurrentTask({id_project: project.id_project}));props.setProjectsWindow(false)}}>
                    <span className='dropdown_list__marker' style={{backgroundColor: "#" + project.color}}></span>
                    <p className="sidebar__text task-context-menu__text">{project.name}</p>
                  </button>
                })}
        </div>
      </>
      );
}