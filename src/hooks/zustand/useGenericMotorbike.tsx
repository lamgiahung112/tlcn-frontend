import {
	apiCreateGenericMotorbike,
	apiFilterGenericMotorbike,
	apiFindGenericMotorbikeById,
	apiImportMotorbikeData,
	apiUpdateGenericMotorbike,
	UpsertGenericMotorbikeDto,
} from "@/apis"
import { Category, GenericMotorbike } from "@/custom"
import { create } from "zustand"

type UseGenericMotorbikeState = {
	page: number
	perPage: number
	total: number
	totalPages: number
	name?: string
	category?: Category
	minPrice?: number
	maxPrice?: number
	isLoading: boolean
	items: GenericMotorbike[]
	currentGenericMotorbike?: GenericMotorbike
}

type UseGenericMotorbikeAction = {
	paginate: () => Promise<void>
	fetchGenericMotorbike: (id: number) => Promise<void>
	importMotorbikeData: (file: Blob) => Promise<void>
	updateGenericMotorbike: (id: number, data: UpsertGenericMotorbikeDto) => Promise<void>
	create: (data: UpsertGenericMotorbikeDto) => Promise<void>
	setPage: (page: number) => void
	setPerPage: (perPage: number) => void
	setName: (name: string) => void
	setCategory: (cat: Category) => void
	setMinPrice: (price: number) => void
	setMaxPrice: (price: number) => void
}

const useGenericMotorbike = create<UseGenericMotorbikeState & UseGenericMotorbikeAction>(
	(set, get) => {
		return {
			isLoading: false,
			page: 1,
			perPage: 10,
			total: 0,
			totalPages: 0,
			items: [],
			motorbikes: [],
			currentGenericMotorbike: undefined,
			async importMotorbikeData(file) {
				const result = await apiImportMotorbikeData(get().currentGenericMotorbike?.id ?? -1, file)
				set((state) => ({ ...state, motorbikes: result }))
			},
			async updateGenericMotorbike(id, data) {
				await apiUpdateGenericMotorbike(id, data)
			},
			async fetchGenericMotorbike(id) {
				const result = await apiFindGenericMotorbikeById(id)
				set((state) => ({ ...state, currentGenericMotorbike: result }))
			},
			async paginate() {
				set((state) => ({ ...state, isLoading: true }))
				const { page, perPage, name, category, minPrice, maxPrice } = get()
				const result = await apiFilterGenericMotorbike({
					page,
					perPage,
					name,
					category,
					minPrice,
					maxPrice,
				})
				set((state) => ({
					...state,
					isLoading: false,
					items: result.items,
					total: result.meta.total,
					totalPages: result.meta.totalPages,
				}))
			},
			async create(data) {
				set((state) => ({ ...state, isLoading: true }))
				await apiCreateGenericMotorbike(data)
				set((state) => ({ ...state, isLoading: false }))
			},
			setCategory(cat) {
				set((state) => ({ ...state, category: cat }))
			},
			setMaxPrice(price) {
				set((state) => ({ ...state, maxPrice: price }))
			},
			setMinPrice(price) {
				set((state) => ({ ...state, minPrice: price }))
			},
			setName(name) {
				set((state) => ({ ...state, name }))
			},
			setPage(page) {
				set((state) => ({ ...state, page }))
			},
			setPerPage(perPage) {
				set((state) => ({ ...state, perPage }))
			},
		}
	}
)

export default useGenericMotorbike
