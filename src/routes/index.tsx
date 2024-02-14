import React from 'react'
import {Switch} from 'react-router-dom'
import {
	AddAdminPage,
	AddAmazonProductPage,
	AddInfluencer,
	AddNewUser,
	AddNewUserFromExcel,
	AddProductPage,
	AddStorePage,
	AllAdminsPage,
	EditAdminPage,
	EditAmazonProductPage,
	EditInfluncer,
	EditProductPage,
	EditStorePage,
	EditUserPage,
	GetAllAmazonProducts,
	Homepage,
	InfluencersPage,
	ProductsPage,
	ProfilePage,
	SecurityPage,
	SigninPage,
	SingleAmazonProductPage,
	SingleProductPage,
	StoresPage,
	UsersPage,
} from '../pages'
import Route from './route'

export interface IRoutesConfiguration {
	isPrivate: boolean
	path: string
	exact: boolean
	component: React.FC
	full: boolean
	tabIndex: number
	title: string
}

//TO-Do incase we need subroutes---> https://reactrouter.com/web/example/route-config
const routesConfiguration: IRoutesConfiguration[] = [
	{
		path: '/',
		exact: true,
		isPrivate: false,
		component: Homepage,
		full: false,
		tabIndex: 0,
		title: 'Home',
	},
	{
		path: '/sign-in',
		exact: true,
		isPrivate: false,
		component: SigninPage,
		full: false,
		tabIndex: 0,
		title: 'Sign in',
	},
	{
		path: '/products',
		exact: true,
		isPrivate: false,
		component: ProductsPage,
		full: false,
		tabIndex: 1,
		title: 'Products',
	},
	{
		path: '/product/:productId',
		exact: true,
		isPrivate: false,
		component: SingleProductPage,
		full: false,
		tabIndex: 2,
		title: 'Product',
	},
	{
		path: '/edit-product/:productId',
		exact: true,
		isPrivate: false,
		component: EditProductPage,
		full: false,
		tabIndex: 2,
		title: 'Edit Product',
	},
	{
		path: '/amazon-products',
		exact: true,
		isPrivate: false,
		component: GetAllAmazonProducts,
		full: false,
		tabIndex: 2,
		title: 'Amazon Products',
	},
	{
		path: '/add-amazon-product',
		exact: true,
		isPrivate: false,
		component: AddAmazonProductPage,
		full: false,
		tabIndex: 6,
		title: 'Add Amazon products',
	},
	{
		path: '/amazon-product/:amazonProductId',
		exact: true,
		isPrivate: false,
		component: SingleAmazonProductPage,
		full: false,
		tabIndex: 2,
		title: 'Amazon Products',
	},

	{
		path: '/edit-amazon-product/:amazonProductId',
		exact: true,
		isPrivate: false,
		component: EditAmazonProductPage,
		full: false,
		tabIndex: 2,
		title: 'Edit Product',
	},
	{
		path: '/users',
		exact: true,
		isPrivate: false,
		component: UsersPage,
		full: false,
		tabIndex: 3,
		title: 'All users',
	},
	{
		path: '/add-product',
		exact: true,
		isPrivate: false,
		component: AddProductPage,
		full: false,
		tabIndex: 3,
		title: 'Add product',
	},
	{
		path: '/profile',
		exact: true,
		isPrivate: false,
		component: ProfilePage,
		full: true,
		tabIndex: 100,
		title: 'My profile',
	},
	{
		path: '/profile/security',
		exact: true,
		isPrivate: false,
		component: SecurityPage,
		full: true,
		tabIndex: 100,
		title: 'Profile security',
	},
	{
		path: '/profile/admins',
		exact: true,
		isPrivate: false,
		component: AllAdminsPage,
		full: true,
		tabIndex: 100,
		title: 'All admins',
	},
	{
		path: '/profile/add-admin',
		exact: true,
		isPrivate: false,
		component: AddAdminPage,
		full: true,
		tabIndex: 100,
		title: 'Add admin',
	},
	{
		path: '/admin/:adminId',
		exact: true,
		isPrivate: false,
		component: EditAdminPage,
		full: true,
		tabIndex: 100,
		title: 'Admin',
	},
	{
		path: '/user/:userId',
		exact: true,
		isPrivate: false,
		component: EditUserPage,
		full: true,
		tabIndex: 100,
		title: 'Edit user',
	},
	{
		path: '/add-user',
		exact: true,
		isPrivate: false,
		component: AddNewUser,
		full: true,
		tabIndex: 4,
		title: 'Add user',
	},
	{
		path: '/influencers',
		exact: true,
		isPrivate: false,
		component: InfluencersPage,
		full: true,
		tabIndex: 100,
		title: 'Influencers',
	},
	{
		path: '/add-influencer',
		exact: true,
		isPrivate: false,
		component: AddInfluencer,
		full: true,
		tabIndex: 100,
		title: 'Add new Influencer',
	},
	{
		path: '/edit-influencer/:influencerId',
		exact: true,
		isPrivate: false,
		component: EditInfluncer,
		full: true,
		tabIndex: 100,
		title: 'Edit Influencer',
	},
	{
		path: '/add-store',
		exact: true,
		isPrivate: false,
		component: AddStorePage,
		full: true,
		tabIndex: 100,
		title: 'Add Store',
	},
	{
		path: '/edit-store/:storeId',
		exact: true,
		isPrivate: false,
		component: EditStorePage,
		full: true,
		tabIndex: 100,
		title: 'Edit Store',
	},
	{
		path: '/stores',
		exact: true,
		isPrivate: false,
		component: StoresPage,
		full: true,
		tabIndex: 2,
		title: 'Stores',
	},
]

// incase we needed seperate store use context check this link https://react-redux.js.org/api/hooks#custom-context
const Routes: React.FC = () => {
	return (
		<Switch>
			{routesConfiguration.map((route, index) => (
				<Route {...route} key={index} />
			))}
		</Switch>
	)
}

export default Routes
