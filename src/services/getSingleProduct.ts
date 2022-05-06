import {AxiosResponse} from "axios";
import {ProductsAxios} from "../lib";
import {ApiConstants} from "../constants";
import {IProduct} from "../types";

export const getSingleProduct = (productId: string): Promise<AxiosResponse<GetSingleProduct.RootObject>> => {
    return ProductsAxios({
        method: 'GET',
        url: `${ApiConstants.PRODUCTS.GET_SINGLE}?productId=${productId}`
    })
}

export declare namespace GetSingleProduct {
    export interface RootObject {
        status: 'Success' | 'Failure'
        message: string;
        product: IProduct;
        requestTime: Date;
    }

}

