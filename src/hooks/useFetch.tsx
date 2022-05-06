import {useCallback, useState} from "react";
import {AxiosResponse} from "axios";


interface State<R> {
    data?: R
    err?: Error
    fetchData: () => void
    loading: boolean
}

function useFetch<R = unknown>(fetcher: () => Promise<AxiosResponse<R>>): State<R> {
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<R>()
    const [err, setError] = useState()
    const fetchData = useCallback(async () => {
        try {
            setLoading(true)
            const res = fetcher()
            const responseData = (await res) as unknown as AxiosResponse<R>
            setData(responseData.data)
            setLoading(false)
        } catch (err) {
            //@ts-ignore
            if (err.response) {
                //@ts-ignore
                console.log(err.response.data)
            } else {
                console.log(err)
            }
            //@ts-ignore
            setError(err)
        }
    }, [fetcher])
    return {data, err, fetchData, loading}
}

export default useFetch
