import React, {Fragment, useCallback, useEffect, useMemo, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {
	CubeIcon,
	HomeIcon,
	MenuIcon,
	PlusIcon,
	StarIcon,
	UserAddIcon,
	UsersIcon,
	XIcon,
} from '@heroicons/react/outline'
import {Link} from 'react-router-dom'
import {logoutAction} from '../../actions'
import {useDispatch, useSelector} from 'react-redux'
import {Images} from '../../constants'
import {AppState} from '../../reducers'

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ')
}

interface IProps {
	children: React.ReactNode
	full?: boolean
	tabIndex: number
	title: string
}

const Sidebar: React.FC<IProps> = (props) => {
	const {children, full, tabIndex, title} = props
	const {fullName, image} = useSelector((state: AppState) => state.auth.user)
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const dispatch = useDispatch()
	const initNavigation = useMemo(() => {
		return [
			{name: 'Dashboard', to: '/', icon: HomeIcon, current: true},
			{name: 'Users', to: '/users', icon: UsersIcon, current: false},
			{name: 'Products', to: '/products', icon: CubeIcon, current: false},
			{name: 'Add Product', to: '/add-product', icon: PlusIcon, current: false},
			{
				name: 'Influencers',
				to: '/influencers',
				icon: StarIcon,
				current: false,
			},
			{
				name: 'Add Subscriber',
				to: '/add-user',
				icon: UserAddIcon,
				current: false,
			},
		]
	}, [])
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
	const handleLogout = useCallback(() => {
		dispatch(logoutAction())
	}, [dispatch])
	return (
		<>
			<div>
				<Transition.Root show={sidebarOpen} as={Fragment}>
					<Dialog
						as="div"
						className="fixed inset-0 flex z-40 md:hidden"
						onClose={setSidebarOpen}
					>
						<Transition.Child
							as={Fragment}
							enter="transition-opacity ease-linear duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="transition-opacity ease-linear duration-300"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
						</Transition.Child>
						<Transition.Child
							as={Fragment}
							enter="transition ease-in-out duration-300 transform"
							enterFrom="-translate-x-full"
							enterTo="translate-x-0"
							leave="transition ease-in-out duration-300 transform"
							leaveFrom="translate-x-0"
							leaveTo="-translate-x-full"
						>
							<div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
								<Transition.Child
									as={Fragment}
									enter="ease-in-out duration-300"
									enterFrom="opacity-0"
									enterTo="opacity-100"
									leave="ease-in-out duration-300"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<div className="absolute top-0 right-0 -mr-12 pt-2">
										<button
											type="button"
											className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
											onClick={() => setSidebarOpen(false)}
										>
											<span className="sr-only">Close sidebar</span>
											<XIcon
												className="h-6 w-6 text-white"
												aria-hidden="true"
											/>
										</button>
									</div>
								</Transition.Child>
								<div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
									<div className="flex-shrink-0 flex items-center px-4">
										<img
											className="h-8 w-auto"
											src={Images.Logo.src}
											alt={Images.Logo.alt}
										/>
									</div>
									<nav className="mt-5 px-2 space-y-1">
										{navigation.map((item) => (
											<Link
												key={item.name}
												to={item.to}
												className={classNames(
													item.current
														? 'bg-gray-900 text-white'
														: 'text-gray-300 hover:bg-gray-700 hover:text-white',
													'group flex items-center px-2 py-2 text-base font-medium rounded-md'
												)}
											>
												<item.icon
													className={classNames(
														item.current
															? 'text-gray-300'
															: 'text-gray-400 group-hover:text-gray-300',
														'mr-4 flex-shrink-0 h-6 w-6'
													)}
													aria-hidden="true"
												/>
												{item.name}
											</Link>
										))}
									</nav>
								</div>
								<div className="flex-shrink-0 flex bg-gray-700 p-4">
									<Link to="/profile" className="flex-shrink-0 group block">
										<div className="flex items-center">
											<div>
												<img
													className="inline-block h-10 w-10 rounded-full"
													src={image}
													alt={'Dropshero-admin'}
												/>
											</div>
											<div className="ml-3">
												<p className="text-base font-medium text-white">
													{fullName}
												</p>
												<p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">
													View profile
												</p>
											</div>
										</div>
									</Link>
								</div>
							</div>
						</Transition.Child>
						<div className="flex-shrink-0 w-14">
							{/* Force sidebar to shrink to fit close icon */}
						</div>
					</Dialog>
				</Transition.Root>

				{/* Static sidebar for desktop */}
				<div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
					{/* Sidebar component, swap this element with another sidebar if you like */}
					<div className="flex-1 flex flex-col min-h-0 bg-gray-800">
						<div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
							<div className="flex font-bold text-white text-2xl  items-center flex-shrink-0 px-4 ">
								Dropshero
							</div>
							<nav className="mt-5 flex-1 px-2 space-y-1">
								{navigation.map((item) => (
									<Link
										key={item.name}
										to={item.to}
										className={classNames(
											item.current
												? 'bg-gray-900 text-white'
												: 'text-gray-300 hover:bg-gray-700 hover:text-white',
											'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
										)}
									>
										<item.icon
											className={classNames(
												item.current
													? 'text-gray-300'
													: 'text-gray-400 group-hover:text-gray-300',
												'mr-3 flex-shrink-0 h-6 w-6'
											)}
											aria-hidden="true"
										/>
										{item.name}
									</Link>
								))}
							</nav>
						</div>
						<div className="flex-shrink-0 flex bg-gray-700 p-4">
							<div className="flex-shrink-0 w-full group block">
								<div className="flex items-center justify-between">
									<Link to={'/profile'}>
										<div className={'flex items-center'}>
											<div>
												<img
													className="inline-block h-9 w-9 rounded-full"
													src={image}
													alt={'Dropshero-profile-admin'}
												/>
											</div>
											<div className="ml-3">
												<p className="text-sm font-medium text-white">
													{fullName}
												</p>
												<p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">
													View profile
												</p>
											</div>
										</div>
									</Link>
									<div>
										<div
											className="ml-3 flex flex-col items-center cursor-pointer"
											onClick={handleLogout}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-6 w-6 rotate-180 hover:text-gray-200"
												fill="none"
												viewBox="0 0 24 24"
												stroke="#fff"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="1"
													d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
												/>
											</svg>
											<p className="text-xs font-medium text-gray-300 hover:text-gray-200">
												Logout
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="md:pl-64 flex flex-col flex-1">
					<div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
						<button
							type="button"
							className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
							onClick={() => setSidebarOpen(true)}
						>
							<span className="sr-only">Open sidebar</span>
							<MenuIcon className="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
					<main className="flex-1">
						<div className="py-6">
							<div
								className={classNames(
									!full && 'max-w-7xl',
									'mx-auto px-4 sm:px-6 lg:px-8'
								)}
							>
								<h1 className="text-2xl font-semibold text-gray-900">
									{title}
								</h1>
							</div>
							<div
								className={classNames(
									!full && 'max-w-7xl',
									'mx-auto px-4 sm:px-6 md:px-8 mt-8'
								)}
							>
								{children}
							</div>
						</div>
					</main>
				</div>
			</div>
		</>
	)
}
export default Sidebar
