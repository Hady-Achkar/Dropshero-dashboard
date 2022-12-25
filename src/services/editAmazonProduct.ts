import {AxiosResponse} from 'axios'
import {AmazonProductAxios} from '../lib'
import {ApiConstants} from '../constants'
import {AmazonProduct} from './getAmazonProducts'

export const editAmazonProduct = (
	payload: AmazonProduct
): Promise<AxiosResponse<any>> => {
	const {_id, ...rest} = payload
	return AmazonProductAxios({
		method: 'PUT',
		url: ApiConstants.AMAZON_PRODUCTS.EDIT_PRODUCT,
		params: {
			amazonProductId: _id,
		},
		data: {
			...rest,
		},
	})
}
