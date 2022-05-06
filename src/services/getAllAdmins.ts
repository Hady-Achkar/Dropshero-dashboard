import {AxiosResponse} from "axios";
import {ApiConstants} from "../constants";
import {AdminAxios} from "../lib";
import {AdminRoles} from "../types";

export const getAllAdmins = (): Promise<AxiosResponse<GetAllAdmins.RootObject>> => {
    return AdminAxios({
        method: 'GET',
        url: ApiConstants.ADMIN.GET_ALL_ADMINS
    })
}
export declare namespace GetAllAdmins {
    export interface Admin {
        role: AdminRoles;
        image: string;
        _id: string;
        email: string;
        fullName: string;
        createdAt: Date;
        updatedAt: Date;
    }

    export interface RootObject {
        status: 'Success' | 'Failure',
        message: string
        admins: Admin[]
        requestTime: Date
    }
}
