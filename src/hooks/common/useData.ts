import { useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store"
import { startLoading, stopLoading } from "@/slices/loading-slice"

function useData<T, P = undefined>(
	fetcherFunc: (params: P) => Promise<T>,
	defaultValue?: T
) {
	const [data, setData] = useState<T | undefined>(defaultValue)
	const dispatch = useDispatch<AppDispatch>()
	const [error, setError] = useState<string | undefined>(undefined)

	function fetch(params: P) {
		dispatch(startLoading())
		fetcherFunc(params)
			.then((res) => res)
			.then((data) => setData(data))
			.catch((err) => {
				setError(err)
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
