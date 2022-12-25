import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {AmazonProductAxios} from '../lib'

declare namespace AddNewProduct {
	export interface RootObject {
		status: 'Success' | 'Failure'
		message: string
		productId: string
		requestTime: Date
	}
}

export const addAmazonProduct = async (
	payload: IAddAmazonProduct
): Promise<AxiosResponse<AddNewProduct.RootObject>> => {
	return AmazonProductAxios({
		method: 'POST',
		url: ApiConstants.AMAZON_PRODUCTS.ADD_NEW_PRODUCT,
		data: payload,
	})
}

interface Selling {
	min: number
	max: number
}

interface Cost {
	min: number
	max: number
}

interface Price {
	selling: Selling
	cost: Cost
}

export interface IAddAmazonProduct {
	title: string
	revenue: number
	price: Price
	thumbnail: string
	category: string
	supplierLinks: string[]
	competitorLinks: string
}
