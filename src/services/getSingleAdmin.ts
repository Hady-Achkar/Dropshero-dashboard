import {AxiosResponse} from 'axios'
import {AdminAxios} from '../lib'
import {ApiConstants} from '../constants'
import {AdminRoles} from '../types'

export const getSingleAdmin = (
	adminId: string
): Promise<AxiosResponse<GetSingleAdmin.RootObject>> => {
	return AdminAxios({
		method: 'GET',
		url: `${ApiConstants.ADMIN.GET_SINGLE_ADMIN}?adminId=${adminId}`,
	})
}

export declare namespace GetSingleAdmin {
	export interface Admin {
		role: AdminRoles | string
		image: string
		_id?: string
		email: string
		fullName: string
		createdAt?: Date
		updatedAt?: Date
	}

	export interface RootObject {
		status: 'Success' | 'Failure'
		message: string
		admin: Admin
		requestTime: Date
	}
}
