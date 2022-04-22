import React, { useState } from 'react'
import { BellIcon, BurgerIcon, ProfileIcon } from '../Icons';
import {SearchField} from './SearchField'
import './Header.css'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { toggleSidebarVisibility } from '../../Actions/view';
import { ProfileMenu } from './ProfileMenu';

export function Header(props: any) {
  const dispatch = useDispatch()
  const view = useSelector(((state: RootState) => state.view))
  const [sortWindow, setSortWindow] = useState(false)
  
  return (
    <div className="header">
      <div style={{display: 'flex'}}>
        <SearchField/>
      </div>
      <div style={{display: 'flex'}}>
        <button onClick={()=>setSortWindow(!sortWindow)} className="profile-icon" style={{marginLeft: '10px'}}>
          <ProfileIcon/>
        </button>
        <ProfileMenu {...{sortWindow: sortWindow, setSortWindow: setSortWindow}}/>
      </div>
    </div>
  );
}