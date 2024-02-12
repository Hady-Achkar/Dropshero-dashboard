import React, {useCallback, useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {IProduct} from '../../types'
import {Disclosure} from '@headlessui/react'
import {
	MinusSmIcon,
	PlusSmIcon,
	ArchiveIcon,
	TrashIcon,
} from '@heroicons/react/outline'
import {Socials} from '../../constants'
import ReactPlayer from 'react-player'
import {archiveProduct, getSingleProduct} from '../../services'
import {ConfirmationModal, ErrorToast, Wrapper} from '../../components'
import {ToUpperFirst} from '../../utils'

type Params = {
	productId: string
}

//@ts-ignore
function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const Index = () => {
	const {productId} = useParams<Params>()
	const history = useHistory()
	const [product, setProduct] = useState<IProduct>()
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>('')
	const [errorShow, setErrorShow] = useState<boolean>(false)
	const [archiveConfirmationModalOpen, setArchiveConfirmationModalOpen] =
		useState<boolean>(false)

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

	const findImage = (item: string) => {
		return Socials.find((i) => i.name === item)?.src
	}
	const handleNavigate = useCallback(() => {
		history.push(`/edit-product/${productId}`)
	}, [history, productId])
	const handleArchive = useCallback(() => {
		archiveProduct(productId)
			.then((res) => {
				fetchProduct()
				setArchiveConfirmationModalOpen(false)
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
	}, [fetchProduct, productId])
	return (
		<Wrapper full loading={loading}>
			<div className="bg-white arabic">
				<div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
					<div className={'grid grid-cols-2 gap-x-3 max-w-sm'}>
						<button
							className="flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 my-2"
							onClick={() => {
								setArchiveConfirmationModalOpen(true)
							}}
						>
							<TrashIcon className="h-4 w-4 ml-2" />
							Archive product
						</button>

						<button
							className="flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 my-2"
							onClick={handleNavigate}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-4 w-4 ml-2"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
								/>
							</svg>
							Edit product
						</button>
					</div>
					<div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
						<div className="flex flex-col">
							<img
								src={product?.thumbnail}
								alt={`${product?.title}-Dropshero`}
								className="w-full h-full object-center object-cover sm:rounded-lg shadow-sm"
							/>
							{/* Description */}
							<section className="mt-4">
								<span className={'text-sm font-medium text-gray-900'}>
									وصف المنتج
								</span>
								<div
									className={'mt-8'}
									dangerouslySetInnerHTML={{
										//@ts-ignore
										__html: product?.description,
									}}
								/>
							</section>
						</div>
						{/* Product info */}
						<div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
							<h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mt-8">
								{product?.title}
							</h1>
							<div className={'mt-3 bg-slate-50 shadow rounded-xl px-3'}>
								<h2 className="sr-only">Product information</h2>
								<ul className="list-disc">
									<li
										className={'grid grid-cols-2 text-base text-gray-900  py-3'}
									>
										<span>سعر البيع</span>
										<span className="font-sans">
											${product?.price?.selling?.min?.toFixed(2)} ~ $
											{product?.price?.selling?.max?.toFixed(2)}
										</span>
									</li>
									<li
										className={'grid grid-cols-2 text-base text-red-700  py-3'}
									>
										<span>سعر الشراء </span>
										<span className="font-sans">
											${product?.price?.cost?.min?.toFixed(2)} ~ $
											{product?.price?.cost?.max?.toFixed(2)}
										</span>
									</li>

									<li
										className={'grid grid-cols-2 text-base text-green-600 py-3'}
									>
										<span>الربح الصافي</span>
										<span className="font-sans">
											${product?.price?.profit?.min?.toFixed(2)} ~ $
											{product?.price?.profit?.max?.toFixed(2)}
										</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<ConfirmationModal
					title={'Archive Product'}
					text={
						'Are you sure you want to archvie this product? Archived product will not apear to users'
					}
					variant={'Warning'}
					open={archiveConfirmationModalOpen}
					buttonText={'Archive'}
					action={handleArchive}
					setOpen={setArchiveConfirmationModalOpen}
				/>
				<ErrorToast
					show={errorShow}
					setShow={setErrorShow}
					message={error}
					title={'Something went wrong while archiving/unarchiving the product'}
				/>
			</div>
		</Wrapper>
	)
}
export default Index
