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
	paymentMethodId: string
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
