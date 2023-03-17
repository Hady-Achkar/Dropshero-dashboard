import {UsersAxios} from '../lib'
import {ApiConstants} from '../constants'

export interface IAddUser {
	email: string
	password: string
	fname: string
	lname: string
}
// export interface IAddUserFromExcel {
// 	data: any
// }

export const addNewUser = (payload: IAddUser) => {
	const {fname, lname, email, password} = payload
	return UsersAxios({
		method: 'POST',
		url: ApiConstants.USERS.ADD_NEW_USER,
		data: {
			fname,
			lname,
			email,
			password,
		},
	})
}


export const addNewUsersFromExcel = (payload: any) => {
	const formData = payload
	return UsersAxios({
		method: 'POST',
		url: ApiConstants.USERS.ADD_NEW_USER_FROM_EXCEL,
		data: formData, 
		headers: {'Content-Type': 'multipart/form-data'}
			
	})
}