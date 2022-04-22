import React, { useState } from 'react'
import ProjectsDataService from "../../Services/projects.service";
import './../Main/Main.css'
import './CurrentTask.css'
import { ProjectsList } from './ProjectsList';

export function BottomBlock(props: any) {
    const [projectsWindow, setProjectsWindow] = useState(false)
    const [projectName, setProjectName] = useState("")
    function getNameOfCurrentProject(id: number): string {
        async function makeRequest() {
          const res = await ProjectsDataService.getProjectNameById(id)
          setProjectName(res.data[0].name)
        }
        makeRequest()
        return projectName
      }

    return (
        <div className="current_task__bottom_block">
            <button onClick={()=>{setProjectsWindow(!projectsWindow)}} className='current_task__project_button'>{props.id_project?getNameOfCurrentProject(props.id_project):"Входящие"}</button>
            <ProjectsList {...{projectsWindow: projectsWindow, setProjectsWindow: setProjectsWindow, id_task: props.id_task, id_project: props.id_project, tags: props.tags}}/>
        </div>
      );
}