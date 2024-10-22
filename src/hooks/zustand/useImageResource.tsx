import { apiCreateImageResource, apiDeleteImageResource, apiFilterImageResources } from "@/apis/image_resources"
import { ImageResource } from "@/custom"
import { create } from "zustand"

type UseImageResourceState = {
	page: number
	perPage: number
	total: number
	totalPages: number
	name?: string
	isLoading: boolean
	items: ImageResource[]
}

type UseImageResourceAction = {
	paginate: () => Promise<void>
	create: (form: FormData) => Promise<void>
    delete: (id: number) => Promise<void>
	setPage: (page: number) => void
	setPerPage: (perPage: number) => void
	setName: (name: string) => void
}

const useImageResource = create<UseImageResourceAction & UseImageResourceState>(
	(set, get) => {
		return {
			page: 1,
			perPage: 10,
			total: 0,
			totalPages: 0,
			isLoading: false,
			items: [],
			setName(name) {
				set((state) => ({ ...state, name }))
			},
			setPage(page) {
				set((state) => ({ ...state, page }))
			},
			setPerPage(perPage) {
				set((state) => ({ ...state, perPage }))
			},
			async create(form) {
				await apiCreateImageResource(form)
			},
			async paginate() {
				const { page, perPage, name } = get()
				const result = await apiFilterImageResources({ page, perPage, name })
				set((state) => ({
					...state,
					items: result.items,
					total: result.meta.total,
					totalPages: result.meta.totalPages,
				}))
			},
            async delete(id) {
                await apiDeleteImageResource(id)
            }
		}
	}
)

export default useImageResource