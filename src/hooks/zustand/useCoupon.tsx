import {
	apiCreateCoupon,
	apiDeleteCoupon,
	apiGetCoupon,
	apiPaginateCoupon,
	apiPublishCoupon,
	apiUpdateCoupon,
	CouponDto,
} from "@/apis/coupons"
import { Coupon, CouponType } from "@/custom"
import { create } from "zustand"

interface CouponState {
	currentCoupon: Coupon | null
	coupons: Coupon[]
	page: number
	perPage: number
	total: number
	totalPages: number
	filters: {
		code?: string
		type?: CouponType
	}
}

interface CouponActions {
	setPage: (page: number) => void
	setFilters: (filters: CouponState["filters"]) => void
	getCoupon: (code: string) => Promise<void>
	paginateCoupons: () => Promise<void>
	createCoupon: (dto: CouponDto) => Promise<void>
	updateCoupon: (id: number, dto: CouponDto) => Promise<void>
	deleteCoupon: (id: number) => Promise<void>
	publishCoupon: (id: number, isPublished: boolean) => Promise<void>
}

const useCoupon = create<CouponState & CouponActions>((set, get) => ({
	currentCoupon: null,
	coupons: [],
	page: 1,
	perPage: 10,
	total: 0,
	totalPages: 0,
	filters: {},
	setFilters: (filters) => {
		set({ filters })
	},
	setPage: (page) => {
		set({ page })
	},
	getCoupon: async (code: string) => {
		const res = await apiGetCoupon(code)
		set({ currentCoupon: res })
	},
	paginateCoupons: async () => {
		const res = await apiPaginateCoupon({
			page: get().page,
			perPage: get().perPage,
			code: get().filters.code,
			type: get().filters.type,
		})
		set({
			coupons: res.items,
			page: res.meta.page,
			perPage: res.meta.perPage,
			total: res.meta.total,
			totalPages: res.meta.totalPages,
		})
	},
	createCoupon: async (dto: CouponDto) => {
		await apiCreateCoupon(dto)
	},
	updateCoupon: async (id: number, dto: CouponDto) => {
		await apiUpdateCoupon(id, dto)
	},
	deleteCoupon: async (id: number) => {
		await apiDeleteCoupon(id)
	},
	publishCoupon: async (id: number, isPublished: boolean) => {
		await apiPublishCoupon(id, isPublished)
	},
}))

export default useCoupon
