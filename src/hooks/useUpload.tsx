import React, {useState} from 'react'
import {UtilsAxios} from "../lib";
import {ApiConstants} from "../constants";

const useUpload = () => {
    const [uploadProgress, setUploadProgress] = useState<string>('0')
    const [isUploaded, setIsUploaded] = useState<boolean>(true)
    const [error, setError] = useState<string>()
    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            return
        }
        setUploadProgress('0')
        setIsUploaded(false)
        const formData = new FormData()
        formData.append('file', event.target.files[0])
        return UtilsAxios.post(ApiConstants.UTILS.UPLOAD_FILE, formData, {
            onUploadProgress: (progress) =>
                setUploadProgress(
                    ((progress.loaded * 100) / progress.total).toFixed(1)
                ),
        })
            .then(({data}) => {
                setIsUploaded(true)
                setUploadProgress('0')
                return data.file
            })
            .catch((err) => {
                if (err?.response) {
                    setError(err?.response?.data?.message)
                } else {
                    setError(err)
                }
            })
    }
    return {
        uploadProgress,
        isUploaded,
        handleUpload,
        error,
    }

}
export default useUpload
