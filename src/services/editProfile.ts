import {AdminAxios} from "../lib";
import {ApiConstants} from "../constants";
import {AxiosResponse} from "axios";

export interface EditProfilePayload {
    fullName?: string | undefined,
    password?: string | undefined,
    image?: string | undefined,
}

export const editProfile = (payload: EditProfilePayload): Promise<AxiosResponse<any>> => {
    const {fullName = undefined, image = undefined, password = undefined} = payload
    return AdminAxios({
        method: 'PUT',
        url: ApiConstants.ADMIN.EDIT_MY_PROFILE,
        data: {
            fullName,
            password,
            image
        }
    })
}
