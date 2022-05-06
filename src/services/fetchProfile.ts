import {AdminAxios} from "../lib";
import {AxiosResponse} from "axios";
import {ApiConstants} from "../constants";
import {AdminRoles} from "../types";

export const getMyProfile = (): Promise<AxiosResponse<GetMyProfile.RootObject>> => {
    return AdminAxios({
        method: 'GET',
        url: ApiConstants.ADMIN.GET_MY_PROFILE
    })
}

export declare namespace GetMyProfile {

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
        status: 'Success' | 'Failure';
        message: string;
        admin: Admin;
        requestTime: Date;
    }

}

