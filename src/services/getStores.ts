import axios, {AxiosResponse} from 'axios'

export const getStores = (): Promise<AxiosResponse<GetStores.RootObject>> => {
	return axios({
		method: 'GET',
		url: 'https://api.easyecommerce.io/stores',
	})
}

export declare namespace GetStores {
	export interface Store {
		_id?: string
		name: string
		category: string
		description: string
		link: string
		type: string
		createdAt?: Date
		updatedAt?: Date
	}

	export interface RootObject {
		message: string
		data: Store[]
	}
}
