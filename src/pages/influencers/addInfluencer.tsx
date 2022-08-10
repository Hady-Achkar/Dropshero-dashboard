import React, {Fragment, useState} from 'react'
import classNames from 'classnames'
import {DraftEditor, ErrorToast, SuccessToast} from '../../components'
import {Categories} from '../../data'
import countries from '../../data/countries'
import {platform} from '../../data/platforms'
import {addNewInfluencer, IInfluencer} from '../../services'
import {useHistory} from 'react-router-dom'
import {influencersCategories} from '../../data/influencersCategories'

const AddInfluencer = () => {
	const history = useHistory()
	const [showSuccess, setShowSuccess] = useState(false)

	const [error, setError] = useState('')
	const [showError, setShowError] = useState(false)
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		addNewInfluencer(influencerData)
			.then((res) => {
				setShowSuccess(true)
				history.push('/influencers')
			})
			.catch((err) => {
				setError(err?.response?.message)
				setShowError(true)
			})
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
	}

	const [influencerData, setInfluencerData] = useState<IInfluencer>(initState)

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setInfluencerData({...influencerData, [e.target.id]: e.target.value})
	}

	const handleChangeDescription = (content: string) => {
		setInfluencerData({...influencerData, description: content})
	}

	const sortedCountries = countries.sort((a: any, b: any) =>
		a.label > b.label ? 1 : -1
	)

	const isDisabled =
		influencerData.language === '' ||
		influencerData.channelName === '' ||
		influencerData.category === '' ||
		influencerData.description === '' ||
		influencerData.followers === '' ||
		influencerData.image === '' ||
		influencerData.platform === ''

	const followersOptions = [
		'0-1K',
		'1K-10K',
		'10K-50K',
		'50K-200K',
		'200K-500K',
		'500K-999K',
		'<1M',
	]

	return (
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
									onChange={handleChange}
									className="block w-full space-y-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
								>
									<option selected disabled hidden>
										Select a category
									</option>
									{influencersCategories.map((category, index) => {
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
								onClick={() => setInfluencerData(initState)}
							>
								Discard
							</button>
							<button
								type="submit"
								className={classNames(
									isDisabled
										? 'bg-gray-600 hover:bg-gray-700 cursor-not-allowed'
										: 'bg-indigo-600  hover:bg-indigo-700 cursor-pointer',
									'border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 '
								)}
							>
								Save
							</button>
						</div>
					</Fragment>
				</div>
			</form>

			<SuccessToast
				show={showSuccess}
				setShow={setShowSuccess}
				title="Success!"
				message="Influencer was added successfully"
			/>
			<ErrorToast
				show={showError}
				setShow={setShowError}
				title="Error!"
				message={error}
			/>
		</div>
	)
}

export default AddInfluencer
