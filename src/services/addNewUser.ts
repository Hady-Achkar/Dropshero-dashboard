import {UsersAxios} from '../lib'
import {ApiConstants} from '../constants'

export interface IAddUser {
	email: string
	password: string
	fname: string
	lname: string
}

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
