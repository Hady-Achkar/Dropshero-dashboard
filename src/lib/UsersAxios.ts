import axios from 'axios';
import { ApiConstants } from '../constants';

const UsersAxios = axios.create({
  baseURL: ApiConstants.USERS.BASE_URL,
});

export default UsersAxios;
