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
    marketingAngel: string[]
    whereToSell: string[]
    marketingVideo: string[]
    supplierLinks: string[]
    competitorLinks: string
    isHot: boolean
    category: string
    advertisementText: string
    targets: string
}
