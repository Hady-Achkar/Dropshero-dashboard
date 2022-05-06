import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {UsersAxios} from '../lib'
import {GetCustomer} from './getCustomer'

export const editCustomer = (
	payload: any,
	userId: string
): Promise<AxiosResponse<GetCustomer.RootObject>> => {
	return UsersAxios({
		method: 'PUT',
		url: `${ApiConstants.USERS.EDIT_USER}?userId=${userId}`,
		data: payload,
	})
}
