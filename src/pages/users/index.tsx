import React, {useEffect, useState} from 'react'
import {deleteUser, getAllUsers, GetAllUsers} from '../../services'
import moment from 'moment'
import {Link} from 'react-router-dom'
import {ErrorToast, SuccessToast, Wrapper} from '../../components'
import {useFetch} from '../../hooks'
import {TrashIcon} from '@heroicons/react/outline'
import {useSelector} from 'react-redux'
import {AppState} from '../../reducers'
import {ADDRCONFIG} from 'dns'
import {AdminRoles} from '../../types'

const Index = () => {
	const {data, err, loading, fetchData} =
		useFetch<GetAllUsers.RootObject>(getAllUsers)
	useEffect(() => {
		fetchData()
		return () => fetchData()
	}, [fetchData])

	const [successOpen, setSuccessOpen] = useState<boolean>(false)
	const [error, setError] = useState<string>('')
	const [errorOpen, setErrorOpen] = useState<boolean>(false)
	const handleDelete = (id: string) => {
		deleteUser(id)
			.then((res) => {
				setSuccessOpen(true)
				fetchData()
			})
			.catch((err) => {
				if (err.response) {
					setError(err?.response?.data?.message)
					setErrorOpen(true)
				} else {
					console.log(err)
				}
			})
	}

	const {
		user: {role},
	} = useSelector((state: AppState) => state.auth)
	return (
		<Wrapper full loading={loading}>
			<div className="flex flex-col">
				<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
						<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Name
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Email
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Status
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Joined at
										</th>
										<th scope="col" className="relative px-6 py-3">
											<span className="sr-only">View</span>
										</th>
										{role !== AdminRoles.SUPPORT && (
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Delete
											</th>
										)}
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{data?.users.map((person) => (
										<tr key={person.email}>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center">
													<div className="ml-4">
														<div className="text-sm font-medium text-gray-900">
															{person.fullName}
														</div>
														<div className="text-sm text-gray-500">
															{person.email}
														</div>
													</div>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="text-sm text-gray-900">
													{person.email}
												</div>
												<div className="text-sm text-gray-500">
													{person.status}
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
													Active
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{moment(person.createdAt).format('DD-MM-YYYY')}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
												<Link
													to={`/user/${person?._id}`}
													className="text-indigo-600 hover:text-indigo-900"
												>
													Edit
												</Link>
											</td>

											{role !== AdminRoles.SUPPORT && (
												<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
													<TrashIcon
														onClick={() => handleDelete(person._id)}
														className="w-5 h-5 text-gray-500 hover:text-gray-400 cursor-pointer"
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
			<SuccessToast
				show={successOpen}
				setShow={setSuccessOpen}
				message="User was deleted successfully"
				title="Success!"
			/>
			<ErrorToast
				show={errorOpen}
				setShow={setErrorOpen}
				message={error}
				title="Error deleting user"
			/>
		</Wrapper>
	)
}

export default Index
