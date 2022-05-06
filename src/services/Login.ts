import {AuthAxios} from '../lib'
import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'

interface Login {
    email: string
    _id: string
    token: string
    fullName: string
    role: string
    image: string
}

export const login = async (
    email: string,
    password: string
): Promise<AxiosResponse<Login>> => {
    return AuthAxios({
        method: 'POST',
        url: ApiConstants.AUTH.SIGN_IN,
        data: {
            email,
            password,
        },
    })
}

export interface LoginPayload {
    email: string
    password: string
}
