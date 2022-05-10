import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {AdminAxios} from '../lib'

interface IInfluencerData {
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
	language?: string
	snapchat?: string
	tiktok?: string
}

interface RootObject {
	status: string
	message: string
	influencerId: string
	requestTime: Date
}

export const deleteInfluencer = (
	influencerId: string
): Promise<AxiosResponse> => {
	return AdminAxios({
		method: 'DELETE',
		url: ApiConstants.ADMIN.DELETE_INFLUENCER,
		params: {
			influencerId: influencerId,
		},
	})
}
