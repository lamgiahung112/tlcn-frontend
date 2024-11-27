import {
	apiAdminGetServiceTokens,
	apiGetServiceHistory,
	apiMarkServiceTokenUsed,
} from "@/apis/service_token"
import { ServiceToken } from "@/custom"
import { create } from "zustand"

interface ServiceTokenState {
	serviceTokens: ServiceToken[]
	total: number
	page: number
	perPage: number
	totalPages: number
	filter: {
		plateNumber?: string
		status?: "USED" | "UNUSED"
	}
}

interface ServiceTokenActions {
	paginate: () => Promise<void>
	adminPaginate: () => Promise<void>
	markUsed: (id: number) => Promise<void>
	setPage: (page: number) => void
	setFilter: (filter: Partial<ServiceTokenState["filter"]>) => void
}

const useServiceToken = create<ServiceTokenState & ServiceTokenActions>((set, get) => ({
	serviceTokens: [],
	total: 0,
	page: 1,
	perPage: 10,
	totalPages: 0,
	filter: {
		plateNumber: undefined,
	},
	paginate: async () => {
		const res = await apiGetServiceHistory(get().page, get().perPage)
		set({
			serviceTokens: res.items,
			total: res.meta.total,
			totalPages: res.meta.totalPages,
		})
	},
	adminPaginate: async () => {
		const res = await apiAdminGetServiceTokens(
			get().page,
			get().perPage,
			get().filter.plateNumber,
			get().filter.status
		)
		set({
			serviceTokens: res.items,
			total: res.meta.total,
			totalPages: res.meta.totalPages,
		})
	},
	markUsed: async (id: number) => {
		await apiMarkServiceTokenUsed(id)
	},
	setPage: (page: number) => {
		set({ page })
	},
	setFilter: (filter: Partial<ServiceTokenState["filter"]>) => {
		set({ filter })
	},
}))

export default useServiceToken
