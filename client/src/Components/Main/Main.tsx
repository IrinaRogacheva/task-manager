import React from 'react'
import './Main.css'
import { NewTaskInput } from './NewTaskInput';

export function Main(props: any) {
    return (
        <div className="main">
          <NewTaskInput/>
        </div>
      );
}