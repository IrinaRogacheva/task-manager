import { ADD_TAG, GET_TAGS } from "./types";
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