import React from 'react';
import './../../App.css';
import './../../Components/Sidebar/Sidebar.css'
import './../../Components/Main/Main.css'
import {Header} from './../Header/Header'
import { Sidebar } from './../Sidebar/Sidebar';
import { Main } from './../Main/Main';
import DoneTaskMessage from './../Main/DoneTaskMessage';
import DeletedTaskMessage from './../Main/DeletedTaskMessage';
import CreateProject from './../Popups/CreateProject';
import CreateTag from './../Popups/CreateTag';
import UpdateProject from './../Popups/UpdateProject';
import UpdateTag from './../Popups/UpdateTag';
import { CurrentTask } from '../CurrentTask/CurrentTask';

function Application() {
  return (
            <div className="App">
              <Header/>
              <div style={{display: 'flex', height: 'calc(100% - 49px)'}}>
                <Sidebar/>
                <Main/>
                <CurrentTask/>
              </div>
              <DoneTaskMessage/>
              <DeletedTaskMessage/>
              <CreateProject/>
              <CreateTag/>
              <UpdateProject/>
              <UpdateTag/>
            </div>
  );
}

export default Application;
