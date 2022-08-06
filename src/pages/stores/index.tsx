import {ExternalLinkIcon, LinkIcon, TrashIcon} from '@heroicons/react/outline'
import moment from 'moment'
import React, {Fragment, useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {ErrorToast, SuccessToast} from '../../components'
import {deleteStore, GetStores, getStores} from '../../services'

const Stores = () => {
	const [stores, setStores] = useState<GetStores.Store[]>()

	useEffect(() => {
		getStores()
			.then((res) => {
				setStores(res?.data?.data)
			})
			.catch((err) => console.log(err))
	}, [])

	const history = useHistory()

	const [showSuccess, setShowSuccess] = useState<boolean>(false)
	const [showError, setShowError] = useState<boolean>(false)
	const [error, setError] = useState<string>('')
	const handleDelete = (storeId: string) => {
		deleteStore(storeId)
			.then((_) => {
				setShowSuccess(true)
				getStores()
			})
			.catch((err) => {
				setShowError(true)
				setError(err.data.message)
			})
	}
	return (
		<Fragment>
			<div>
				<div className="px-4 sm:px-6 lg:px-8">
					<div className="sm:flex sm:items-center">
						<div className="sm:flex-auto"></div>
						<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
							<button
								type="button"
								onClick={() => history.push('/add-store')}
								className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
							>
								Add store
							</button>
						</div>
					</div>
					<div className="mt-8 flex flex-col">
						<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
							<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
								<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
									<table className="min-w-full divide-y divide-gray-300">
										<thead className="bg-gray-50">
											<tr>
												<th
													scope="col"
													className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
												>
													Store name
												</th>
												<th
													scope="col"
													className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
												>
													Category
												</th>
												<th
													scope="col"
													className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
												>
													Link
												</th>
												<th
													scope="col"
													className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
												>
													Created at
												</th>
												<th
													scope="col"
													className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
												>
													Edit store
												</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-gray-200 bg-white">
											{stores?.map((item) => (
												<tr key={item?._id}>
													<td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
														<div className="text-gray-900 capitalize">
															{item?.name}
														</div>
													</td>
													<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
														<span className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-green-700 sm:pl-6">
															{item?.category.toUpperCase()}
														</span>
													</td>
													<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
														<div className="text-blue-500">
															<a
																target={'_blank'}
																rel="noreferrer"
																href={item.link}
																className="flex items-center"
															>
																<ExternalLinkIcon className="w-5 h-5" />
																Go to store
															</a>
														</div>
													</td>

													<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
														<div className="text-gray-900">
															{moment(item.createdAt).format('DD/MM/YY hh:mm')}
														</div>
													</td>
													<td className="relative whitespace-nowrap py-4 pl-6 text-sm font-medium sm:pr-6">
														<Link
															to={`/edit-store/${item?._id}`}
															className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-indigo-700 hover:text-indigo-800 sm:pl-6"
														>
															Edit
														</Link>
													</td>
													{item._id && (
														<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
															<TrashIcon
																onClick={() => handleDelete(item._id || '')}
																className="w-5 h-5 text-gray-600 hover:text-red-700 cursor-pointer"
															/>
														</td>
													)}
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
				<SuccessToast
					show={showSuccess}
					setShow={setShowSuccess}
					title="Success!"
					message={`Influencer was deleted successfully`}
				/>
				<ErrorToast
					show={showError}
					setShow={setShowError}
					title="Error!"
					message={error}
				/>
			</div>
		</Fragment>
	)
}

export default Stores
