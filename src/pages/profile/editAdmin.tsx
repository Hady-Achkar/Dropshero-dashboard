import React, {Fragment, useCallback, useEffect, useRef, useState} from 'react'
import {ErrorToast, ProfileSidebar} from '../../components'
import {editAdmin, getSingleAdmin, IAddAdmin} from '../../services'
import {useUpload} from '../../hooks'
import {useHistory, useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {AppState} from '../../reducers'
import {AdminRoles} from '../../types'
import {ToUpperFirst} from "../../utils";

//@ts-ignore
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

type Params = {
    adminId: string
}
const Index = () => {
    const {adminId} = useParams<Params>()
    const history = useHistory()
    const [error, setError] = useState<string>('')
    const [errorShow, setErrorShow] = useState<boolean>(false)
    const {role} = useSelector((state: AppState) => state.auth.user)
    const fetchAdmin = useCallback(() => {
        setLoading(true)
        getSingleAdmin(adminId)
            .then((res) => {
                setAdminData({
                    ...res?.data?.admin,
                    password: '',
                    confirmPassword: '',
                })
                setLoading(false)
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err.response.data)
                } else {
                    console.log(err)
                }
            })
    }, [adminId])
    useEffect(() => {
        if (!adminId) {
            history.push('/404')
        } else {
            fetchAdmin()
        }
        return () => fetchAdmin()
    }, [adminId, fetchAdmin, history])
    const [loading, setLoading] = useState<boolean>(false)
    const initState: IAddAdmin = {
        email: '',
        password: '',
        fullName: '',
        role: '',
        image: 'https://source.unsplash.com/random',
        confirmPassword: '',
    }
    const [passwordShown, setPasswordShown] = useState<boolean>(false)
    const [confirmPasswordShown, setConfirmPasswordShown] =
        useState<boolean>(false)
    const [adminData, setAdminData] = useState<IAddAdmin>(initState)
    const fileInputRef = useRef<HTMLInputElement>()
    const {handleUpload, uploadProgress, isUploaded} = useUpload()

    const handleOpenUpload = useCallback(() => {
        fileInputRef.current?.click()
    }, [])
    const handleStartUpload = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            handleUpload(event)?.then((file) => {
                setAdminData((prevState) => ({
                    ...prevState,
                    image: file,
                }))
            })
        },
        [handleUpload]
    )
    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            setAdminData((prevState) => ({
                ...prevState,
                [event.target.id]: event.target.value,
            }))
        },
        []
    )
    const handleSubmit = useCallback(
        (event: React.FormEvent) => {
            event.preventDefault()
            setLoading(true)
            editAdmin(adminData, adminId)
                .then((res) => {
                    fetchAdmin()
                })
                .catch((err) => {
                    if (err.response) {
                        console.log(err.response.data.errors[0])
                        const message = ToUpperFirst(err.response.data.errors[0].name)
                        if (message)
                            setError(message)
                        setErrorShow(true)
                        setLoading(false)
                    } else {
                        console.log(err)
                    }
                })
        },
        [adminData, adminId, fetchAdmin]
    )
    const isDisabled = Boolean(
        adminData.confirmPassword !== adminData.password ||
        adminData.fullName === '' ||
        adminData.role === '' ||
        adminData.email === ''
    )
    console.log(adminData)
    const handleTogglePasswordShown = useCallback(() => {
        setPasswordShown((prevState) => !prevState)
    }, [])
    const handleToggleConfirmShown = useCallback(() => {
        setConfirmPasswordShown((prevState) => !prevState)
    }, [])
    const isOwner = Boolean(role === AdminRoles.OWNER)
    return (
        <ProfileSidebar loading={loading} tabIndex={3}>
            <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
                <form onSubmit={handleSubmit}>
                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                        <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    Profile
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    This information will be displayed publicly so be careful what
                                    you share.
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-3">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Photo
                                    </label>
                                    <div className="mt-1 w-full flex items-center">
										<span className="inline-block bg-gray-100 rounded-md overflow-hidden">
											<img
                                                src={adminData?.image}
                                                alt={`Dropshero-admin-${adminData?.fullName}`}
                                                className={'w-16 h-16 object-cover'}
                                            />
										</span>
                                        {isOwner && (
                                            <button
                                                onClick={handleOpenUpload}
                                                type="button"
                                                className="ml-5 bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Change
                                            </button>
                                        )}
                                        <input
                                            type={'file'}
                                            //@ts-ignore
                                            ref={fileInputRef}
                                            hidden
                                            id={'image'}
                                            onChange={handleStartUpload}
                                        />
                                        {!isUploaded && parseInt(uploadProgress) > 0 && (
                                            <div className="w-full bg-gray-200 h-1 mx-8">
                                                <div
                                                    className="bg-blue-600 h-1 "
                                                    style={{width: uploadProgress}}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-span-3 sm:col-span-2">
                                    <label htmlFor="company-website"
                                           className="block text-sm font-medium text-gray-700">
                                        Email Address
                                    </label>
                                    <span
                                        className="bg-gray-50 border w-full mt-1 border-gray-300 py-2 px-3 inline-flex items-center text-gray-500 sm:text-sm block rounded-lg border-gray-300 select-none">
                                        {adminData?.email}
                                    </span>
                                </div>

                                <div className="col-span-2">
                                    <label
                                        htmlFor="fullName"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Full name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="fullName"
                                            name="fullName"
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm px-3 py-2 border border-gray-300 rounded-md"
                                            placeholder="John Doe"
                                            onChange={handleChange}
                                            disabled={!isOwner}
                                            value={adminData?.fullName}
                                        />
                                    </div>
                                </div>

                                <div className="col-span-2">
                                    <label
                                        htmlFor="role"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Role
                                    </label>
                                    <div className="mt-1">
                                        <select
                                            id="role"
                                            name="role"
                                            onChange={handleChange}
                                            value={adminData?.role}
                                            disabled={!isOwner}
                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                        >
                                            <option selected disabled hidden>
                                                Select Admin role
                                            </option>
                                            <option value={AdminRoles.SUPER}>Super admin</option>
                                            <option value={AdminRoles.SUPPORT}>Support admin</option>
                                            <option value={AdminRoles.OWNER}>Owner</option>
                                        </select>
                                    </div>
                                </div>

                                {isOwner && (
                                    <Fragment>
                                        <div className="col-span-3 sm:col-span-2">
                                            <label
                                                htmlFor="password"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Password
                                            </label>
                                            <div className={'flex items-center relative'}>
                                                <input type={'hidden'} value={'asdasd'}/>
                                                <input
                                                    id="password"
                                                    name="password"
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm px-3 py-2 border border-gray-300 rounded-md"
                                                    placeholder="Password"
                                                    onChange={handleChange}
                                                    type={passwordShown ? 'text' : 'password'}
                                                    value={adminData?.password}
                                                    autoComplete={'off'}
                                                />
                                                {!passwordShown ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6 cursor-pointer"
                                                        fill="none"
                                                        onClick={handleTogglePasswordShown}
                                                        style={{
                                                            position: 'absolute',
                                                            right: 5,
                                                        }}
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="1.5"
                                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="1.5"
                                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6 cursor-pointer"
                                                        fill="none"
                                                        onClick={handleTogglePasswordShown}
                                                        style={{
                                                            position: 'absolute',
                                                            right: 5,
                                                        }}
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                                        />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-span-3 sm:col-span-2">
                                            <label
                                                htmlFor="confirmPassword"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Confirm password
                                            </label>
                                            <div className="mt-1">
                                                <div className={'flex items-center relative'}>
                                                    <input
                                                        id="confirmPassword"
                                                        name="confirmPassword"
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm px-3 py-2 border border-gray-300 rounded-md"
                                                        placeholder="Confirm password"
                                                        onChange={handleChange}
                                                        type={confirmPasswordShown ? 'text' : 'password'}
                                                        value={adminData.confirmPassword}
                                                    />
                                                    {!confirmPasswordShown ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-6 w-6 cursor-pointer"
                                                            fill="none"
                                                            onClick={handleToggleConfirmShown}
                                                            style={{
                                                                position: 'absolute',
                                                                right: 5,
                                                            }}
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="1.5"
                                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                            />
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="1.5"
                                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            style={{
                                                                position: 'absolute',
                                                                right: 5,
                                                            }}
                                                            className="h-6 w-6 cursor-pointer"
                                                            fill="none"
                                                            onClick={handleToggleConfirmShown}
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                                            />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Fragment>
                                )}
                            </div>
                        </div>
                        {isOwner && (
                            <Fragment>
                                <div
                                    className="flex items-center justify-end space-x-2 px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type={'button'}
                                        onClick={() => setAdminData(initState)}
                                        className={
                                            'border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 bg-indigo-600  hover:bg-indigo-700'
                                        }
                                    >
                                        Discard
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isDisabled}
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
                        )}
                    </div>
                </form>
                <ErrorToast show={errorShow} setShow={setErrorShow} message={error}
                            title={'Something went wrong while editing the admin'}/>
            </div>
        </ProfileSidebar>
    )
}
export default Index
