import axios from 'axios';
import { ApiConstants } from '../constants';

const UsersFromExcelAxios = axios.create({
  baseURL: ApiConstants.USERS_FROM_EXCEL.BASE_URL,
});

export default UsersFromExcelAxios;