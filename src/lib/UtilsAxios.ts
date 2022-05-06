import axios from 'axios'
import {ApiConstants} from '../constants'

const UtilsAxios = axios.create({
    baseURL: ApiConstants.UTILS.BASE_URL,
})

export default UtilsAxios
