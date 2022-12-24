import axios, {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {AdminAxios} from '../lib'

type Payload = {
	name: string
	category: string
	link: string
	type: string
}

export const addStore = (payload: Payload): Promise<AxiosResponse> => {
	return AdminAxios({
		method: 'POST',
		url: ApiConstants.ADMIN.ADD_STORE,
		data: payload,
	})
}
