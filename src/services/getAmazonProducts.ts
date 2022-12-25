import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {AmazonProductAxios} from '../lib'

interface Selling {
	min: number
	max: number
}

interface Cost {
	min: number
	max: number
}

interface Profit {
	min: number
	max: number
}

interface Price {
	selling: Selling
	cost: Cost
	profit: Profit
}

export interface AmazonProduct {
	supplierLinks: string[]
	isArchived?: boolean
	_id?: string
	title: string
	price: Price
	thumbnail: string
	competitorLinks: string
	category: string
	revenue: number
	createdAt?: Date
	updatedAt?: Date
}

interface RootObject {
	message: string
	products: AmazonProduct[]
	length: number
}

export const getAllAmazonProducts = (): Promise<AxiosResponse<RootObject>> => {
	return AmazonProductAxios({
		method: 'GET',
		url: `${ApiConstants.AMAZON_PRODUCTS.GET_ALL_PRODUCTS}`,
	})
}
