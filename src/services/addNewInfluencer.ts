import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {AdminAxios} from '../lib'

export interface IAddInfluencer {
	channelName: string
	description: string
	image: string
	country: string
	platform: string
	category: string
	followers: string
	language: string
	youtube?: string
	instagram?: string
	tiktok?: string
	snapchat?: string
}

export interface Response {
	status: string
	message: string
	productId: string
	requestTime: Date
}

export const addNewInfluencer = async (
	payload: IAddInfluencer
): Promise<AxiosResponse<Response>> => {
	return AdminAxios({
		method: 'POST',
		url: ApiConstants.ADMIN.ADD_INFLUENCER,
		data: payload,
	})
}
