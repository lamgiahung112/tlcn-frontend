import { CartItemDetail, Coupon } from "@/custom"
import { Axios } from "@/utils/Axios"

export function apiGetCartDetail(
	cartDetailDto: {
		genericMotorbikeId: number
		quantity: number
	}[],
	couponCode?: string
) {
	return Axios.post<
		{
			cart: CartItemDetail[]
			metadata: {
				totalPrice: number
				maxQuantity: Record<number, number>
				errors: Record<number, string>
				coupon: Coupon | null
			}
		},
		typeof cartDetailDto
	>(`/cart/detail?couponCode=${couponCode}`, cartDetailDto)
}
