import axios, {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {AdminAxios} from '../lib'

export const deleteStore = (storeId: string): Promise<AxiosResponse> => {
	return AdminAxios({
		method: 'DELETE',
		url: ApiConstants.ADMIN.DELETE_STORE,
		params: {storeId},
	})
}
