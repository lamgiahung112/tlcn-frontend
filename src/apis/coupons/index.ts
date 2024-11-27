import { Coupon, CouponType, Paginated } from "@/custom"
import { Axios } from "@/utils/Axios"

export interface CouponDto {
	code: string
	type: CouponType
	discount?: number
	maxUsage?: number
	expiredAt?: string
	itemImageResourceId?: number
	itemName?: string
}

export interface PaginateCouponDto {
	page: number
	perPage: number
	code?: string
	type?: CouponType
}

export const apiGetCoupon = (code: string) => Axios.get<Coupon>(`/coupons/${code}`)
export const apiCreateCoupon = (dto: CouponDto) => Axios.post(`/coupons`, dto)
export const apiUpdateCoupon = (id: number, dto: CouponDto) =>
	Axios.put(`/coupons/${id}`, dto)
export const apiDeleteCoupon = (id: number) => Axios.delete(`/coupons/${id}`)
export const apiPublishCoupon = (id: number, isPublished: boolean) =>
	Axios.put(`/coupons/${id}/publish?isPublished=${isPublished}`, null)
export const apiPaginateCoupon = (dto: PaginateCouponDto) =>
	Axios.get<Paginated<Coupon>>(`/coupons`, dto)
