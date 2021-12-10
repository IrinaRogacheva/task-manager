import React from 'react'
import './Main.css'

export function TaskContextMenu(props: any) {
    return (
        <div className="task-context-menu context-menu" style={props.style} {...props.attr}>
          
        </div>
      );
}