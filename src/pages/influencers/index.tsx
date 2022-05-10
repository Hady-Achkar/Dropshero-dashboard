import moment from 'moment'
import React, {useCallback, useEffect, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {ConfirmationModal, ErrorToast, SuccessToast} from '../../components'
import {Socials} from '../../constants'
import {deleteInfluencer, getAllInfluencers, IInfluencer} from '../../services'

const Influencers = () => {
	const [influencersData, setInfluencersData] = useState<IInfluencer[]>()
	const [openConfirmation, setOpenConfirmation] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)
	const [showSuccess, setShowSuccess] = useState(false)

	const [error, setError] = useState('')
	const [showError, setShowError] = useState(false)
	const fetchData = useCallback(() => {
		setLoading(true)
		getAllInfluencers()
			.then((res) => {
				setInfluencersData(res?.data?.influencers)
				setLoading(false)
			})
			.catch((err) => {
				console.log(err)
			})
	}, [influencersData])

	useEffect(() => {
		fetchData()
	}, [fetchData])

	const history = useHistory()

	const handleDelete = (influencerId: string | undefined) => {
		if (influencerId) {
			deleteInfluencer(influencerId)
				.then((res) => {
					setShowSuccess(true)
					fetchData()
				})
				.catch((err) => {
					setShowError(true)
					setError(err?.response?.data?.message)
				})
		}
	}

	return (
		<div>
			<div className="px-4 sm:px-6 lg:px-8">
				<div className="sm:flex sm:items-center">
					<div className="sm:flex-auto"></div>
					<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
						<button
							type="button"
							onClick={() => history.push('/add-influencer')}
							className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
						>
							Add influencer
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
												Channel Name
											</th>
											<th
												scope="col"
												className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
											>
												Main Platform
											</th>
											<th
												scope="col"
												className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
											>
												Followers
											</th>
											<th
												scope="col"
												className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
											>
												Category
											</th>
											<th
												scope="col"
												className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
											>
												Country
											</th>
											<th
												scope="col"
												className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
											>
												Language
											</th>
											<th
												scope="col"
												className="relative py-3.5 pl-3 pr-4 sm:pr-6"
											>
												<span className="sr-only">Edit</span>
											</th>
											<th
												scope="col"
												className="relative py-3.5 pl-3 pr-4 sm:pr-6"
											>
												<span className="sr-only">Delete</span>
											</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-200 bg-white">
										{influencersData?.map((item) => (
											<tr key={item?._id}>
												<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
													<div className="flex items-center">
														<div className="h-10 w-10 flex-shrink-0">
															<img
																className="h-10 w-10 rounded-full"
																src={item?.image}
																alt=""
															/>
														</div>
														<div className="ml-4">
															<div className="font-medium text-gray-900">
																{item?.channelName}
															</div>
															<div className="text-gray-500">
																{moment(item?.createdAt).format(
																	'DD/MM/YY hh:mm'
																)}
															</div>
														</div>
													</div>
												</td>
												<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
													<div className="text-gray-900"> {item?.platform}</div>
												</td>
												<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
													<span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
														{item?.followers}
													</span>
												</td>
												<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
													{item?.category.toUpperCase()}
												</td>
												<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
													{item?.country.toUpperCase()}
												</td>
												<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
													{item?.language.toUpperCase()}
												</td>
												<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
													<Link
														to={`/edit-influencer/${item?._id}`}
														className="text-indigo-600 hover:text-indigo-900"
													>
														Edit
													</Link>
												</td>
												{item._id && (
													<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
														<button
															onClick={() => handleDelete(item._id)}
															className="text-red-600 font-bold hover:text-red-900"
														>
															Delete
														</button>
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
	)
}

export default Influencers
