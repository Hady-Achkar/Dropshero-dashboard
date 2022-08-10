import axios, {AxiosResponse} from 'axios'

export const getStores = (): Promise<AxiosResponse<GetStores.RootObject>> => {
	return axios({
		method: 'GET',
		url: 'https://api.dropshero.com/stores',
	})
}

export declare namespace GetStores {
	export interface Store {
		_id?: string
		name: string
		category: string
		link: string
		createdAt?: Date
		updatedAt?: Date
	}

	export interface RootObject {
		message: string
		data: Store[]
	}
}
