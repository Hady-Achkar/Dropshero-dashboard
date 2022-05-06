export interface PriceData {
    min: number;
    max: number;
}

export interface Price {
    cost: PriceData;
    selling: PriceData;
    profit: PriceData;
}

export interface IProduct {
    marketingAngel: string[];
    whereToSell: string[];
    marketingVideo: string[];
    supplierLinks: string[];
    targets: string;
    _id: string;
    isHot: boolean;
    title: string;
    price: Price;
    thumbnail: string;
    competitorLinks: string;
    category: string;
    description: string;
    advertisementText: string;
    createdAt?: Date;
    updatedAt?: Date;
    isArchived?: boolean
}
