import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../store';

type Props = {
    children: JSX.Element,
};

export default function RequireAuthToApp({ children }: Props) {
    const loggedIn = useSelector((state: RootState) => state.user.loggedIn)

    return loggedIn === false
        ? children
        : <Navigate to="/" replace />;
}