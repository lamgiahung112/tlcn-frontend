import {
	apiAdminPaginatePost,
	apiCreatePost,
	apiDeletePost,
	apiGetPostById,
	apiPaginatePost,
	apiPublishPost,
	apiUnpublishPost,
	apiUpdatePost,
	PostRequestDto,
} from "@/apis/post"
import {} from "@/apis/post"
import { Post } from "@/custom"
import { create } from "zustand"

interface PostState {
	posts: Post[]
	currentPost?: Post
	total: number
	totalPages: number
	filter: {
		name?: string
		page: number
		perPage: number
	}
}

interface PostActions {
	paginate: () => Promise<void>
	adminPaginate: () => Promise<void>
	createPost: (post: PostRequestDto) => Promise<void>
	updatePost: (id: number, post: PostRequestDto) => Promise<void>
	publishPost: (id: number) => Promise<void>
	unpublishPost: (id: number) => Promise<void>
	deletePost: (id: number) => Promise<void>
	findPost: (id: number) => Promise<void>
	setFilter: (filter: Partial<PostState["filter"]>) => void
}

export const usePost = create<PostState & PostActions>((set, get) => ({
	posts: [],
	currentPost: undefined,
	total: 0,
	totalPages: 0,
	filter: {
		name: undefined,
		page: 1,
		perPage: 10,
	},
	paginate: async () => {
		const data = await apiPaginatePost(
			get().filter.page,
			get().filter.perPage,
			get().filter.name
		)
		set({
			posts: data.items,
			total: data.meta.total,
			totalPages: data.meta.totalPages,
		})
	},
	adminPaginate: async () => {
		const data = await apiAdminPaginatePost(
			get().filter.page,
			get().filter.perPage,
			get().filter.name
		)
		set({
			posts: data.items,
			total: data.meta.total,
			totalPages: data.meta.totalPages,
		})
	},
	findPost: async (id: number) => {
		const data = await apiGetPostById(id)
		set({ currentPost: data })
	},
	setFilter: (filter) => set({ filter: { ...get().filter, ...filter } }),
	createPost: async (post) => {
		await apiCreatePost(post)
	},
	updatePost: async (id, post) => {
		await apiUpdatePost(id, post)
	},
	publishPost: async (id) => {
		await apiPublishPost(id)
	},
	unpublishPost: async (id) => {
		await apiUnpublishPost(id)
	},
	deletePost: async (id) => {
		await apiDeletePost(id)
	},
}))
