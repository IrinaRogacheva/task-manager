import { PayloadAction } from "@reduxjs/toolkit";
import { CHANGE_EMAIL, LOGIN } from "../Actions/types";
import { User } from '../entries';
  
const initialState: User = {
    id_user: 0,
    loggedIn: false,
    email: ""
};

  function userReducer(user = initialState, action: PayloadAction<any>): User {
    const { type, payload } = action;
  
    switch (type) {
      case LOGIN:
        return {...user, loggedIn: true, id_user: payload.id_user, email: payload.email};
      
      case CHANGE_EMAIL:
        return {...user, email: payload}

      default:
        return user;
    }
  };
  
  export default userReducer;