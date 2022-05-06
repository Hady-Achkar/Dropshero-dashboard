import {AxiosResponse} from "axios";
import {ProductsAxios} from "../lib";
import {ApiConstants} from "../constants";
import {IProduct} from "../types";

export const getAllProducts = (): Promise<AxiosResponse<GetAllProducts.RootObject>> => {
    return ProductsAxios({
        method: 'GET',
        url: ApiConstants.PRODUCTS.GET_ALL_PRODUCTS
    })
}

export declare namespace GetAllProducts {
    export interface RootObject {
        status: 'Success' | 'Failure';
        message: string;
        products: IProduct[];
        requestTime: Date;
    }

}

