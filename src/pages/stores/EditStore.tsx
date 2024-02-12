import React, {useEffect, useState} from 'react'
import {DraftEditor, Wrapper} from '../../components'
import {GetStores, editStore} from '../../services'

const EditStore = () => {
	const [store, setStore] = useState<GetStores.Store>()
	const [loading, setLoading] = useState(true)

	return (
		<></>
		// <Wrapper full={true} loading={loading}>
		// 	<div className="">
		// 		<div className="h-full rounded shadow p-5 my-5 max-w-5xl  space-y-5 bg-white">
		// 			<div className="space-y-2">
		// 				<label
		// 					htmlFor="title"
		// 					className="block text-sm font-medium text-gray-700"
		// 				>
		// 					Product Name
		// 				</label>
		// 				<input
		// 					type="text"
		// 					value={product.title}
		// 					onChange={handleChange}
		// 					id="title"
		// 					className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
		// 				/>
		// 			</div>

		// 			<div className="space-y-2 grid grid-cols-2">
		// 				<div>
		// 					<label
		// 						htmlFor="categories"
		// 						className="block text-sm font-medium text-gray-700"
		// 					>
		// 						Product Category
		// 					</label>
		// 					<select
		// 						value={product.category}
		// 						onChange={handleChange}
		// 						id="category"
		// 						className="block w-auto space-y-3 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
		// 					>
		// 						<option selected disabled hidden>
		// 							Select a category
		// 						</option>
		// 						{Categories.map((category, index) => {
		// 							return (
		// 								<option
		// 									className="px-2 py-1"
		// 									key={index}
		// 									value={category.value}
		// 								>
		// 									{category.label}
		// 								</option>
		// 							)
		// 						})}
		// 					</select>
		// 				</div>
		// 			</div>

		// 			<div className="space-y-2">
		// 				<label
		// 					htmlFor="description"
		// 					className="block text-sm font-medium text-gray-700"
		// 				>
		// 					Product description
		// 				</label>
		// 				<DraftEditor
		// 					data={product.description}
		// 					setData={handleChangeDescription}
		// 				/>
		// 			</div>

		// 			<div className="grid grid-cols-2 gap-x-4 max-w-lg mx-auto">
		// 				<button
		// 					className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
		// 					onClick={() => fetchProduct()}
		// 				>
		// 					Discard changes
		// 				</button>
		// 				<button
		// 					className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
		// 					onClick={handleSubmit}
		// 				>
		// 					Edit product
		// 				</button>
		// 			</div>
		// 		</div>
		// 		<ErrorToast
		// 			show={errorShow}
		// 			setShow={setErrorShow}
		// 			message={error}
		// 			title={'Something went wrong while editing the product'}
		// 		/>
		// 	</div>
		// </Wrapper>
	)
}

export default EditStore
