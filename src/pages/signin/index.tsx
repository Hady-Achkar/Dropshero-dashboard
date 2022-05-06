import React, {useCallback, useMemo, useState} from 'react'
import {login, LoginPayload} from '../../services'
import {useDispatch} from 'react-redux'
import {loginAction} from '../../actions'
import {Link} from 'react-router-dom'
import {Images} from '../../constants'
import Cookies from 'universal-cookie'
import {ErrorToast} from '../../components'

const Index = () => {
	const dispatch = useDispatch()
	const cookies = useMemo(() => {
		return new Cookies()
	}, [])
	const [error, setError] = useState<string>('')
	const [showError, setShowError] = useState<boolean>(false)

	const [userData, setUserData] = useState<LoginPayload>({
		email: '',
		password: '',
	})
	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
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
			login(userData?.email, userData?.password)
				.then((res) => {
					const {token, fullName, email, _id, role, image} = res.data
					cookies.set('token', token, {path: '/'})
					cookies.set('fullName', fullName, {path: '/'})
					cookies.set('email', email, {path: '/'})
					cookies.set('_id', _id, {path: '/'})
					cookies.set('role', role, {path: '/'})
					cookies.set('image', image, {path: '/'})
					dispatch(
						loginAction({
							token,
							fullName,
							email,
							_id,
							role,
							image,
						})
					)
				})
				.catch((err: any) => {
					if (err.response) {
						setError(err.response.data.message)
						setShowError(true)
					} else {
						console.log(err)
					}
				})
		},
		[cookies, dispatch, userData]
	)
	return (
		<div className="min-h-screen flex flex-col justify-center items-center sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<div className="flex justify-center items-center flex-shrink-0 px-4 ">
					<h2 className={'mt-6 text-center text-2xl font-bold text-indigo-900'}>
						DROPSHERO DASHBOARD
					</h2>
				</div>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<form className="space-y-6" onSubmit={handleSubmit}>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700"
							>
								Email address
							</label>
							<div className="mt-1">
								<input
									id="email"
									name="email"
									type="email"
									onChange={handleChange}
									value={userData?.email}
									autoComplete="email"
									required
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700"
							>
								Password
							</label>
							<div className="mt-1">
								<input
									id="password"
									name="password"
									type="password"
									onChange={handleChange}
									value={userData?.password}
									autoComplete="current-password"
									required
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								/>
							</div>
						</div>

						<div className="flex items-center justify-end">
							<div className="text-sm">
								<Link
									to="/forgot-password"
									className="font-medium text-indigo-600 hover:text-indigo-500"
								></Link>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Sign in
							</button>
						</div>
					</form>
				</div>
			</div>
			<ErrorToast
				title={'Error while signing in!'}
				show={showError}
				setShow={setShowError}
				message={error}
			/>
		</div>
	)
}

export default Index
