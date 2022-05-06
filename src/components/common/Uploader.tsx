import React, {useCallback, useRef} from 'react'
import {useUpload} from '../../hooks'

type FileTypes =
    | 'document'
    | 'image'
    | 'presentation'
    | 'source'
    | 'video'
    | 'all'

interface IProps {
    cb: (filePath: string, name: string) => void
    accept: FileTypes
    name: string
}

const Index: React.FC<IProps> = (props) => {
    const {accept, cb, name} = props
    const {error, handleUpload, isUploaded, uploadProgress} = useUpload()
    const isDisabled = Boolean(!isUploaded)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event) {
            return
        }
        //@ts-ignore
        handleUpload(event)
            .then((res) => {
                cb(res, name)
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err.response.data)
                } else {
                    console.log(err)
                }
            })
    }
    const returnAcceptType = useCallback(() => {
        switch (accept) {
            case 'document':
                return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,application/pdf'
            case 'image':
                return 'image/png,image/jpeg,image/webp,image/jpg,image/gif'
            case 'presentation':
                return 'application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/pdf'
            case 'source':
                return 'application/json,text/javascript,text/html,text/css'
            case 'video':
                return 'video/mp4,video/mov'
            default:
                return '.zip,.rar,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword,application/pdf,image/png,image/jpeg,image/webp,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/json,text/javascript,text/html,text/css,video/mp4'
        }
    }, [accept])
    const uploadRef = useRef()

    return (
        <div
            className="cursor-pointer mt-1 border-2 border-gray-300 border-dashed rounded-md px-6 pt-5 pb-6 flex justify-center items-center"
            //@ts-ignore
            onClick={() => uploadRef.current.click()}
        >
            <div className="space-y-1 text-center">
                <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                    //@ts-ignore
                    onClick={() => uploadRef.current.click()}
                >
                    <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <div className="flex text-sm text-gray-600">
                    <label
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            onChange={handleChange}
                            className="sr-only"
                            accept={returnAcceptType()}
                            hidden
                            //@ts-ignore
                            ref={uploadRef}
                            disabled={isDisabled}
                        />
                    </label>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
        </div>
    )
}
export default Index
