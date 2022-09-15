import React, { useMemo, useState } from 'react';
import { ToastContainer, toast, ToastContent, TypeOptions, ToastContentProps, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useHistory } from 'react-router-dom';
import { useCallback } from 'react';
import { addNewUsersFromExcel } from '../../services';

const AddNewUserFromExcel = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState<any>("");
    const [isFile, setIsFile] = useState<any>(false);
    const [loading, setLoading] = useState<boolean>(false)
    const history = useHistory()

    const formData = useMemo(()=> new FormData(), [])
    formData.append("excel", selectedFile);

    const handleSend = useCallback(
        (event: React.FormEvent) => {
            event.preventDefault()

            if (isFile) {
                setLoading(true)
                addNewUsersFromExcel(formData).then(() => {

                    notifyToast("success", "Uploaded successfully");
                })
                    .then(() => {
                        setShowModal(false)
                        setLoading(false)
                        setTimeout(() => { history.push(`/users`) }, 3000)
                    })
                    .catch((err) => {
                        notifyToast("error", "Error")
                        setLoading(false)
                        if (err.response) {
                            console.log(err.response)
                        } else {
                            console.log(err)
                        }
                    })

            }
            !isFile && notifyToast("warning", "Please choose file")
            setSelectedFile("")
            setIsFile(false)

        },
        [formData, history, isFile]
    )

    const handleFileSelect = (event: any) => {
        setIsFile(event.target.files ? true : false)
        setSelectedFile(event.target.files[0])
    }


    const notifyToast = (type: TypeOptions, content: ToastContent) => {

        (toast as any)[type](content, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })

    }


    return (
        <>

            <button
                className="bg-indigo-600 text-white active:bg-sky-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(e => !e)}
            >
                Add Users from excel
            </button>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            {showModal ?
                (

                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-zinc-600/75"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-2xl">
                            {loading ? <div className="relative flex flex-col w-full ">
                                <div className="p-12 max-w-2xl w-full  ">
                                    <div role="status">
                                        <svg aria-hidden="true" className="mr-2 w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>

                            </div> : <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-1xl font-bold text-center w-full uppercase">
                                        Add users from excel
                                    </h3>
                                </div>
                                <div className="relative p-9 flex-auto">
                                    <label>
                                        <input
                                            type="file"
                                            onChange={handleFileSelect}
                                            className="text-sm text-grey-500
                                            file:mr-5 file:py-2 file:px-6
                                            file:rounded-full file:border-0
                                            file:text-sm file:font-medium
                                            file:bg-blue-50 file:text-blue-700
                                            hover:file:cursor-pointer hover:file:bg-amber-50
                                            hover:file:text-amber-700" />
                                    </label>
                                </div>
                                <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-white bg-gray-600 font-medium uppercase px-6 rounded py-2 text-sm outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150 text-xs"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-normal uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 text-xs"
                                        type="button"
                                        onClick={(e) => {

                                            handleSend(e)


                                        }}
                                    >
                                        Submit
                                    </button>
                                </div>

                            </div>
                            }
                        </div>
                    </div>

                ) : null
            }
        </>
    )
};

export default AddNewUserFromExcel;