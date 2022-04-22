import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentTask } from '../../Actions/current-task';
import { addTagInTask } from '../../Actions/tasks';
import { Tag } from '../../entries';
import { RootState } from '../../store';
import './../Main/Main.css'
import './../Sidebar/Sidebar.css'

export function TagsListCurrent(props: any) {
  const dispatch = useDispatch()
  const tags = useSelector((state: RootState) => state.tags)

    return (
      <>
        <div className="projects_list context-menu" style={{display: (props.projectsWindow?'block':'none')}}>
          {props.tags.map((tag: Tag)=>{
                    return <button key={tag.id_tag} className={`task-context-menu__button`} onClick={()=>{dispatch(addTagInTask(props.id_task, props.current_tags, (tags.find((el: Tag) => el.id_tag === tag.id_tag)as Tag)));dispatch(updateCurrentTask({id_tags: [...props.current_tags, (tags.find((el: Tag) => el.id_tag === tag.id_tag)as Tag)]}));props.setProjectsWindow(false)}}>
                    <span className='dropdown_list__marker' style={{backgroundColor: "#" + tag.color}}></span>
                    <p className="sidebar__text task-context-menu__text">{tag.name}</p>
                  </button>
                })}
        </div>
      </>
      );
}