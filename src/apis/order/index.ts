import { Order, OrderStatus, Paginated } from "@/custom"
import { Axios } from "@/utils/Axios"

export interface CreateOrderDto {
	cart: {
		genericMotorbikeId: number
		quantity: number
	}[]
	customer: {
		customerName: string
		customerPhone: string
		customerAddress: string
		customerEmail: string
	}
	paypalOrderId: string
	couponCode?: string
}

export interface FilterOrderDto {
	page: number
	perPage: number
	publicOrderId?: string
	status?: OrderStatus
}

export async function apiCreateOrder(data: CreateOrderDto) {
	return Axios.post<Order, CreateOrderDto>("/orders", data)
}

export async function apiFilterOrders(data: FilterOrderDto) {
	return Axios.get<Paginated<Order>, FilterOrderDto>("/orders", data)
}

export async function apiGetOrder(publicOrderId: string, email: string) {
	return Axios.post<Order, { email: string }>(`/orders/${publicOrderId}`, { email })
}

export async function apiCreatePaymentOrder(amount: number) {
	return Axios.post<{ id: string }, { amount: number }>("/payment/create-order", {
		amount,
	})
}

export async function apiAdminGetOrder(publicOrderId: string) {
	return Axios.get<Order>(`/orders/admin/${publicOrderId}`)
}

export async function apiAdminConfirmOrder(publicOrderId: string) {
	return Axios.post(`/orders/admin/${publicOrderId}/confirm`, null)
}

export async function apiAdminStartDelivery(publicOrderId: string) {
	return Axios.post(`/orders/admin/${publicOrderId}/start-delivery`, null)
}

export async function apiAdminCompleteOrder(publicOrderId: string) {
	return Axios.post(`/orders/admin/${publicOrderId}/complete`, null)
}

export async function apiAdminCancelOrder(publicOrderId: string, reason: string) {
	return Axios.post(`/orders/admin/${publicOrderId}/cancel`, { reason })
}
