import React from 'react'
import { BellIcon, BurgerIcon, ProfileIcon } from '../Icons';
import {SearchField} from './SearchField'
import './Header.css'

export function Header(props: any) {
    return (
        <div className="header">
          <div style={{display: 'flex'}}>
          <button className="profile-icon">
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