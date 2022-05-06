/* This example requires Tailwind CSS v2.0+ */
import type {FC} from 'react'
import React from 'react'
import {useSelector} from 'react-redux'
import {IStat} from '../../pages/home'
import {AppState} from '../../reducers'
import {AdminRoles} from '../../types'

interface IProps {
	stats: IStat[] | undefined
}

const Stats: FC<IProps> = (props) => {
	const {
		user: {role},
	} = useSelector((state: AppState) => state.auth)
	const {stats} = props
	return (
		<div>
			{role !== AdminRoles.SUPPORT && (
				<dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{stats &&
						stats.map((item, index) => (
							<div
								key={index}
								className="relative bg-white pt-5 px-4 pb-6 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
							>
								<dt>
									<div className="absolute bg-indigo-500 rounded-md p-3">
										<item.icon
											className="h-6 w-6 text-white"
											aria-hidden="true"
										/>
									</div>
									<p className="ml-16 text-sm font-medium text-gray-500 truncate">
										{item.name}
									</p>
								</dt>
								<dd className="ml-16 flex items-baseline">
									<p className="text-2xl font-semibold text-gray-900">
										{item.stat}
									</p>
								</dd>
							</div>
						))}
				</dl>
			)}
		</div>
	)
}
export default Stats
