export interface Cost {
	min: number
	max: number
}

export interface Selling {
	min: number
	max: number
}

export interface IPrice {
	cost: Cost
	selling: Selling
}

export interface IAddProduct {
	title: string
	thumbnail: string
	description: string
	price: IPrice
	isHot: boolean
	category: string
}
