import { apiFilterGenericMotorbike } from "@/apis"
import { Db } from "@/custom"
import { create } from "zustand"

type UseGenericMotorbikeState = {
	page: number
	perPage: number
    total: number
    totalPages: number
	name?: string
	category?: Db.Category
	minPrice?: number
	maxPrice?: number
	isLoading: boolean
	items: Db.GenericMotorbike[]
	motorbikes: Db.Motorbike[]
}

type UseGenericMotorbikeAction = {
	paginate: () => Promise<void>
	findMotorbikes: (genericMotorbikeId: number) => Promise<void>
	setPage: (page: number) => void
	setPerPage: (perPage: number) => void
	setName: (name: string) => void
	setCategory: (cat: Db.Category) => void
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
			async findMotorbikes(genericMotorbikeId) {},
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
				set((state) => ({ ...state, isLoading: false, items: result.items, total: result.meta.total, totalPages: result.meta.totalPages }))
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
