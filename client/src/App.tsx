import React from 'react';
import './App.css';
import './Preloader.css'
import {Header} from './Components/Header/Header'
import { Sidebar } from './Components/Sidebar/Sidebar';
import { Main } from './Components/Main/Main';
import DoneTaskMessage from './Components/Main/DoneTaskMessage';
import DeletedTaskMessage from './Components/Main/DeletedTaskMessage';
import CreateProject from './Components/Popups/CreateProject';
import CreateTag from './Components/Popups/CreateTag';
import UpdateProject from './Components/Popups/UpdateProject';
import UpdateTag from './Components/Popups/UpdateTag';
function App() {
  return (
            <div className="App">
              <Header/>
              <div style={{display: 'flex', height: 'calc(100% - 49px)'}}>
                <Sidebar/>
                <Main/>
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

export default App;
