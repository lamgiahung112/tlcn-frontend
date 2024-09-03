import { useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store"
import { startLoading, stopLoading } from "@/slices/loading-slice"
import { AxiosError } from "axios"

function useData<T, P = undefined>(
	fetcherFunc: (params: P) => Promise<T>,
	defaultValue?: T
) {
	const [data, setData] = useState<T | undefined>(defaultValue)
	const dispatch = useDispatch<AppDispatch>()
	const [error, setError] = useState<string[]>([])

	function fetch(params: P) {
		dispatch(startLoading())
		fetcherFunc(params)
			.then((res) => res)
			.then((data) => setData(data))
			.catch((err: AxiosError<T>) => {
				// @ts-ignore
				if (Array.isArray(err.response?.data?.message)) {
					// @ts-ignore
					setError(err.response?.data?.message)
				} else {
					setError([
						// @ts-ignore
						err.response?.data?.message ??
							`Something went wrong, please try again`,
					])
				}
				setData(defaultValue)
			})
			.finally(() => dispatch(stopLoading()))
	}

	return {
		data,
		error,
		fetch,
	}
}

export default useData
