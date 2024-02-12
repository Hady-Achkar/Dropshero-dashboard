export interface PriceData {
	min: number
	max: number
}

export interface Price {
	cost: PriceData
	selling: PriceData
	profit: PriceData
}

export interface IProduct {
	_id: string
	isHot: boolean
	title: string
	price: Price
	thumbnail: string
	category: string
	description: string
	createdAt?: Date
	updatedAt?: Date
	isArchived?: boolean
}
