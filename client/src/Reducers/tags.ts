import { PayloadAction } from "@reduxjs/toolkit";
import { ADD_TAG, DELETE_TAG, GET_TAGS, UPDATE_TAG } from "../Actions/types";
import { Tag } from '../entries';
  
const initialState: Array<Tag> = [];

  function tagsReducer(tags = initialState, action: PayloadAction<any>): Array<Tag> {
    const { type, payload } = action;
  
    switch (type) {
      case ADD_TAG:
        return [...tags, payload];
  
      case GET_TAGS:
        return payload;

      case UPDATE_TAG:
        return tags.map((tag) => {
          if (tag.id_tag === payload.id_tag) {
            return {
              ...tag,
              ...payload,
            };
          } else {
            return tag;
          }
        });

      case DELETE_TAG:
        return tags.filter(tag => tag.id_tag !== payload);
      
      default:
        return tags;
    }
  };
  
  export default tagsReducer;