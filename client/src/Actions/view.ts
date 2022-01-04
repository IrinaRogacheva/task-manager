import { AppDispatch } from "../store";
import TasksDataService from "../Services/tasks.service";
import { GET_COUNT_OF_INCOMING, GET_COUNT_OF_TODAY, SET_CURRENT_TAB, SET_DELETED_ID_TASK, SET_DELETED_MESSAGE_VISIBILITY, SET_DONE_ID_TASK, SET_DONE_MESSAGE_VISIBILITY, TOGGLE_SIDEDEBAR_VISIBILITY } from "./types";

export const toggleSidebarVisibility = (sidebarVisibility: boolean) => (dispatch: AppDispatch) => {
    dispatch({
        type: TOGGLE_SIDEDEBAR_VISIBILITY,
        payload: sidebarVisibility,
    });
};

export const setDoneMesageVisibility = (messageVisibility: boolean) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_DONE_MESSAGE_VISIBILITY,
        payload: messageVisibility,
    });
};

export const setDeletedMesageVisibility = (messageVisibility: boolean) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_DELETED_MESSAGE_VISIBILITY,
        payload: messageVisibility,
    });
};

export const setDoneIdTask = (idTask: number) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_DONE_ID_TASK,
        payload: idTask,
    });
};

export const setDeletedIdTask = (idTask: number) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_DELETED_ID_TASK,
        payload: idTask,
    });
};

export const setCurrentTab = (currentTab: string) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_CURRENT_TAB,
        payload: currentTab,
    });
};

export const getCountOfIncoming = () => async (dispatch: AppDispatch) => {
    try {
        const res = await TasksDataService.getCountOfIncoming();

        dispatch({
            type: GET_COUNT_OF_INCOMING,
            payload: res.data[0],
        });
    } catch (err) {
        console.log(err);
    }
};

export const getCountOfToday = () => async (dispatch: AppDispatch) => {
    try {
        const res = await TasksDataService.getCountOfToday();

        dispatch({
            type: GET_COUNT_OF_TODAY,
            payload: res.data[0],
        });
    } catch (err) {
        console.log(err);
    }
};