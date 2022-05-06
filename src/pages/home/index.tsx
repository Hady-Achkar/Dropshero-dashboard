import React, {useCallback, useEffect, useState} from 'react'
import {MainStats, Wrapper} from '../../components'
import {GetStatistics, getStatistics} from '../../services'
import {
	BadgeCheckIcon,
	BanIcon,
	CalendarIcon,
	ClockIcon,
	CubeIcon,
	CursorClickIcon,
	ScaleIcon,
} from '@heroicons/react/outline'
import moment from 'moment'
import {Link} from 'react-router-dom'
import {ToUpperFirst} from '../../utils'
import {useSelector} from 'react-redux'
import {AppState} from '../../reducers'
import {AdminRoles} from '../../types'

export interface IStat {
	name: string
	stat: string | number
	icon: any
}

interface IStatistics {
	counts: IStat[]
	admins: GetStatistics.Admin[]
	activePromos: GetStatistics.ActivePromo[]
	latestCustomers: GetStatistics.LatestCustomer[]
	latestTransactions: GetStatistics.LatestTransaction[]
}

const Index = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [statistics, setStatistics] = useState<IStatistics>()
	const fetchStatistics = useCallback(() => {
		setLoading(true)
		getStatistics()
			.then((res) => {
				const availableBalance = {
					name: 'Available balance',
					stat: `${
						res.data.data.balance.available.reduce(
							(previousValue, currentValue) =>
								previousValue + currentValue.amount,
							0
						) / 100
					} EUR`,
					icon: ScaleIcon,
				}
				const pendingBalance = {
					name: 'Pending balance',
					stat: `${
						res.data.data.balance.pending.reduce(
							(previousValue, currentValue) =>
								previousValue + currentValue.amount,
							0
						) / 100
					} EUR`,
					icon: ClockIcon,
				}
				const totalProducts = {
					name: 'Products count',
					stat: res.data.data.counts.products,
					icon: CubeIcon,
				}
				const nonSubscribers = {
					name: 'Non subscribers count',
					stat: res.data.data.counts.nonSubscribers,
					icon: BanIcon,
				}
				const expiredSubscribers = {
					name: 'Expired subscriptions count',
					stat: res.data.data.counts.expiredSubscribers,
					icon: CursorClickIcon,
				}
				const totalSubscribers = {
					name: 'Total subscriptions count',
					stat: res.data.data.counts.subscribers.total,
					icon: BadgeCheckIcon,
				}
				const monthlySubscribers = {
					name: 'Monthly subscriptions count',
					stat: res.data.data.counts.subscribers.monthly,
					icon: CalendarIcon,
				}
				const oneTimeSubscribers = {
					name: 'One time subscriptions count',
					stat: res.data.data.counts.subscribers.one_time,
					icon: CalendarIcon,
				}
				console.log(res?.data?.data?.latestTransactions)
				setStatistics({
					counts: [
						totalProducts,
						nonSubscribers,
						expiredSubscribers,
						totalSubscribers,
						monthlySubscribers,
						oneTimeSubscribers,
					],
					admins: res?.data?.data.admins,
					activePromos: res?.data?.data.activePromos,
					latestCustomers: res?.data?.data?.latestCustomers,
					latestTransactions: res?.data?.data?.latestTransactions,
				})

				setLoading(false)
			})
			.catch((err) => {
				if (err.response) {
					console.log(err.response.data)
				} else {
					console.log(err)
				}
			})
	}, [])
	useEffect(() => {
		fetchStatistics()
		return () => fetchStatistics()
	}, [fetchStatistics])

	const colorPaymentStats = (stat: string) => {
		switch (stat) {
			case 'available':
				return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'
			case 'pending':
				return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800'
			default:
				return
		}
	}

	const colorPaymentType = (type: string) => {
		switch (type) {
			case 'payout':
				return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-pink-100 text-pink-800'
			case 'charge':
				return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'
			case 'stripe_fee':
				return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800'
			case 'refund':
				return 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'
			default:
				return
		}
	}

	const {
		user: {role},
	} = useSelector((state: AppState) => state.auth)
	return (
		<Wrapper full loading={loading}>
			<div className="space-y-3">
				{statistics && <MainStats stats={statistics.counts} />}
				<div className="-my-2 sm:-mx-6 lg:-mx-8 lg:col-span-8 sm:col-span-6">
					<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
						<h3 className="text-lg leading-6 font-medium text-gray-900 my-5">
							Admins
						</h3>
						<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
							<table className="min-w-full divide-y divide-gray-200 table-">
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
											Joined at
										</th>
										<th scope="col" className="relative px-6 py-3">
											<span className="sr-only">View</span>
										</th>
									</tr>
								</thead>

								<tbody className="bg-white table-fixed divide-y divide-gray-200">
									{statistics?.admins.map((admin) => (
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
												<div className="text-sm text-gray-900">
													{admin.email}
												</div>
												<div className="text-sm text-gray-500">
													{admin.role}
												</div>
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
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				{/*Active promos start here*/}
				<div className="-my-2 sm:-mx-6 lg:-mx-8 lg:col-span-8 sm:col-span-6">
					<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
						<h3 className="text-lg leading-6 font-medium text-gray-900 my-5">
							Promotions
						</h3>
						<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
							<table className="min-w-full table-fixed divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Coupon
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Promotion
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Discount Value
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
											Created at
										</th>
										<th scope="col" className="relative px-6 py-3">
											<span className="sr-only">View</span>
										</th>
									</tr>
								</thead>
								<tbody className="bg-white table-fixed divide-y divide-gray-200">
									{statistics?.activePromos.map((promo) => (
										<tr key={promo.id}>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center">
													<div className="ml-4">
														<div className="text-sm font-medium text-gray-900">
															{promo.code}
														</div>
													</div>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="text-sm text-gray-900">
													{promo.coupon.name}
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="text-sm text-gray-500">
													{promo.coupon.percent_off} %
												</div>
											</td>

											<td className="px-6 py-4 whitespace-nowrap">
												<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
													{promo?.active ? 'Active' : 'Not-Active'}
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{moment.unix(promo.created).format('DD-MM-YYYY')}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				{/*Active promos end here*/}

				{/*Latest customers start here*/}
				<div className="-my-2 sm:-mx-6 lg:-mx-8 lg:col-span-8 sm:col-span-6">
					<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
						<h3 className="text-lg leading-6 font-medium text-gray-900 my-5">
							Latest 12 customers
						</h3>
						<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
							<table className="min-w-full table-fixed divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Full name
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
											Bundle type
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
											Created at
										</th>
										<th scope="col" className="relative px-6 py-3">
											<span className="sr-only">View</span>
										</th>
									</tr>
								</thead>
								<tbody className="bg-white table-fixed divide-y divide-gray-200">
									{statistics?.latestCustomers.map((customer) => (
										<tr key={customer._id}>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center">
													<div className="ml-4">
														<div className="text-sm font-medium text-gray-900">
															{customer.fullName}
														</div>
													</div>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="text-sm text-gray-900">
													{customer.email}
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="text-sm text-gray-500">
													{ToUpperFirst(customer?.bundleType)}
												</div>
											</td>

											<td className="px-6 py-4 whitespace-nowrap">
												<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
													{ToUpperFirst(customer?.status)}
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{moment(customer.createdAt).format('DD-MM-YYYY')}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												<Link
													to={`/customer${customer?._id}`}
													className="text-indigo-600 hover:text-indigo-900"
												>
													View
												</Link>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				{/*Latest customers end here*/}

				{role !== AdminRoles.SUPPORT && (
					<div className="-my-2 sm:-mx-6 lg:-mx-8 lg:col-span-8 sm:col-span-6">
						<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
							<h3 className="text-lg leading-6 font-medium text-gray-900 my-5">
								Latest 12 transactions
							</h3>
							<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
								<table className="min-w-full table-fixed divide-y divide-gray-200">
									<thead className="bg-gray-50">
										<tr>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Amount
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Fee
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Net
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												type
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
												Available on
											</th>
											<th
												scope="col"
												className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
											>
												Created at
											</th>
											<th scope="col" className="relative px-6 py-3">
												<span className="sr-only">View</span>
											</th>
										</tr>
									</thead>
									<tbody className="bg-white table-fixed divide-y divide-gray-200">
										{statistics?.latestTransactions.map((trans) => (
											<tr key={trans.id}>
												<td className="px-6 py-4 whitespace-nowrap">
													<div className="flex items-center">
														<div className="ml-4">
															<div className="text-sm font-medium text-gray-900">
																{(trans?.amount / 100).toFixed(2)} EUR
															</div>
														</div>
													</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<div className="text-sm text-gray-900">
														{(trans?.fee / 100).toFixed(2)} EUR
													</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<div className="text-sm text-gray-500">
														{(trans?.net / 100).toFixed(2)} EUR
													</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<span className={colorPaymentType(trans?.type)}>
														{ToUpperFirst(trans?.type)}
													</span>
												</td>
												<td className="px-6 py-4 whitespace-nowrap">
													<span className={colorPaymentStats(trans?.status)}>
														{ToUpperFirst(trans?.status)}
													</span>
												</td>

												<td className="px-6 py-4 whitespace-nowrap">
													<div className="text-sm text-gray-500">
														{moment
															.unix(trans?.available_on)
															.format('DD-MM-YYYY')}
													</div>
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{moment.unix(trans.created).format('DD-MM-YYYY')}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				)}
			</div>
		</Wrapper>
	)
}

export default Index
