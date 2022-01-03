import React from 'react'
import { BellIcon, BurgerIcon, ProfileIcon } from '../Icons';
import {SearchField} from './SearchField'
import './Header.css'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { toggleSidebarVisibility } from '../../Actions/view';

export function Header(props: any) {
  const dispatch = useDispatch()
  const view = useSelector(((state: RootState) => state.view))
  
  return (
    <div className="header">
      <div style={{display: 'flex'}}>
        <button className="profile-icon" onClick={()=>dispatch(toggleSidebarVisibility(!view.sidebarVisibility))}>
          <BurgerIcon/>
        </button>
        <SearchField/>
      </div>
      <div style={{display: 'flex'}}>
        <button className="profile-icon">
          <BellIcon/>
        </button>
        <button className="profile-icon" style={{marginLeft: '10px'}}>
          <ProfileIcon/>
        </button>
      </div>
    </div>
  );
}