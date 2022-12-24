import axios from 'axios'
import {ApiConstants} from '../constants'

const AmazonProductAxios = axios.create({
	baseURL: ApiConstants.AMAZON_PRODUCTS.BASE_URL,
})

export default AmazonProductAxios
