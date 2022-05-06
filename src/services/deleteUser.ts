import {ApiConstants} from '../constants'
import {UsersAxios} from '../lib'

export const deleteUser = (id: string) => {
	return UsersAxios({
		method: 'DELETE',
		url: `${ApiConstants.USERS.DELETE_USER}?userId=${id}`,
	})
}
