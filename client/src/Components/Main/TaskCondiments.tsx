import React from 'react'
import { ProjectsList } from '../Sidebar/ProjectsList';
import { TagsList } from '../Sidebar/TagsList';
import './Main.css'
import { Priorities } from './Priorities';

export function TaskCondiments(props: any) {
    return (
        <div className="task-condiments context-menu" style={props.style} {...props.attr}>
            <Priorities/>
            <ProjectsList  {...{isChangingModeOn: false}}/>
            <TagsList {...{isChangingModeOn: false}}/>
        </div>
      );
}