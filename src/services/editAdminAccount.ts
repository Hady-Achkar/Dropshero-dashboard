import {AdminAxios} from "../lib";
import {ApiConstants} from "../constants";
import {AxiosResponse} from "axios";
import {AdminRoles} from "../types";

interface EditProfilePayload {
    fullName?: string | undefined,
    password?: string | undefined,
    image?: string | undefined,
    role: AdminRoles | string
}

export const editAdmin = (payload: EditProfilePayload, adminId: string): Promise<AxiosResponse<EditAdminAccount.RootObject>> => {
    const {fullName, image, password = undefined, role} = payload
    return AdminAxios({
        method: 'PUT',
        url: `${ApiConstants.ADMIN.EDIT_ADMIN}?adminId=${adminId}`,
        data: {
            fullName,
            password,
            image,
            role
        }
    })
}

export declare namespace EditAdminAccount {

    export interface RootObject {
        status: 'Success' | 'Failure';
        message: string;
        adminId: string;
        requestTime: Date;
    }

}

