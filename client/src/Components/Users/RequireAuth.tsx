import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../store';

type Props = {
    children: JSX.Element,
  };

export default function RequireAuth({children}: Props)  {
    const loggedIn = useSelector((state: RootState) => state.user.loggedIn)

    return loggedIn === true
      ? children
      : <Navigate to="/login" replace />;
  }