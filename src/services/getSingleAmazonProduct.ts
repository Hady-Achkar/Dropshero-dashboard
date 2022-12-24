import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {AmazonProductAxios} from '../lib'
import {AmazonProduct} from './getAmazonProducts'

interface RootObject {
	status: string
	message: string
	product: AmazonProduct
	requestTime: Date
}

export const getSingleAmazonProduct = (
	amazonProductId: string
): Promise<AxiosResponse<RootObject>> => {
	return AmazonProductAxios({
		method: 'GET',
		url: ApiConstants.AMAZON_PRODUCTS.GET_SINGLE,
		params: {
			amazonProductId,
		},
	})
}
