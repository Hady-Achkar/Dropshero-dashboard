import classNames from 'classnames'
import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Wrapper } from '../../components'
import { addNewUser } from '../../services'
import AddNewUserFromExcel from './excel'
import FormExcel from './excel'

const Index = () => {
	const history = useHistory()
	const [loading, setLoading] = useState<boolean>(false)
	const initState = {
		email: '',
		password: '',
		fname: '',
		lname: '',
	}
	const [userData, setUserData] = useState(initState)

	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
			setUserData((prevState) => ({
				...prevState,
				[event.target.id]: event.target.value,
			}))
		},
		[]
	)
	const isDisabled = Boolean(
		userData?.fname === '' ||
		userData?.lname === '' ||
		userData?.email === '' ||
		userData?.password === ''
	)

	const handleSubmit = useCallback(
		(event: React.FormEvent) => {
			event.preventDefault()
			setLoading(true)
			addNewUser(userData)
				.then((res) => {
					history.push(`/user/${res?.data?._id}`)
				})
				.catch((err) => {
					if (err.response) {
						console.log(err.response)
					} else {
						console.log(err)
					}
				})
		},
		[userData, history]
	)
	return (
		<Wrapper full loading={loading}>

			<div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9 relative">
				<div className='modal-row absolute -top-16 -right-2'>
					<AddNewUserFromExcel />
				</div>
				<form onSubmit={handleSubmit}>
					<div className="shadow sm:rounded-md sm:overflow-hidden">
						<div className="bg-white py-6 px-4 space-y-6 sm:p-6">
							<div className="grid grid-cols-3 gap-6">
								<div className="col-span-2">
									<label
										htmlFor="fname"
										className="block text-sm font-medium text-gray-700"
									>
										First name
									</label>
									<div className="mt-1">
										<input
											id="fname"
											name="fname"
											className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm px-3 py-2 border border-gray-300 rounded-md"
											placeholder="John"
											onChange={handleChange}
											value={userData?.fname}
										/>
									</div>
								</div>
								<div className="col-span-2">
									<label
										htmlFor="lname"
										className="block text-sm font-medium text-gray-700"
									>
										Last name
									</label>
									<div className="mt-1">
										<input
											id="lname"
											name="lname"
											className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm px-3 py-2 border border-gray-300 rounded-md"
											placeholder="Doe"
											onChange={handleChange}
											value={userData?.lname}
										/>
									</div>
								</div>

								<div className="col-span-3 sm:col-span-2">
									<label
										htmlFor="email"
										className="block text-sm font-medium text-gray-700"
									>
										Email Address
									</label>
									<input
										id="email"
										name="email"
										className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm px-3 py-2 border border-gray-300 rounded-md"
										placeholder="email@example.com"
										onChange={handleChange}
										value={userData?.email}
									/>
								</div>

								<div className="col-span-3 sm:col-span-2">
									<label
										htmlFor="password"
										className="block text-sm font-medium text-gray-700"
									>
										Password
									</label>
									<div className={'flex items-center relative'}>
										<input type={'hidden'} value={'asdasd'} />
										<input
											id="password"
											name="password"
											className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm px-3 py-2 border border-gray-300 rounded-md"
											placeholder="Password"
											type="password"
											onChange={handleChange}
											value={userData?.password}
											autoComplete={'off'}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="flex items-center justify-end space-x-2 px-4 py-3 bg-gray-50 text-right sm:px-6">
							<button
								type="submit"
								disabled={isDisabled}
								className={classNames(
									isDisabled
										? 'bg-gray-600 hover:bg-gray-700 cursor-not-allowed'
										: 'bg-indigo-600  hover:bg-indigo-700 cursor-pointer',
									'border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 '
								)}
							>
								Save
							</button>
						</div>
					</div>
				</form>
				{/* <FormExcel /> */}
			</div>
		</Wrapper>
	)
}

export default Index
