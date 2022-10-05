import { AppDispatch } from "../store";
import UsersDataService from "../Services/users.service";
import { CHANGE_EMAIL, LOGIN } from "./types";

export const loginUserByPassword = (struct: {email: string, password: string}) => async (dispatch: AppDispatch) => {
    try {
        const res = await UsersDataService.loginUser(struct.email, struct.password);
        if (!res.data.message) {
            const user = await UsersDataService.getByEmail(struct.email);
  
            console.log("reault: ", JSON.stringify(user.data[0]))
            dispatch({
                type: LOGIN,
                payload: {id_user: user.data[0].id_user, email: struct.email},
            });
        }
  
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
  };

export const loginUserByCookie = () => async (dispatch: AppDispatch) => {
    const res = await UsersDataService.checkIsLoggedIn()
    if (res.data.loggedIn === true) {
      dispatch({
        type: LOGIN,
        payload: { id_user: res.data.user[0].id_user, email: res.data.user[0].email },
    });
    }
  };

  export const changeEmail = (idUser: number, email: string) => async (dispatch: AppDispatch) => {
    const res = await UsersDataService.changeEmail(idUser, email)
      dispatch({
        type: CHANGE_EMAIL,
        payload: email,
    });
  };