import React from 'react'
import './Main.css'
import NewTaskInput from './NewTaskInput';
import TasksList from './TasksList';

export function Main(props: any) {
    return (
        <div className="main">
          <NewTaskInput/>
          <TasksList/>
        </div>
      );
}