import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Application from './Components/Main/Application';
import Login from './Components/Users/Login';
import Register from './Components/Users/Register';
import RequireAuth from './Components/Users/RequireAuth';
import { RootState } from './store';
import { loginUserByCookie } from './Actions/user';
import RequireAuthToApp from './Components/Users/RequireAuthToApp';
import { setAuthorId } from './Actions/new-task';

function App() {
  const user = useSelector((state: RootState) => state.user)
  const checkLoggedIn = () => {
    console.log("loggedIn " + user.loggedIn)
    console.log("user id " + user.id_user)
  }
  checkLoggedIn()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loginUserByCookie())
  }, []);

  useEffect(() => {
    if (user.loggedIn) {
      dispatch(setAuthorId(user.id_user))
    }
  }, [user.loggedIn]);

  return (<Routes>
    <Route path="/" element={<RequireAuth ><Application /></RequireAuth>}/>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={/*<RequireAuthToApp >*/<Login />/*</RequireAuthToApp>*/} />
  </Routes>
  );
}

export default App;
