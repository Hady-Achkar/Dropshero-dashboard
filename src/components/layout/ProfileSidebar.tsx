import type {FC} from 'react'
import React, {useEffect, useMemo, useState} from 'react'
import {Link} from 'react-router-dom'
import {Wrapper} from '../index'
import {
	KeyIcon,
	UserAddIcon,
	UserCircleIcon,
	UserGroupIcon,
} from '@heroicons/react/outline'
import classnames from 'classnames'
import {useSelector} from 'react-redux'
import {AppState} from '../../reducers'
import {AdminRoles} from '../../types'

interface IProps {
	loading: boolean
	tabIndex: number
	children: React.ReactNode
}

const Index: FC<IProps> = (props) => {
	const {loading, tabIndex, children} = props
	const {role} = useSelector((state: AppState) => state.auth.user)
	const initNavigation = useMemo(() => {
		if (role === AdminRoles.OWNER) {
			return [
				{
					name: 'Your account',
					to: '/profile',
					icon: UserCircleIcon,
					current: true,
				},
				{
					name: 'Security',
					to: '/profile/security',
					icon: KeyIcon,
					current: false,
				},
				{
					name: 'Admins',
					to: '/profile/admins',
					icon: UserGroupIcon,
					current: false,
				},
				{
					name: 'Add Admin',
					to: '/profile/add-admin',
					icon: UserAddIcon,
					current: false,
				},
			]
		} else {
			return [
				{
					name: 'Your account',
					to: '/profile',
					icon: UserCircleIcon,
					current: true,
				},
				{
					name: 'Security',
					to: '/profile/security',
					icon: KeyIcon,
					current: false,
				},
				{
					name: 'Admins',
					to: '/profile/admins',
					icon: UserGroupIcon,
					current: false,
				},
			]
		}
	}, [role])

	const [navigation, setNavigation] =
		useState<typeof initNavigation>(initNavigation)
	useEffect(() => {
		const updatedNavigation = initNavigation.map((item, index) => {
			if (index === tabIndex) {
				return {
					...item,
					current: true,
				}
			} else {
				return {
					...item,
					current: false,
				}
			}
		})
		setNavigation(updatedNavigation)
	}, [initNavigation, tabIndex])
	return (
		<Wrapper full loading={loading}>
			<div className="lg:grid lg:grid-cols-12 lg:gap-x-5 w-full">
				<aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-2">
					<nav className="space-y-1">
						{navigation.map((item) => (
							<Link
								key={item.name}
								to={item.to}
								className={classnames(
									item.current
										? 'bg-gray-50 text-indigo-700 hover:text-indigo-700 hover:bg-white'
										: 'text-gray-900 hover:text-gray-900 hover:bg-gray-50',
									'group rounded-md px-3 py-2 flex items-center text-sm font-medium'
								)}
								aria-current={item.current ? 'page' : undefined}
							>
								<item.icon
									className={classnames(
										item.current
											? 'text-indigo-500 group-hover:text-indigo-500'
											: 'text-gray-400 group-hover:text-gray-500',
										'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
									)}
									aria-hidden="true"
								/>
								<span className="truncate">{item.name}</span>
							</Link>
						))}
					</nav>
				</aside>
				{children}
			</div>
		</Wrapper>
	)
}
export default Index
