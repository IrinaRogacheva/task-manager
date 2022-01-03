import { AppDispatch } from "../store";
import { TOGGLE_SIDEDEBAR_VISIBILITY } from "./types";

export const toggleSidebarVisibility = (sidebarVisibility: boolean) => (dispatch: AppDispatch) => {
    dispatch({
        type: TOGGLE_SIDEDEBAR_VISIBILITY,
        payload: sidebarVisibility,
    });
};
