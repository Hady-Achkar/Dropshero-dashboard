import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {UsersAxios} from '../lib'

export declare namespace GetCustomer {
	export interface ICustomer {
		favoriteProducts?: any[]
		status?: string
		_id?: string
		email: string
		fname: string
		lname: string
		type?: string
		createdAt?: Date
		updatedAt?: Date
		fullName?: string
		password?: string
		confirmPassword?: string
		stripeId?: string
		activeSubscription?: string
	}

	export interface RootObject {
		status: string
		message: string
		user: ICustomer
		requestTime: Date
	}
}
export const getSingleCustomer = (
	userId: string
): Promise<AxiosResponse<GetCustomer.RootObject>> => {
	return UsersAxios({
		method: 'GET',
		url: `${ApiConstants.USERS.GET_SINGLE}?userId=${userId}`,
	})
}
