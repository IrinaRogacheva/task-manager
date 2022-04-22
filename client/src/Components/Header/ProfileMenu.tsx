import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { changeEmail } from '../../Actions/user';
import UsersDataService from "../../Services/users.service";
import { RootState } from '../../store';
import './../Main/Main.css'

export function ProfileMenu(props: any) {
  const email = useSelector((state: RootState) => state.user.email)
  
    return (
      <>
      <div className="profile-menu context-menu" style={{display: (props.sortWindow?'block':'none')}}>
          <p className='email__input'>{email}</p>
      </div>
      </>
      );
}