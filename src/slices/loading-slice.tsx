import { createSlice } from "@reduxjs/toolkit"

interface LoadingSlice {
	isLoading: boolean
}

const initialState: LoadingSlice = {
	isLoading: false,
}

const loadingSlice = createSlice({
	name: "loading",
	initialState,
	reducers: {
		startLoading(state) {
			state.isLoading = true
		},
		stopLoading(state) {
			state.isLoading = false
		},
	},
})

export default loadingSlice
export const { startLoading, stopLoading } = loadingSlice.actions
