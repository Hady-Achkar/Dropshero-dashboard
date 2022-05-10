import React, {useState, useEffect, useCallback, Fragment} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {Wrapper} from '../../components'
import {IInfluencer, getInfluencerById, editInfluencer} from '../../services'
import classNames from 'classnames'
import {DraftEditor, ErrorToast, SuccessToast} from '../../components'
import {Categories} from '../../data'
import countries from '../../data/countries'
import {platform} from '../../data/platforms'

const EditInfluencer = () => {
	type Params = {
		influencerId: string
	}

	const initState: IInfluencer = {
		channelName: '',
		description: '',
		image: '',
		country: '',
		platform: '',
		category: '',
		followers: '',
		language: '',
		youtube: '',
		snapchat: '',
		instagram: '',
		tiktok: '',
	}

	const [mainData, setMainData] = useState(initState)
	const {influencerId} = useParams<Params>()
	const [loading, setLoading] = useState<boolean>(false)
	const [influencerData, setInfluencerData] = useState<IInfluencer>(initState)
	const [showSuccess, setShowSuccess] = useState(false)
	const history = useHistory()

	const [error, setError] = useState('')
	const [showError, setShowError] = useState(false)

	useEffect(() => {
		setLoading(true)
		getInfluencerById(influencerId)
			.then((res) => {
				setMainData(res?.data?.influencer)
				setInfluencerData(res?.data?.influencer)
				setLoading(false)
			})
			.catch((err) => {
				console.log(err)
			})
	}, [influencerId])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		editInfluencer(influencerId, influencerData)
			.then((res) => {
				setShowSuccess(true)
				history.push('/influencers')
			})
			.catch((err) => {
				setShowError(true)
				setError(err?.response?.data?.message)
			})
	}

	const handleChange = useCallback(
		(
			event: React.ChangeEvent<
				HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
			>
		) => {
			setInfluencerData((prevState) => ({
				...prevState,
				[event.target.id]: event.target.value,
			}))
		},
		[setInfluencerData]
	)

	const followersOptions = [
		'0-1K',
		'1K-10K',
		'10K-50K',
		'50K-200K',
		'200K-500K',
		'500K-999K',
		'<1M',
	]

	const sortedCountries = countries.sort((a: any, b: any) =>
		a.label > b.label ? 1 : -1
	)

	const handleChangeDescription = (content: string) => {
		setInfluencerData({...influencerData, description: content})
	}
	return (
		<Wrapper full loading={loading}>
			<div className=" sm:px-6 lg:px-0 lg:col-span-9">
				<form onSubmit={handleSubmit}>
					<div className="shadow sm:rounded-md sm:overflow-hidden mx-auto">
						<div className="bg-white py-3 px-4  sm:p-6 mx-auto">
							<div>
								<h3 className="text-lg leading-6 font-medium text-gray-900"></h3>
								<span className="px-2 inline-flex  text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800"></span>
							</div>
							<div className="grid grid-cols-4 gap-6">
								<div className="col-span-4">
									<label
										htmlFor="channelName"
										className="block text-sm font-medium text-gray-700"
									>
										Channel name
									</label>
									<div className="mt-1">
										<input
											id="channelName"
											onChange={handleChange}
											value={influencerData?.channelName}
											className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm px-3 py-2 border border-gray-300 rounded-md"
											placeholder="John Doe"
										/>
									</div>
								</div>
								<div className="col-span-2">
									<label
										htmlFor="language"
										className="block text-sm font-medium text-gray-700"
									>
										Language
									</label>
									<select
										id="language"
										onChange={handleChange}
										value={influencerData?.language}
										className="block w-full space-y-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									>
										<option selected disabled hidden>
											Select a language
										</option>
										<option className="px-2 py-1" value={'arabic'}>
											Arabic
										</option>
										<option className="px-2 py-1" value={'english'}>
											English
										</option>
										<option className="px-2 py-1" value={'german'}>
											German
										</option>
									</select>
								</div>
								<div className="col-span-2">
									<label
										htmlFor="fname"
										className="block text-sm font-medium text-gray-700"
									>
										Number of followers
									</label>
									<select
										id="followers"
										value={influencerData?.followers}
										onChange={handleChange}
										className="block w-full space-y-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									>
										<option selected disabled hidden>
											Select a range
										</option>
										{followersOptions.map((item, index) => {
											return (
												<option className="px-2 py-1" key={index} value={item}>
													{item}
												</option>
											)
										})}
									</select>
								</div>
								<div className="col-span-2">
									<label
										htmlFor="cateogry"
										className="block text-sm font-medium text-gray-700"
									>
										Category
									</label>
									<select
										id="category"
										value={influencerData?.category}
										onChange={handleChange}
										className="block w-full space-y-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
								<div className="col-span-2">
									<label
										htmlFor="platform"
										className="block text-sm font-medium text-gray-700"
									>
										Main Platform
									</label>
									<select
										id="platform"
										value={influencerData?.platform}
										onChange={handleChange}
										className="block w-full space-y-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									>
										<option selected disabled hidden>
											Select a platform
										</option>
										{platform.map((item, index) => {
											return (
												<option className="px-2 py-1" key={index} value={item}>
													{item}
												</option>
											)
										})}
									</select>
								</div>
								<div className="col-span-2">
									<label
										htmlFor="country"
										className="block text-sm font-medium text-gray-700"
									>
										Country
									</label>
									<select
										id="country"
										value={influencerData?.country}
										onChange={handleChange}
										className="block w-full space-y-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									>
										<option selected disabled hidden>
											Select a country
										</option>
										{sortedCountries.map((item, index) => {
											return (
												<option
													className="px-2 py-1"
													key={index}
													value={item.label}
												>
													{item.label}
												</option>
											)
										})}
									</select>
								</div>
								<div className="col-span-2" />
								<div className="col-span-2">
									<label
										htmlFor="youtube"
										className="block text-sm font-medium text-gray-700"
									>
										Youtube channel
									</label>
									<div className="mt-1">
										<input
											onChange={handleChange}
											value={influencerData?.youtube}
											id="youtube"
											className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm px-3 py-2 border border-gray-300 rounded-md"
										/>
									</div>
								</div>
								<div className="col-span-2">
									<label
										htmlFor="instagram"
										className="block text-sm font-medium text-gray-700"
									>
										Instagram channel
									</label>
									<div className="mt-1">
										<input
											onChange={handleChange}
											value={influencerData?.instagram}
											id="instagram"
											className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm px-3 py-2 border border-gray-300 rounded-md"
										/>
									</div>
								</div>
								<div className="col-span-2">
									<label
										htmlFor="tiktok"
										className="block text-sm font-medium text-gray-700"
									>
										TikTok channel
									</label>
									<div className="mt-1">
										<input
											onChange={handleChange}
											value={influencerData?.tiktok}
											id="tiktok"
											className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm px-3 py-2 border border-gray-300 rounded-md"
										/>
									</div>
								</div>
								<div className="col-span-2">
									<label
										htmlFor="snapchat"
										className="block text-sm font-medium text-gray-700"
									>
										Snapchat channel
									</label>
									<div className="mt-1">
										<input
											onChange={handleChange}
											value={influencerData?.snapchat}
											id="snapchat"
											className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm px-3 py-2 border border-gray-300 rounded-md"
										/>
									</div>
								</div>
								<div className="col-span-4">
									<label
										htmlFor="image"
										className="block text-sm font-medium text-gray-700"
									>
										Image Link
									</label>
									<div className="mt-1">
										<input
											onChange={handleChange}
											value={influencerData?.image}
											id="image"
											className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm px-3 py-2 border border-gray-300 rounded-md"
										/>
									</div>
								</div>
								<div className="col-span-4">
									<label
										htmlFor="description"
										className="block text-sm font-medium text-gray-700"
									>
										Description
									</label>
									<div className="mt-1">
										<DraftEditor
											data={influencerData?.description}
											setData={handleChangeDescription}
										/>
									</div>
								</div>
							</div>
						</div>
						<Fragment>
							<div className="flex items-center justify-end space-x-2 px-4 py-3 bg-gray-50 text-right sm:px-6">
								<button
									type={'button'}
									className={
										'border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 bg-gray-600  hover:bg-gray-700'
									}
									onClick={() => setInfluencerData(mainData)}
								>
									Discard
								</button>
								<button
									type="submit"
									className={classNames(
										'border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-indigo-600  hover:bg-indigo-700 cursor-pointer'
									)}
								>
									Confirm
								</button>
							</div>
						</Fragment>
					</div>
				</form>

				<SuccessToast
					show={showSuccess}
					setShow={setShowSuccess}
					title="Success!"
					message={`${influencerData?.channelName} was edited successfully`}
				/>
				<ErrorToast
					show={showError}
					setShow={setShowError}
					title="Error!"
					message={error}
				/>
			</div>
		</Wrapper>
	)
}

export default EditInfluencer
