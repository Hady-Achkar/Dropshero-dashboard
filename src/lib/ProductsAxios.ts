import axios from 'axios'
import {ApiConstants} from '../constants'

const ProductsAxios = axios.create({
    baseURL: ApiConstants.PRODUCTS.BASE_URL,
})

export default ProductsAxios
