import React from 'react'
import { DropdownList, DropdownListProps } from '../Sidebar/DropdownList';
import './Main.css'
import { Priorities } from './Priorities';

export function TaskCondiments(props: any) {
    const propsMock = {
        projectsNames: ['Учеба', 'Здоровье'],
        colorsOfProjects: {'Учеба': '#800080', 'Здоровье': '#FF7F50'},
        tagsNames: ['Курсовая', 'Йога'],
        colorsOfTags: {'Курсовая': '#228B22', 'Йога': '#66CDAA'},
        isChangingModeOn: false,
    }
    
    return (
        <div className="task-condiments context-menu" style={props.style} {...props.attr}>
            <Priorities/>
            <DropdownList {...{ items: propsMock.projectsNames, dropdownListName: 'Проекты', colorsOfItems: propsMock.colorsOfProjects, isChangingModeOn: propsMock.isChangingModeOn } as unknown as DropdownListProps}/>
            <DropdownList {...{ items: propsMock.tagsNames, dropdownListName: 'Теги', colorsOfItems: propsMock.colorsOfTags, isChangingModeOn: propsMock.isChangingModeOn } as unknown as DropdownListProps}/>
        </div>
      );
}