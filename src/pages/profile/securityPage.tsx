import React, {useCallback, useState} from "react";
import {editProfile} from "../../services";
import {ProfileSidebar} from "../../components";


//@ts-ignore
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Index = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [passwordShown, setPasswordShown] = useState<boolean>(false)
    const [confirmPasswordShown, setConfirmPasswordShown] = useState<boolean>(false)

    const handleSubmit = useCallback((event: React.FormEvent) => {
        event.preventDefault()
        setLoading(true)
        editProfile({password}).then(() => {
            setLoading(false)
        }).catch(err => {
            if (err.response) {
                console.log(err.response.data)
            } else {
                console.log(err)
            }
        })
    }, [password])
    const isDisabled = Boolean(password === '' || confirmPassword === '' || confirmPassword !== password)
    const handleTogglePasswordShown = useCallback(() => {
        setPasswordShown(prevState => !prevState)
    }, [])
    const handleToggleConfirmShown = useCallback(() => {
        setConfirmPasswordShown(prevState => !prevState)
    }, [])
    return (
        <ProfileSidebar loading={loading} tabIndex={1}>
            <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
                <form onSubmit={handleSubmit}>
                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                        <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Security</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    This information will be displayed publicly so be careful what you share.
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-3 sm:col-span-2">
                                    <label htmlFor="password"
                                           className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div className={'flex items-center relative'}>
                                        <input type={'hidden'} value={'asdasd'}/>
                                        <input
                                            id="password"
                                            name="password"
                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm px-3 py-2 border border-gray-300 rounded-md"
                                            placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            type={passwordShown ? 'text' : 'password'}
                                            value={password}
                                            autoComplete={'off'}
                                        />
                                        {!passwordShown ?
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer"
                                                 fill="none"
                                                 onClick={handleTogglePasswordShown}
                                                 style={{
                                                     position: 'absolute',
                                                     right: 5,
                                                 }}
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                            </svg> :
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer"
                                                 fill="none"
                                                 onClick={handleTogglePasswordShown}
                                                 style={{
                                                     position: 'absolute',
                                                     right: 5,
                                                 }}
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                                            </svg>
                                        }
                                    </div>

                                </div>

                                <div className="col-span-3 sm:col-span-2">
                                    <label htmlFor="confirmPassword"
                                           className="block text-sm font-medium text-gray-700">
                                        Confirm password
                                    </label>
                                    <div className="mt-1">
                                        <div className={'flex items-center relative'}>
                                            <input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm px-3 py-2 border border-gray-300 rounded-md"
                                                placeholder="Confirm password"
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                type={confirmPasswordShown ? 'text' : 'password'}
                                                value={confirmPassword}
                                            />
                                            {!confirmPasswordShown ?
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     className="h-6 w-6 cursor-pointer" fill="none"
                                                     onClick={handleToggleConfirmShown}
                                                     style={{
                                                         position: 'absolute',
                                                         right: 5,
                                                     }}
                                                     viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          strokeWidth="1.5"
                                                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          strokeWidth="1.5"
                                                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                                </svg> :
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     style={{
                                                         position: 'absolute',
                                                         right: 5,
                                                     }}
                                                     className="h-6 w-6 cursor-pointer" fill="none"
                                                     onClick={handleToggleConfirmShown}
                                                     viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          strokeWidth="2"
                                                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                                                </svg>
                                            }
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className="flex items-center justify-end space-x-2 px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                                type={'button'}
                                onClick={() => {
                                    setConfirmPassword('')
                                    setPassword('')
                                }}
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
