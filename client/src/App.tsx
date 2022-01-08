import React from 'react';
import './App.css';
import {Header} from './Components/Header/Header'
import { Sidebar } from './Components/Sidebar/Sidebar';
import { Main } from './Components/Main/Main';
import { BrowserRouter as Router } from 'react-router-dom';
import DoneTaskMessage from './Components/Main/DoneTaskMessage';
import DeletedTaskMessage from './Components/Main/DeletedTaskMessage';
import CreateProject from './Components/Main/CreateProject';
import CreateTag from './Components/Main/CreateTag';
 
function App() {
  return (
      <Router>
        <div className="App">
          <Header />
          <div style={{display: 'flex', height: 'calc(100% - 49px)'}}>
            <Sidebar/>
            <Main/>
          </div>
          <DoneTaskMessage/>
          <DeletedTaskMessage/>
          <CreateProject/>
          <CreateTag/>
        </div>
      </Router>
  );
}

export default App;
