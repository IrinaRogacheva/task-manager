import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Application from './Components/Main/Application';
import Login from './Components/Users/Login';
import Register from './Components/Users/Register';
import RequireAuth from './Components/Users/RequireAuth';
import { RootState } from './store';
import { loginUserByCoolie } from './Actions/user';

function App() {
  const user = useSelector((state: RootState) => state.user)
  const checkLoggedIn = () => {
    console.log("loggedIn " + user.loggedIn)
    console.log("user id " + user.id_user)
  }
  checkLoggedIn()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loginUserByCoolie())
  }, []);

  return (<Routes>
    <Route path="/" element={<RequireAuth ><Application /></RequireAuth>}/>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
  </Routes>
  );
}

export default App;
