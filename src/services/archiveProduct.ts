import {AxiosResponse} from "axios";
import {ProductsAxios} from "../lib";
import {ApiConstants} from "../constants";

export const archiveProduct = (productId: string): Promise<AxiosResponse<any>> => {
    return ProductsAxios({
        method: 'PUT',
        url: `${ApiConstants.PRODUCTS.ARCHIVE_PRODUCT}?productId=${productId}`
    })
}
