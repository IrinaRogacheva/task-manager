import { ADD_TAG, DELETE_TAG, GET_TAGS, UPDATE_TAG } from "./types";
import TagsDataService from "../Services/tags.service";
import { AppDispatch } from "../store";
import { Tag} from "../entries";

export const getTags = () => async (dispatch: AppDispatch) => {
    try {
        const res = await TagsDataService.getTags();

        dispatch({
            type: GET_TAGS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const addTag = (tag: Tag) => async (dispatch: AppDispatch) => {
    try {
        const res = await TagsDataService.addTag(tag);
        const insertedTag = await TagsDataService.getById(res.data.insertId);
  
        dispatch({
            type: ADD_TAG,
            payload: insertedTag.data[0],
        });
  
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deleteTag = (idTag: number) => async (dispatch: AppDispatch) => {
    try {
        const res = await TagsDataService.deleteTag(idTag);
  
        dispatch({
            type: DELETE_TAG,
            payload: idTag,
        });
  
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const updateTag = (updatedTag: Tag) => async (dispatch: AppDispatch) => {
    try {
      const res = await TagsDataService.updateTag(updatedTag);

      dispatch({
        type: UPDATE_TAG,
        payload: updatedTag,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };