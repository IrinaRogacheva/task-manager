import { PayloadAction } from "@reduxjs/toolkit";
import { TOGGLE_SIDEDEBAR_VISIBILITY } from "../Actions/types";
import { View } from '../entries';
  
const initialState: View = {
    sidebarVisibility: true
  };

  function viewReducer(view = initialState, action: PayloadAction<any>): View {
    const { type, payload } = action;
  
    switch (type) {
      case TOGGLE_SIDEDEBAR_VISIBILITY:
        return {...view, sidebarVisibility: payload};

      default:
        return view;
    }
  };
  
  export default viewReducer;