import React, {Fragment, useState} from 'react'
import classNames from 'classnames'
import {ErrorToast, SuccessToast} from '../../components'
import {addStore, GetStores} from '../../services'
import {useHistory} from 'react-router-dom'
import {Categories} from '../../data'

const AddStore = () => {
	const history = useHistory()
	const [showSuccess, setShowSuccess] = useState(false)

	const [error, setError] = useState('')
	const [showError, setShowError] = useState(false)
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		addStore(storeData)
			.then((res) => {
				setShowSuccess(true)
				history.push('/stores')
			})
			.catch((err) => {
				setError(err?.response?.message)
				setShowError(true)
			})
	}

	const initState: GetStores.Store = {
		name: '',
		category: '',
		link: '',
		type: 'amazon',
	}

	const [storeData, setStoreData] = useState<GetStores.Store>(initState)

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setStoreData({...storeData, [e.target.id]: e.target.value})
	}

	const isDisabled =
		storeData.name === '' || storeData.category === '' || storeData.link === ''

	return (
		<div className=" sm:px-6 lg:px-0 lg:col-span-9">
			<form className="max-w-5xl" onSubmit={handleSubmit}>
				<div className="shadow sm:rounded-md sm:overflow-hidden mx-auto">
					<div className="bg-white py-3 px-4  sm:p-6 mx-auto">
						<div>
							<span className="px-2 inline-flex  text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800"></span>
						</div>
						<div className="grid grid-cols-4 gap-6">
							<div className="col-span-2">
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700"
								>
									Name
								</label>
								<div className="mt-1">
									<input
										id="name"
										onChange={handleChange}
										className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm px-3 py-2 border border-gray-300 rounded-md"
										placeholder="Amazon UK"
									/>
								</div>
							</div>
							<div className="col-span-2">
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700"
								>
									Type
								</label>
								<div className="mt-1">
									<select
										id="type"
										onChange={handleChange}
										className="block w-full space-y-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									>
										<option selected disabled hidden>
											Select a type
										</option>
										<option value={'dropshipping'}>Dropshipping store</option>
										<option value={'amazon'}>Amazon store</option>
										<option value={'brand'}>Brand store</option>
									</select>
								</div>
							</div>

							<div className="col-span-2">
								<label
									htmlFor="category"
									className="block text-sm font-medium text-gray-700"
								>
									Category
								</label>
								<select
									id="category"
									onChange={handleChange}
									className="block w-full space-y-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								>
									<option selected disabled hidden>
										Select a category
									</option>
									{Categories.map((item, index) => {
										return (
											<option
												className="px-2 py-1"
												key={index}
												value={item.value}
											>
												{item.label}
											</option>
										)
									})}
								</select>
							</div>
						</div>
						<div className="col-span-2 mt-5">
							<label
								htmlFor="link"
								className="block text-sm font-medium text-gray-700"
							>
								Link
							</label>
							<div className="mt-1">
								<input
									onChange={handleChange}
									id="link"
									placeholder="https://www.amazon.com"
									className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm px-3 py-2 border border-gray-300 rounded-md"
								/>
							</div>
						</div>
					</div>
					<Fragment>
						<div className="flex items-center justify-end space-x-2 px-4 py-3 bg-gray-50 text-right sm:px-6">
							<button
								type={'button'}
								className={
									'border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 bg-gray-600  hover:bg-gray-700'
								}
								onClick={() => setStoreData(initState)}
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

			<SuccessToast
				show={showSuccess}
				setShow={setShowSuccess}
				title="Success!"
				message="Store was added successfully"
			/>
			<ErrorToast
				show={showError}
				setShow={setShowError}
				title="Error!"
				message={error}
			/>
		</div>
	)
}

export default AddStore
