const ApiConstants = {
	AUTH: {
		BASE_URL: 'https://api.dropshero.com/admin',
		SIGNUP: '/sign-up',
		SIGN_IN: '/sign-in',
	},
	UTILS: {
		BASE_URL: 'https://api.dropshero.com/utils',
		UPLOAD_FILE: '/upload',
		ADD_CONTACT: '/contact',
	},
	PRODUCTS: {
		BASE_URL: 'https://api.dropshero.com/admin',
		GET_ALL_PRODUCTS: '/products',
		ADD_NEW_PRODUCT: '/product',
		GET_SINGLE: '/product',
		EDIT_PRODUCT: '/product',
		ARCHIVE_PRODUCT: '/product/archive',
	},
	BUNDLES: {
		BASE_URL: 'https://api.dropshero.com/bundles',
		GET_ALL_BUNDLES: '/',
		GET_SINGLE_BUNDLE: '/bundle',
	},
	USERS: {
		BASE_URL: 'https://api.dropshero.com/admin',
		GET_ALL: '/users',
		GET_SINGLE: '/user',
		EDIT_USER: '/user',
		DELETE_USER: '/user',
		ADD_NEW_USER: '/user',
	},
	ADMIN: {
		BASE_URL: 'https://api.dropshero.com/admin',
		GET_MY_PROFILE: '/profile',
		EDIT_MY_PROFILE: '/profile',
		GET_ALL_ADMINS: '/',
		ADD_NEW_ADMIN: '/',
		GET_SINGLE_ADMIN: '/admin',
		EDIT_ADMIN: '/admin',
		DELETE_ADMIN: '/admin',
		GET_STATISTICS: '/statistics',
	},
}
export default ApiConstants
