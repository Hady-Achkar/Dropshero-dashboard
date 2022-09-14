import {ApiConstants} from '../constants'
import {AdminAxios} from '../lib'

export const deleteAdmin = (id: string) => {
	return AdminAxios({
		method: 'DELETE',
		url: `${ApiConstants.ADMIN.DELETE_ADMIN}?adminId=${id}`,
	})
}
