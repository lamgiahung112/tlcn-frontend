import { createSlice } from "@reduxjs/toolkit"

interface LoadingSlice {
	isLoading: boolean
	loadingCount: number
}

const initialState: LoadingSlice = {
	isLoading: false,
	loadingCount: 0,
}

const loadingSlice = createSlice({
	name: "loading",
	initialState,
	reducers: {
		startLoading(state) {
			state.isLoading = true
			state.loadingCount++
		},
		stopLoading(state) {
			state.isLoading = false
			state.loadingCount--
		},
	},
})

export default loadingSlice
export const { startLoading, stopLoading } = loadingSlice.actions
