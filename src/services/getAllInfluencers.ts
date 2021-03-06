import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {AdminAxios} from '../lib'

export interface IInfluencer {
	_id?: string
	channelName: string
	description: string
	image: string
	country: string
	platform: string
	category: string
	followers: string
	youtube?: string
	instagram?: string
	language: string
	createdAt?: Date
	updatedAt?: Date
	snapchat?: string
	tiktok?: string
}

export interface RootObject {
	message: string
	influencers: IInfluencer[]
}

export const getAllInfluencers = (): Promise<AxiosResponse<RootObject>> => {
	return AdminAxios({
		method: 'GET',
		url: ApiConstants.ADMIN.GET_ALL_INFLUENCERS,
	})
}
