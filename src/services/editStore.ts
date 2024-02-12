import axios, {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {AdminAxios} from '../lib'

type Payload = {
	name?: string
	category?: string
	link?: string
	type?: string
	description?: string
}

export const editStore = (
	storeId: string,
	payload: Payload
): Promise<AxiosResponse> => {
	return AdminAxios({
		method: 'PUT',
		url: ApiConstants.ADMIN.EDIT_STORE,
		data: payload,
		params: {storeId},
	})
}
