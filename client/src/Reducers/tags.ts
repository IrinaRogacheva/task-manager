import { PayloadAction } from "@reduxjs/toolkit";
import { ADD_TAG, GET_TAGS } from "../Actions/types";
import { Tag } from '../entries';
  
const initialState: Array<Tag> = [];

  function tagsReducer(tags = initialState, action: PayloadAction<any>): Array<Tag> {
    const { type, payload } = action;
  
    switch (type) {
      case ADD_TAG:
        return [...tags, payload];
  
      case GET_TAGS:
        return payload;
  /*
      case UPDATE_TUTORIAL:
        return tutorials.map((tutorial) => {
          if (tutorial.id === payload.id) {
            return {
              ...tutorial,
              ...payload,
            };
          } else {
            return tutorial;
          }
        });
  
      case DELETE_TUTORIAL:
        return tutorials.filter(({ id }) => id !== payload.id);
  
      case DELETE_ALL_TUTORIALS:
        return [];*/
  
      default:
        return tags;
    }
  };
  
  export default tagsReducer;