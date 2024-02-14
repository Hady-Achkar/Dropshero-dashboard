import React, {useCallback, useEffect, useState} from 'react'
import {DraftEditor, ErrorToast, Uploader, Wrapper} from '../../components'
import {IProduct} from '../../types'
import {Categories} from '../../data'
import {editProduct, getSingleProduct} from '../../services'
import {useHistory, useParams} from 'react-router-dom'
import {ToUpperFirst} from '../../utils'
import {FireIcon} from '@heroicons/react/outline'

type Params = {
	productId: string
}
const Index = () => {
	const history = useHistory()
	const initState: IProduct = {
		_id: '',
		title: '',
		thumbnail: '',
		description: '',
		price: {
			cost: {
				min: 0,
				max: 0,
			},
			selling: {
				min: 0,
				max: 0,
			},
			profit: {
				min: 0,
				max: 0,
			},
		},
		category: Categories[0].value,
		isHot: false,
		createdAt: new Date(),
		updatedAt: new Date(),
	}
	const [product, setProduct] = useState<IProduct>(initState)
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>('')
	const [errorShow, setErrorShow] = useState<boolean>(false)
	const {productId} = useParams<Params>()
	const fetchProduct = useCallback(() => {
		setLoading(true)
		getSingleProduct(productId)
			.then((res) => {
				setProduct(res?.data?.product)
				setLoading(false)
			})
			.catch((err) => {
				if (err.response) {
					console.log(err.response.data)
				} else {
					console.log(err)
				}
			})
	}, [productId])
	useEffect(() => {
		if (!productId) {
			history.push('/404')
		} else {
			fetchProduct()
		}
		return () => fetchProduct()
	}, [fetchProduct, history, productId])

	const handleChange = useCallback(
		(
			event: React.ChangeEvent<
				HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
			>
		) => {
			setProduct((prevState) => ({
				...prevState,
				[event.target.id]: event.target.value,
			}))
		},
		[setProduct]
	)

	const handleDeleteThumbnail = () => {
		setProduct((prevState) => ({
			...prevState,
			thumbnail: '',
		}))
	}

	const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProduct((prevState) => ({
			...prevState,
			price: {
				...prevState.price,
				[e.target.name]: {
					// @ts-ignore
					...prevState.price[e.target.name],
					[e.target.id]: e.target.value,
				},
			},
		}))
	}

	const handleSubmit = () => {
		setLoading(true)
		editProduct(product)
			.then((res) => {
				history.push(`/product/${res?.data.productId}`)
			})
			.catch((err) => {
				if (err.response) {
					console.log(err.response.data.errors[0])
					const message = ToUpperFirst(err.response.data.errors[0].name)
					if (message) setError(message)
					setErrorShow(true)
				} else {
					console.log(err)
				}
			})
			.finally(() => setLoading(false))
	}
	const handleChangeDescription = (content: string) => {
		setProduct((prevState) => ({
			...prevState,
			description: content,
		}))
	}

	const handleChangeImage = (filePath: string, name: string) => {
		setProduct((prevState) => ({
			...prevState,
			[name]: filePath,
		}))
	}

	const handleChangeHotSell = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProduct((prevState) => ({
			...prevState,
			isHot: e.target.checked,
		}))
	}

	console.log(product)
	return (
		<Wrapper full={true} loading={loading}>
			<div className="">
				<div className="h-full rounded shadow p-5 my-5 max-w-5xl  space-y-5 bg-white">
					<div className="space-y-2">
						<label
							htmlFor="title"
							className="block text-sm font-medium text-gray-700"
						>
							Product Name
						</label>
						<input
							type="text"
							value={product.title}
							onChange={handleChange}
							id="title"
							className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
						/>
					</div>

					<div className="space-y-2">
						<label className="block text-sm font-medium text-gray-700">
							Main Image
						</label>
						{product?.thumbnail === '' && (
							<Uploader
								cb={handleChangeImage}
								accept={'image'}
								name={'thumbnail'}
							/>
						)}
						{product?.thumbnail !== '' && (
							<div
								style={{
									position: 'relative',
								}}
							>
								<img
									src={product?.thumbnail}
									style={{
										width: '250',
										borderRadius: '4px',
									}}
									alt={`Drops-hero ${product?.thumbnail}`}
								/>
								<svg
									style={{
										position: 'absolute',
										right: 10,
										top: 10,
									}}
									onClick={handleDeleteThumbnail}
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 cursor-pointer"
									fill="#fff"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
						)}
					</div>

					<div className="space-y-2 grid grid-cols-2">
						<div>
							<label
								htmlFor="categories"
								className="block text-sm font-medium text-gray-700"
							>
								Product Category
							</label>
							<select
								value={product.category}
								onChange={handleChange}
								id="category"
								className="block w-auto space-y-3 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
							>
								<option selected disabled hidden>
									Select a category
								</option>
								{Categories.map((category, index) => {
									return (
										<option
											className="px-2 py-1"
											key={index}
											value={category.value}
										>
											{category.label}
										</option>
									)
								})}
							</select>
						</div>
						<div className="relative flex items-center">
							<div className="mr-3 text-sm">
								<label htmlFor="isHot" className="font-medium text-gray-700">
									<FireIcon className="h-5 w-5 text-red-500 inline-flex items-center" />
									Seasonal product{' '}
								</label>
							</div>
							<div className="flex items-center h-5">
								<input
									onChange={handleChangeHotSell}
									checked={product.isHot}
									id="isHot"
									type="checkbox"
									className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
								/>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-3 mt-3 ">
						<div className="space-y-2">
							<label
								htmlFor="min-selling"
								className="block text-sm font-medium text-gray-700"
							>
								Min. selling price
							</label>
							<input
								id="min"
								min="0"
								value={product.price.selling.min}
								onChange={handleChangePrice}
								name="selling"
								type="text"
								className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
							/>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="min-selling"
								className="block text-sm font-medium text-gray-700"
							>
								Max. selling price
							</label>
							<input
								id="max"
								min="0"
								value={product.price.selling.max}
								onChange={handleChangePrice}
								name="selling"
								type="text"
								className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
							/>
						</div>
						<div className="space-y-2">
							<label
								htmlFor="min-selling"
								className="block text-sm font-medium text-gray-700"
							>
								Min. product cost
							</label>
							<input
								id="min"
								min="0"
								value={product.price.cost.min}
								onChange={handleChangePrice}
								name="cost"
								type="text"
								className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
							/>
						</div>
						<div className="space-y-2">
							<label
								htmlFor="min-selling"
								className="block text-sm font-medium text-gray-700"
							>
								Max. product cost
							</label>
							<input
								id="max"
								value={product.price.cost.max}
								min="0"
								onChange={handleChangePrice}
								name="cost"
								type="text"
								className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
							/>
						</div>
					</div>

					<div className="space-y-2">
						<label
							htmlFor="description"
							className="block text-sm font-medium text-gray-700"
						>
							Product description
						</label>
						<DraftEditor
							data={product.description}
							setData={handleChangeDescription}
						/>
					</div>

					<div className="grid grid-cols-2 gap-x-4 max-w-lg mx-auto">
						<button
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
							onClick={() => fetchProduct()}
						>
							Discard changes
						</button>
						<button
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
							onClick={handleSubmit}
						>
							Save edits
						</button>
					</div>
				</div>
				<ErrorToast
					show={errorShow}
					setShow={setErrorShow}
					message={error}
					title={'Something went wrong while editing the product'}
				/>
			</div>
		</Wrapper>
	)
}

export default Index
