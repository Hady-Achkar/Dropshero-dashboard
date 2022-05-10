import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {AdminAxios} from '../lib'

interface IInfluencer {
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

interface RootObject {
	status: string
	message: string
	influencer: IInfluencer
}

export const getInfluencerById = (
	influencerId: string
): Promise<AxiosResponse<RootObject>> => {
	return AdminAxios({
		method: 'GET',
		url: ApiConstants.ADMIN.GET_INFLUENCER_BY_ID,
		params: {
			influencerId: influencerId,
		},
	})
}
