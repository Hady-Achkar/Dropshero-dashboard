import {AxiosResponse} from "axios";
import {ProductsAxios} from "../lib";
import {ApiConstants} from "../constants";
import {IProduct} from "../types";

export const editProduct = (payload: IProduct): Promise<AxiosResponse<any>> => {
    const {_id, ...rest} = payload
    return ProductsAxios({
        method: 'PUT',
        url: `${ApiConstants.PRODUCTS.EDIT_PRODUCT}?productId=${_id}`,
        data: {
            ...rest
        }
    })
}
