import React, {useEffect, useState} from 'react'
import {ErrorToast, ProfileSidebar, SuccessToast} from '../../components'
import {deleteAdmin, GetAllAdmins, getAllAdmins} from '../../services'
import moment from 'moment'
import {Link} from 'react-router-dom'
import {useFetch} from '../../hooks'
import {AdminRoles} from '../../types'
import {useSelector} from 'react-redux'
import {AppState} from '../../reducers'
import {TrashIcon} from '@heroicons/react/outline'

const Index = () => {
	const {loading, data, fetchData} =
		useFetch<GetAllAdmins.RootObject>(getAllAdmins)
	useEffect(() => {
		fetchData()
		return () => fetchData()
	}, [fetchData])

	const [successOpen, setSuccessOpen] = useState<boolean>(false)
	const [error, setError] = useState<string>('')
	const [errorOpen, setErrorOpen] = useState<boolean>(false)
	const handleDelete = (id: string) => {
		deleteAdmin(id)
			.then((res) => {
				setSuccessOpen(true)
				fetchData()
			})
			.catch((err) => {
				if (err.response) {
					setError(err.response.data.message)
				} else {
					console.log(err)
				}
			})
	}

	const {
		user: {role},
	} = useSelector((state: AppState) => state.auth)
	return (
		<ProfileSidebar tabIndex={2} loading={loading}>
			<div className="-my-2 sm:-mx-6 lg:-mx-8 lg:col-span-8 sm:col-span-6">
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
									{role === AdminRoles.OWNER && (
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
								{data?.admins.map((admin) => (
									<tr key={admin.email}>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center">
												<div className="ml-4">
													<div className="text-sm font-medium text-gray-900">
														{admin.fullName}
													</div>
													<div className="text-sm text-gray-500">
														{admin.email}
													</div>
												</div>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">{admin.email}</div>
											<div className="text-sm text-gray-500">{admin.role}</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
												Active
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{moment(admin.createdAt).format('DD-MM-YYYY')}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
											<Link
												to={`/admin/${admin?._id}`}
												className="text-indigo-600 hover:text-indigo-900"
											>
												Edit
											</Link>
										</td>
										{role === AdminRoles.OWNER && (
											<td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
												<TrashIcon
													onClick={() => handleDelete(admin?._id)}
													className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-400"
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
		</ProfileSidebar>
	)
}
export default Index
