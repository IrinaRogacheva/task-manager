import React, { useEffect, useState } from 'react';
import Axios from 'axios'
import './App.css';
import { Task } from './entries';

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

  return (
    <div className="App">
      <input type='text' name='task' placeholder='Task' onChange={(e)=>{
          setTaskName(e.target.value)
        }}/>
        <button onClick = {submitReview}>Submit</button>
        <ul>
        {tasksList.map((task)=>{
          return <li>{task.name}</li>
        })}
        </ul>
    </div>
  );
}

export default App;
