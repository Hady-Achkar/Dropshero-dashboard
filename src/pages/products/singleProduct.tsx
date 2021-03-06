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
									?????? ????????????
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
										<span>?????? ??????????</span>
										<span className="font-sans">
											${product?.price?.selling?.min?.toFixed(2)} ~ $
											{product?.price?.selling?.max?.toFixed(2)}
										</span>
									</li>
									<li
										className={'grid grid-cols-2 text-base text-red-700  py-3'}
									>
										<span>?????? ???????????? </span>
										<span className="font-sans">
											${product?.price?.cost?.min?.toFixed(2)} ~ $
											{product?.price?.cost?.max?.toFixed(2)}
										</span>
									</li>

									<li
										className={'grid grid-cols-2 text-base text-green-600 py-3'}
									>
										<span>?????????? ????????????</span>
										<span className="font-sans">
											${product?.price?.profit?.min?.toFixed(2)} ~ $
											{product?.price?.profit?.max?.toFixed(2)}
										</span>
									</li>
								</ul>
							</div>
							<section className="my-6">
								<div>
									<h3>
										<span
											className={classNames(
												'text-sm font-medium text-gray-900'
											)}
										>
											???????????? ?????????????? ????????????
										</span>
									</h3>
									<div className="grid grid-cols-3 gap-3 mt-6">
										{product?.whereToSell.map((item) => (
											<div key={item}>
												<img
													src={findImage(item)}
													height="24"
													width="24"
													className="inline-flex mx-2"
													alt={`Drophero-where-to-sell-${product?.title}`}
												/>
												{item}
											</div>
										))}
									</div>
								</div>
							</section>

							<section className="mt-4">
								<div className="border-t divide-y divide-gray-200">
									<Disclosure as="div">
										{({open}) => (
											<>
												<h3>
													<Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
														<span
															className={classNames(
																open ? 'text-green-600' : 'text-gray-900',
																'text-sm font-medium'
															)}
														>
															???????? ????????????????
														</span>
														<span className="ml-6 flex items-center">
															{open ? (
																<MinusSmIcon
																	className="block h-6 w-6 text-green-400 group-hover:text-green-500"
																	aria-hidden="true"
																/>
															) : (
																<PlusSmIcon
																	className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
																	aria-hidden="true"
																/>
															)}
														</span>
													</Disclosure.Button>
												</h3>
												<Disclosure.Panel as="div" className="pb-6">
													<div
														dangerouslySetInnerHTML={{
															//@ts-ignore
															__html: product?.advertisementText,
														}}
													/>
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								</div>
							</section>

							<section aria-labelledby="details-heading" className="mt-4">
								<div className="border-t divide-y divide-gray-200">
									<Disclosure as="div">
										{({open}) => (
											<>
												<h3>
													<Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
														<span
															className={classNames(
																open ? 'text-green-600' : 'text-gray-900',
																'text-sm font-medium'
															)}
														>
															?????????? ??????????????????
														</span>
														<span className="ml-6 flex items-center">
															{open ? (
																<MinusSmIcon
																	className="block h-6 w-6 text-green-400 group-hover:text-green-500"
																	aria-hidden="true"
																/>
															) : (
																<PlusSmIcon
																	className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
																	aria-hidden="true"
																/>
															)}
														</span>
													</Disclosure.Button>
												</h3>
												<Disclosure.Panel as="div" className="pb-6">
													<div
														dangerouslySetInnerHTML={{
															//@ts-ignore
															__html: product?.competitorLinks,
														}}
													/>
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								</div>
							</section>

							<section aria-labelledby="details-heading" className="mt-4">
								<div className="border-t divide-y divide-gray-200">
									<Disclosure as="div">
										{({open}) => (
											<>
												<h3>
													<Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
														<span
															className={classNames(
																open ? 'text-green-600' : 'text-gray-900',
																'text-sm font-medium'
															)}
														>
															?????????????? ??????????????????
														</span>
														<span className="ml-6 flex items-center">
															{open ? (
																<MinusSmIcon
																	className="block h-6 w-6 text-green-400 group-hover:text-green-500"
																	aria-hidden="true"
																/>
															) : (
																<PlusSmIcon
																	className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
																	aria-hidden="true"
																/>
															)}
														</span>
													</Disclosure.Button>
												</h3>
												<Disclosure.Panel as="div" className="pb-6">
													<ul className="space-y-2 list-disc">
														{product?.marketingAngel.map((item, index) => {
															return (
																<li key={index}>
																	<p>{item}</p>
																</li>
															)
														})}
													</ul>
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								</div>
							</section>

							<section aria-labelledby="details-heading" className="mt-4">
								<div className="border-t divide-y divide-gray-200">
									<Disclosure as="div">
										{({open}) => (
											<>
												<h3>
													<Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
														<span
															className={classNames(
																open ? 'text-green-600' : 'text-gray-900',
																'text-sm font-medium'
															)}
														>
															?????????????? ????????????????
														</span>
														<span className="ml-6 flex items-center">
															{open ? (
																<MinusSmIcon
																	className="block h-6 w-6 text-green-400 group-hover:text-green-500"
																	aria-hidden="true"
																/>
															) : (
																<PlusSmIcon
																	className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
																	aria-hidden="true"
																/>
															)}
														</span>
													</Disclosure.Button>
												</h3>
												<Disclosure.Panel as="div" className="pb-6">
													<div
														dangerouslySetInnerHTML={{
															//@ts-ignore
															__html: product?.targets,
														}}
													/>
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								</div>
							</section>

							<section aria-labelledby="details-heading" className="mt-4">
								<div className="border-t divide-y divide-gray-200">
									<Disclosure as="div">
										{({open}) => (
											<>
												<h3>
													<Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
														<span
															className={classNames(
																open ? 'text-green-600' : 'text-gray-900',
																'text-sm font-medium'
															)}
														>
															???????????????? ????????????
														</span>
														<span className="ml-6 flex items-center">
															{open ? (
																<MinusSmIcon
																	className="block h-6 w-6 text-green-400 group-hover:text-green-500"
																	aria-hidden="true"
																/>
															) : (
																<PlusSmIcon
																	className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
																	aria-hidden="true"
																/>
															)}
														</span>
													</Disclosure.Button>
												</h3>
												<Disclosure.Panel as="div" className="pb-6">
													<ul className="space-y-2 list-disc">
														{product?.marketingVideo.map((item, index) => {
															return (
																<li key={index}>
																	<ReactPlayer
																		url={item}
																		width="100%"
																		height="auto"
																	/>
																</li>
															)
														})}
													</ul>
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								</div>
							</section>

							{/*Supplier links*/}
							<section className="mt-4">
								<div className="border-t divide-y divide-gray-200">
									<Disclosure as="div">
										{({open}) => (
											<>
												<h3>
													<Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
														<span
															className={classNames(
																open ? 'text-green-600' : 'text-gray-900',
																'text-sm font-medium'
															)}
														>
															?????????? ????????????????
														</span>
														<span className="ml-6 flex items-center">
															{open ? (
																<MinusSmIcon
																	className="block h-6 w-6 text-green-400 group-hover:text-green-500"
																	aria-hidden="true"
																/>
															) : (
																<PlusSmIcon
																	className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
																	aria-hidden="true"
																/>
															)}
														</span>
													</Disclosure.Button>
												</h3>
												<Disclosure.Panel as="div" className="pb-6">
													<ul className="list-disc">
														{product?.supplierLinks.map((item, index) => (
															<li className="px-2 text-base " key={item}>
																<a
																	target="_blank"
																	className="text-blue-700"
																	href={item}
																	rel="noreferrer"
																>
																	???????????? {index + 1}
																</a>
															</li>
														))}
													</ul>
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								</div>
							</section>
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
