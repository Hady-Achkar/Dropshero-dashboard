import {IUser} from '../IUser';

export interface authState {
    isAuthenticated: boolean;
    user: IUser;
}

export interface IEditProfileStore {
    fullName: string
    image: string
}

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const EDIT_PROFILE = 'EDIT_PROFILE'

export interface LoginAction {
    type: typeof LOGIN;
    user_info: IUser;
}

export interface editProfileAction {
    type: typeof EDIT_PROFILE
    payload: IEditProfileStore
}

export interface LogoutAction {
    type: typeof LOGOUT;
}

export type AuthActions = LoginAction | LogoutAction | editProfileAction
