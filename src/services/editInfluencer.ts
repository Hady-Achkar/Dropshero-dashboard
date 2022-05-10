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

export const editInfluencer = (
	influencerId: string,
	influencerData: IInfluencerData
): Promise<AxiosResponse<RootObject>> => {
	return AdminAxios({
		method: 'PUT',
		url: ApiConstants.ADMIN.UPDATE_INFLUENCER,
		data: influencerData,
		params: {
			influencerId: influencerId,
		},
	})
}
