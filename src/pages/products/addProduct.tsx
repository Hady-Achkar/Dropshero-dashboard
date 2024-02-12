import React, {useCallback, useState} from 'react'
import {DraftEditor, ErrorToast, Uploader} from '../../components'
import {Socials} from '../../constants'
import {IAddProduct} from '../../types'
import {Categories} from '../../data'
import ReactPlayer from 'react-player'
import {addNewProduct} from '../../services'
import {useHistory} from 'react-router-dom'
import {ExternalLinkIcon, FireIcon} from '@heroicons/react/outline'
import {ToUpperFirst} from '../../utils'

const Index = () => {
	const history = useHistory()
	const initState: IAddProduct = {
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
		},
		category: '',
		isHot: false,
	}
	const [product, setProduct] = useState<IAddProduct>(initState)
	const [error, setError] = useState<string>('')
	const [errorShow, setErrorShow] = useState<boolean>(false)
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

	const [supplier, setSupplier] = useState<string>('')
	const [video, setVideo] = useState<string>('')
	const [angle, setAngle] = useState<string>('')

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
					//@ts-ignore
					...prevState.price[e.target.name],
					[e.target.id]: e.target.value,
				},
			},
		}))
	}

	const handleChangeSellings = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			setProduct((prevState) => ({
				...prevState,
				//@ts-ignore
				[e.target.name]: [...prevState[e.target.name], e.target.value],
			}))
		} else {
			setProduct((prevState) => ({
				...prevState,
				//@ts-ignore
				[e.target.name]: prevState[e.target.name].filter(
					(item: string) => item !== e.target.value
				),
			}))
		}
	}

	const handleSubmit = () => {
		addNewProduct(product)
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
	}

	const handleChangeDescription = (content: string) => {
		setProduct((prevState) => ({
			...prevState,
			description: content,
		}))
	}

	const handleChangeAdvertisementText = (content: string) => {
		setProduct((prevState) => ({
			...prevState,
			advertisementText: content,
		}))
	}

	const handleChangeCompetitorLinks = (content: string) => {
		setProduct((prevState) => ({
			...prevState,
			competitorLinks: content,
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

	const handleChangeTargets = (content: string) => {
		setProduct((prevState) => ({
			...prevState,
			targets: content,
		}))
	}

	return (
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
					<label
						htmlFor="thumbnail"
						className="block text-sm font-medium text-gray-700"
					>
						Product Image
					</label>
					<input
						type="text"
						value={product.thumbnail}
						onChange={handleChange}
						id="thumbnail"
						className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
					/>
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
							onChange={handleChange}
							id="category"
							className="block w-auto space-y-3 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
						>
							<option selected disabled hidden>
								Select a category
							</option>
							<option className="px-2 py-1" value={'tested'}>
								Tested Product
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
								Hot product{' '}
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

				<div>
					<button
						className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
						onClick={handleSubmit}
					>
						Confirm and Add Product
					</button>
				</div>
			</div>
			<ErrorToast
				show={errorShow}
				setShow={setErrorShow}
				message={error}
				title={'Something went wrong while adding the product'}
			/>
		</div>
	)
}

export default Index
