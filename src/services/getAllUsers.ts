import {UsersAxios} from "../lib";
import {ApiConstants} from "../constants";
import {AxiosResponse} from 'axios'
import {AccountStatus} from "../types";

export const getAllUsers = (): Promise<AxiosResponse<GetAllUsers.RootObject>> => {
    return UsersAxios({
        method: 'GET',
        url: ApiConstants.USERS.GET_ALL
    })
}

export declare namespace GetAllUsers {

    export interface User {
        favoriteProducts: any[];
        status: AccountStatus;
        _id: string;
        email: string;
        fname: string;
        lname: string;
        type: string;
        createdAt: Date;
        updatedAt: Date;
        fullName: string;
        stripeId: string;
        activeSubscription: string;
    }

    export interface RootObject {
        status: 'Success' | 'Failure';
        message: string;
        users: User[];
        length: number;
        requestTime: Date;
    }

}

