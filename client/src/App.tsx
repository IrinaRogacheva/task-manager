import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import './App.css';
import { Task } from './entries';
import {Header} from './Components/Header/Header'
import { Sidebar } from './Components/Sidebar/Sidebar';
import { Main } from './Components/Main/Main';
import { BrowserRouter as Router } from 'react-router-dom';
 
function App() {
  const [taskName, setTaskName] = useState('')
  const [tasksList, setTasksList] = useState([] as Array<Task>)

  useEffect(()=>{
    Axios.get('http://localhost:3001/api/get_tasks').then((response)=>{
      setTasksList(response.data)
    })
  }, [])

  const submitReview = () => {
    Axios.post('http://localhost:3001/api/add_task', {taskName: taskName})
    setTasksList([...tasksList, {name: taskName, id_author: 1} as Task])
  }

  const sidebarProps = {
    numberOfIncoming: 10,
    numberOfTodayTasks: 5,
    numberOfUpcoming: 3,
    projectsNames: ['Учеба', 'Здоровье'],
    numberOfTasksInProject: {'Учеба': 8, 'Здоровье': 2},
    colorsOfProjects: {'Учеба': '#800080', 'Здоровье': '#FF7F50'},
    tagsNames: ['Курсовая', 'Йога'],
    numberOfTasksInTag: {'Курсовая': 4, 'Йога': 1},
    colorsOfTags: {'Курсовая': '#228B22', 'Йога': '#66CDAA'},
  }

  return (
      <Router>
        <div className="App">
          <Header />
          <div style={{display: 'flex', height: 'calc(100% - 49px)'}}>
            <Sidebar {...sidebarProps} />
            <Main/>
          </div>
        </div>
      </Router>
  );
}

export default App;
