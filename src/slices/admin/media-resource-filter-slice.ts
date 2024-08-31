import { Pagable, Sortable } from "../../utils/api-request-utils.ts"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface MediaResourceFilterSlice extends Pagable {
	name?: string
	sort: Sortable<"created_at">
}

const initialState: MediaResourceFilterSlice = {
	sort: {
		created_at: undefined,
	},
	page: 0,
	size: 10,
	name: undefined,
}

const mediaResourceSlice = createSlice({
	name: "media-resource-filter",
	initialState,
	reducers: {
		setSort(state, action: PayloadAction<"asc" | "desc" | undefined>) {
			state.sort.created_at = action.payload
		},
		setPage(state, action: PayloadAction<number>) {
			state.page = Math.max(0, action.payload)
		},
		setName(state, action: PayloadAction<string | undefined>) {
			state.name = action.payload
		},
	},
})

export default mediaResourceSlice
export const { setSort, setName, setPage } = mediaResourceSlice.actions
