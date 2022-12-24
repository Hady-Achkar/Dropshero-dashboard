import {AxiosResponse} from 'axios'
import {AmazonProductAxios} from '../lib'
import {ApiConstants} from '../constants'
import {IProduct} from '../types'

export const editAmazonProduct = (
	payload: IProduct
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
