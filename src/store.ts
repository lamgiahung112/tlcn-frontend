import { configureStore } from "@reduxjs/toolkit"
import sessionSlice from "./slices/session-slice.tsx"
import mediaResourceSlice from "./slices/admin/media-resource-filter-slice.ts"
import loadingSlice from "./slices/loading-slice.tsx"

export const store = configureStore({
	reducer: {
		session: sessionSlice.reducer,
		mediaResourceFilter: mediaResourceSlice.reducer,
		loading: loadingSlice.reducer,
	},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
