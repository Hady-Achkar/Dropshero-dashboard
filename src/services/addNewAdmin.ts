import {AxiosResponse} from "axios";
import {AdminAxios} from "../lib";
import {ApiConstants} from "../constants";
import {AdminRoles} from "../types";

export interface IAddAdmin {
    email: string
    password: string
    fullName: string
    role: AdminRoles | string
    image: string
    confirmPassword?: string
}

export const addNewAdmin = (payload: IAddAdmin): Promise<AxiosResponse<AddNewAdmin.RootObject>> => {
    const {confirmPassword, ...rest} = payload
    return AdminAxios({
        method: 'POST',
        url: ApiConstants.ADMIN.ADD_NEW_ADMIN,
        data: {
            ...rest
        }
    })
}

export declare namespace AddNewAdmin {
    export interface RootObject {
        status: 'Success' | 'Failure',
        message: string
        _id: string
        requestTime: Date
    }
}
