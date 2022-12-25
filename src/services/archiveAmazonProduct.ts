import {AxiosResponse} from 'axios'
import {AmazonProductAxios} from '../lib'
import {ApiConstants} from '../constants'

export const archiveAmazonProduct = (
	productId: string
): Promise<AxiosResponse<any>> => {
	return AmazonProductAxios({
		method: 'PUT',
		url: ApiConstants.AMAZON_PRODUCTS.ARCHIVE_PRODUCT,
		params: {
			amazonProductId: productId,
		},
	})
}
