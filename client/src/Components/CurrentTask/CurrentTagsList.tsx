import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentTask } from '../../Actions/current-task';
import { addTagInTask, deleteTagFromTask } from '../../Actions/tasks';
import { setCreateTag } from '../../Actions/view';
import { Tag } from '../../entries';
import { RootState } from '../../store';
import './../Main/Main.css'
import './CurrentTask.css'
import { TagsListCurrent } from './TagsListCurrent';

export function CurrentTagsList(props: any) {
    const [projectsWindow, setProjectsWindow] = useState(false)
    const dispatch = useDispatch()
    const tags = useSelector((state: RootState) => state.tags)
    console.log("props.tags ", props.tags)
    let resTags: Array<Tag> = []
    for (const t of tags) {
        if (props.tags && !props.tags.find((tag: Tag) => t.id_tag === tag.id_tag)) {
            resTags.push(t)
        }
    }
    if (!props.tags) {
        resTags = tags
    }
    
    return (
        <div>
        <div className="tags_list">
            {props.tags && props.tags.length > 0 && (props.tags as Array<Tag>).map((tag)=>{
                return <div key={tag.id_tag} className='task_tag' style={{background: `#${tag.color}`, position: "relative"}}>
                  <p className='task_tag__name sidebar__text'>{tag.name}
                  <button className='delete_tag' onClick={()=>{dispatch(deleteTagFromTask(props.id_task, props.tags, tag.id_tag));const resTags = (props.tags as Array<Tag>).filter(el => el.id_tag !== tag.id_tag);dispatch(updateCurrentTask({id_tags: resTags}))}}></button>
                  </p>
                </div>
              })}
            <button className='add_tag' disabled={resTags.length <= 0} onClick={() => {if(resTags.length > 0){setProjectsWindow(!projectsWindow)}}}></button>
            {resTags && <TagsListCurrent {...{current_tags: props.tags??[],id_task: props.id_task, tags: resTags, projectsWindow: projectsWindow, setProjectsWindow: setProjectsWindow}}/>}
        </div>
    </div>
      );
}