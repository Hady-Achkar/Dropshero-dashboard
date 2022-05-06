import React, {useCallback, useEffect, useRef, useState} from "react";
import {editProfile, GetMyProfile, getMyProfile} from "../../services";
import {ProfileSidebar} from "../../components";
import {useUpload} from "../../hooks";
import {editProfileStore} from "../../actions";
import {useDispatch} from "react-redux";
import {AdminRoles} from "../../types";


//@ts-ignore
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Index = () => {

    const [profileData, setProfileData] = useState<GetMyProfile.Admin>({
        image: '',
        role: AdminRoles.SUPER,
        _id: '',
        email: '',
        fullName: '',
        createdAt: new Date(),
        updatedAt: new Date()
    })
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch()
    const {handleUpload, uploadProgress, isUploaded} = useUpload()
    const fetchProfile = useCallback(() => {
        setLoading(true)
        getMyProfile().then(res => {
            setProfileData(res?.data?.admin)
            dispatch(editProfileStore({fullName: res?.data?.admin.fullName, image: res?.data?.admin.image}))
            setLoading(false)
        }).catch(err => {
            if (err.response) {
                console.log(err.response.data)
            } else {
                console.log(err)
            }
        })
    }, [dispatch])
    useEffect(() => {
        fetchProfile()
        return () => fetchProfile()
    }, [fetchProfile])
    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setProfileData(prevState => ({
            ...prevState,
            [event.target.id]: event.target.value
        }))
    }, [])
    const fileInputRef = useRef<HTMLInputElement>()
    const handleOpenUpload = useCallback(() => {
        fileInputRef.current?.click()
    }, [])
    const handleStartUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        handleUpload(event)?.then(file => {
            setProfileData(prevState => ({
                ...prevState,
                image: file
            }))
        })
    }, [handleUpload])
    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault()
        setLoading(true)
        const {image, fullName} = profileData
        editProfile({image, fullName}).then(res => {
            fetchProfile()
        }).catch(err => {
            if (err.response) {
                console.log(err.response.data)
            } else {
                console.log(err)
            }
        })
    }, [fetchProfile, profileData])
    const isDisabled = Boolean(!isUploaded || profileData?.fullName === '')
    return (
        <ProfileSidebar loading={loading} tabIndex={0}>
            <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
                <form onSubmit={handleSubmit}>
                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                        <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Profile</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    This information will be displayed publicly so be careful what you share.
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-3 sm:col-span-2">
                                    <label htmlFor="company-website"
                                           className="block text-sm font-medium text-gray-700">
                                        Email Address
                                    </label>
                                    <span
                                        className="bg-gray-50 border mt-1 border-gray-300 py-2 px-3 inline-flex items-center text-gray-500 sm:text-sm block rounded-lg border-gray-300 select-none">
                                        {profileData?.email}
                                    </span>
                                </div>

                                <div className="col-span-3">
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                                        Full name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="fullName"
                                            name="fullName"
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm px-3 py-2 border border-gray-300 rounded-md"
                                            placeholder="John Doe"
                                            onChange={handleChange}
                                            value={profileData?.fullName}

                                        />
                                    </div>
                                </div>

                                <div className="col-span-3">
                                    <label className="block text-sm font-medium text-gray-700">Photo</label>
                                    <div className="mt-1 w-full flex items-center">
                                                <span
                                                    className="inline-block bg-gray-100 rounded-md overflow-hidden">
                                                        <img src={profileData?.image}
                                                             alt={`Dropshero-admin-${profileData?.fullName}`}
                                                             className={'w-16 h-16 object-cover'}/>
                                                     </span>
                                        <button
                                            onClick={handleOpenUpload}
                                            type="button"
                                            className="ml-5 bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Change
                                        </button>
                                        {/*@ts-ignore*/}
                                        <input type={'file'} ref={fileInputRef} hidden id={'image'}
                                               onChange={handleStartUpload}/>
                                        {!isUploaded && parseInt(uploadProgress) > 0 &&
                                            <div className="w-full bg-gray-200 h-1 mx-8">
                                                <div className="bg-blue-600 h-1 " style={{width: uploadProgress}}/>
                                            </div>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className="flex items-center justify-end space-x-2 px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                                type={'button'}
                                onClick={() => fetchProfile()}
                                className={'border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-indigo-600  hover:bg-indigo-700'}
                            >
                                Discard
                            </button>
                            <button
                                type="submit"
                                disabled={isDisabled}
                                className={classNames(isDisabled ? 'bg-gray-600 hover:bg-gray-700 cursor-not-allowed' : 'bg-indigo-600  hover:bg-indigo-700 cursor-pointer', 'border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ')}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </ProfileSidebar>
    )
}
export default Index
