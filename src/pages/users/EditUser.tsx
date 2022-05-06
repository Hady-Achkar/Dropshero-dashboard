import classNames from 'classnames'
import React, {Fragment, useCallback, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {ErrorToast, Wrapper} from '../../components'
import {getSingleCustomer, GetCustomer, editCustomer} from '../../services'
import {ToUpperFirst} from '../../utils'

type IParams = {
	userId: string
}

const EditUser = () => {
	const {userId} = useParams<IParams>()
	const [error, setError] = useState<string>('')
	const [errorShow, setErrorShow] = useState<boolean>(false)

	const [loading, setLoading] = useState<boolean>(false)
	const [passwordShown, setPasswordShown] = useState<boolean>(false)
	const [confirmPasswordShown, setConfirmPasswordShown] =
		useState<boolean>(false)

	const [userData, setUserData] = useState<GetCustomer.ICustomer>()

	const fetchUser = useCallback(() => {
		getSingleCustomer(userId)
			.then((res) => {
				setLoading(true)
				setUserData({...res.data.user, password: '', confirmPassword: ''})
				setLoading(false)
			})
			.catch((error) => {
				if (error.response) {
					console.log(error.response)
				}
			})
	}, [userId])

	useEffect(() => {
		fetchUser()
		return () => fetchUser()
	}, [fetchUser])

	console.log('user', userData)

	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
			//@ts-ignore
			setUserData((prevState) => ({
				...prevState,
				[event.target.id]: event.target.value,
			}))
		},
		[]
	)

	const handleSubmit = useCallback(
		(event: React.FormEvent) => {
			event.preventDefault()
			setLoading(true)
			//@ts-ignore
			editCustomer(userData, userId)
				.then((res) => {
					fetchUser()
				})
				.catch((err) => {
					if (err.response) {
						console.log(err.response.data.errors[0])
						const message = ToUpperFirst(err.response.data.errors[0].name)
						if (message) setError(message)
						setErrorShow(true)
						setLoading(false)
					} else {
						console.log(err)
					}
				})
		},
		[fetchUser, userData, userId]
	)

	const handleTogglePasswordShown = useCallback(() => {
		setPasswordShown((prevState) => !prevState)
	}, [])

	const handleToggleConfirmShown = useCallback(() => {
		setConfirmPasswordShown((prevState) => !prevState)
	}, [])

	const isDisabled = Boolean(
		userData?.confirmPassword !== userData?.password ||
			userData?.lname === '' ||
			userData?.fname === '' ||
			userData?.email === ''
	)

	console.log(userData)

	return (
		<Wrapper full loading={loading}>
			<div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
				<form onSubmit={handleSubmit}>
					<div className="shadow sm:rounded-md sm:overflow-hidden">
						<div className="bg-white py-6 px-4 space-y-6 sm:p-6">
							<div>
								<h3 className="text-lg leading-6 font-medium text-gray-900">
									{userData?.fullName}
								</h3>
								<span className="px-2 inline-flex  text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
									{ToUpperFirst(userData?.status)}
								</span>
							</div>

							<div className="grid grid-cols-3 gap-6">
								<div className="col-span-3 sm:col-span-2">
									<label
										htmlFor="company-website"
										className="block text-sm font-medium text-gray-700"
									>
										Email Address
									</label>
									<span className="bg-gray-50 border w-full mt-1 border-gray-300 py-2 px-3 inline-flex items-center text-gray-500 sm:text-sm block rounded-lg border-gray-300 select-none">
										{userData?.email}
									</span>
								</div>

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
											placeholder="John Doe"
											onChange={handleChange}
											// disabled={!isOwner}
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
											placeholder="John Doe"
											onChange={handleChange}
											value={userData?.lname}
										/>
									</div>
								</div>

								<Fragment>
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
												onChange={handleChange}
												type={passwordShown ? 'text' : 'password'}
												value={userData?.password}
												autoComplete={'off'}
											/>
											{!passwordShown ? (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-6 w-6 cursor-pointer"
													fill="none"
													onClick={handleTogglePasswordShown}
													style={{
														position: 'absolute',
														right: 5,
													}}
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="1.5"
														d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
													/>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="1.5"
														d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
													/>
												</svg>
											) : (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-6 w-6 cursor-pointer"
													fill="none"
													onClick={handleTogglePasswordShown}
													style={{
														position: 'absolute',
														right: 5,
													}}
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
													/>
												</svg>
											)}
										</div>
									</div>

									<div className="col-span-3 sm:col-span-2">
										<label
											htmlFor="confirmPassword"
											className="block text-sm font-medium text-gray-700"
										>
											Confirm password
										</label>
										<div className="mt-1">
											<div className={'flex items-center relative'}>
												<input
													id="confirmPassword"
													name="confirmPassword"
													className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm px-3 py-2 border border-gray-300 rounded-md"
													placeholder="Confirm password"
													autoComplete="off"
													onChange={handleChange}
													type={confirmPasswordShown ? 'text' : 'password'}
													value={userData?.confirmPassword}
												/>
												{!confirmPasswordShown ? (
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-6 w-6 cursor-pointer"
														fill="none"
														onClick={handleToggleConfirmShown}
														style={{
															position: 'absolute',
															right: 5,
														}}
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth="1.5"
															d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
														/>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth="1.5"
															d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
														/>
													</svg>
												) : (
													<svg
														xmlns="http://www.w3.org/2000/svg"
														style={{
															position: 'absolute',
															right: 5,
														}}
														className="h-6 w-6 cursor-pointer"
														fill="none"
														onClick={handleToggleConfirmShown}
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth="2"
															d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
														/>
													</svg>
												)}
											</div>
										</div>
									</div>
								</Fragment>
							</div>
						</div>
						<Fragment>
							<div className="flex items-center justify-end space-x-2 px-4 py-3 bg-gray-50 text-right sm:px-6">
								<button
									type={'button'}
									onClick={() => fetchUser()}
									className={
										'border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-indigo-600  hover:bg-indigo-700'
									}
								>
									Discard
								</button>
								<button
									type="submit"
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
						</Fragment>
					</div>
				</form>
				<ErrorToast
					show={errorShow}
					setShow={setErrorShow}
					message={error}
					title={'Something went wrong while editing the admin'}
				/>
			</div>
		</Wrapper>
	)
}

export default EditUser
