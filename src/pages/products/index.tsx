import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {GetAllProducts, getAllProducts} from '../../services'
import {useFetch} from '../../hooks'
import {Wrapper} from '../../components'
import {ToUpperFirst} from '../../utils'

const Index = () => {
	const {fetchData, data, loading} =
		useFetch<GetAllProducts.RootObject>(getAllProducts)
	useEffect(() => {
		fetchData()
		return () => fetchData()
	}, [fetchData])
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
											Title
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Category
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Type
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Selling Price
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Cost Price
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Profit
										</th>
										<th scope="col" className="relative px-6 py-3">
											<span className="sr-only">Edit</span>
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{data?.products.map((item) => (
										<tr key={item?._id}>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="text-sm text-gray-900">
													{item?.title}
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="text-sm text-gray-900">
													{ToUpperFirst(item?.category)}
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-center">
												<div className="text-sm text-gray-500">
													{item.isHot ? (
														<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
															Hot
														</span>
													) : (
														<span className="px-2 inline-flex  text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
															Normal
														</span>
													)}
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{item?.price?.selling.min.toFixed(2)}$ -{' '}
												{item?.price?.selling.max.toFixed(2)}$
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{item?.price?.cost.min.toFixed(2)}$ -{' '}
												{item?.price?.cost.max.toFixed(2)}$
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{item?.price?.selling.min.toFixed(2)}$ -{' '}
												{item?.price?.selling.max.toFixed(2)}$
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
												<Link
													to={`/product/${item?._id}`}
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
			</div>
		</Wrapper>
	)
}
export default Index
