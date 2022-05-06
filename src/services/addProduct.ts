import {IAddProduct} from '../types'
import {AxiosResponse} from 'axios'
import {ApiConstants} from '../constants'
import {ProductsAxios} from '../lib'

export declare namespace AddNewProduct {

    export interface RootObject {
        status: 'Success' | 'Failure'
        message: string
        productId: string
        requestTime: Date
    }
}

export const addNewProduct = async (
    payload: IAddProduct
): Promise<AxiosResponse<AddNewProduct.RootObject>> => {
    return ProductsAxios({
        method: 'POST',
        url: ApiConstants.PRODUCTS.ADD_NEW_PRODUCT,
        data: payload,
    })
}
