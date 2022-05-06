import {AppActions, IUser} from '../types';
import {IEditProfileStore} from "../types/redux/AuthActionTypes";

export const loginAction = (user_info: IUser): AppActions => ({
    type: 'LOGIN',
    user_info,
});

export const editProfileStore = (payload: IEditProfileStore): AppActions => ({
    type: 'EDIT_PROFILE',
    payload
});
export const logoutAction = (): AppActions => ({
    type: 'LOGOUT',
});
