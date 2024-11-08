import {
	apiAdminCancelOrder,
	apiAdminCompleteOrder,
	apiAdminConfirmOrder,
	apiAdminGetOrder,
	apiAdminStartDelivery,
	apiCreateOrder,
	apiCreatePaymentOrder,
	apiFilterOrders,
	apiGetOrder,
	CreateOrderDto,
} from "@/apis/order"
import { Order, OrderStatus } from "@/custom"
import { create } from "zustand"

interface OrderState {
	page: number
	perPage: number
	total: number
	totalPages: number
	filter: {
		publicOrderId: string
		status: OrderStatus | ""
	}
	currentOrder: Order | undefined
	orders: Order[]
}

interface OrderActions {
	createOrder: (data: CreateOrderDto) => Promise<Order>
	setFilter: (filter: Partial<OrderState["filter"]>) => void
	setPage: (page: number) => void
	getOrder: (publicOrderId: string, email: string) => Promise<Order>
	getAdminOrder: (publicOrderId: string) => Promise<Order>
	paginate: () => Promise<void>
	confirmOrder: (publicOrderId: string) => Promise<void>
	startDelivery: (publicOrderId: string) => Promise<void>
	completeOrder: (publicOrderId: string) => Promise<void>
	cancelOrder: (publicOrderId: string, reason: string) => Promise<void>
	createPaymentOrder: (total: number) => Promise<{ id: string }>
}

export const useOrder = create<OrderState & OrderActions>()((set, get) => ({
	page: 1,
	perPage: 10,
	total: 0,
	totalPages: 0,
	filter: {
		publicOrderId: "",
		status: "",
	},
	currentOrder: undefined,
	orders: [],
	setFilter: (filter) => set({ filter: { ...get().filter, ...filter } }),
	setPage: (page) => set({ page }),
	async createPaymentOrder(total) {
		return await apiCreatePaymentOrder(total)
	},
	async cancelOrder(publicOrderId, reason) {
		await apiAdminCancelOrder(publicOrderId, reason)
		await get().getAdminOrder(publicOrderId)
	},
	async confirmOrder(publicOrderId) {
		await apiAdminConfirmOrder(publicOrderId)
		await get().getAdminOrder(publicOrderId)
	},
	async startDelivery(publicOrderId) {
		await apiAdminStartDelivery(publicOrderId)
		await get().getAdminOrder(publicOrderId)
	},
	async completeOrder(publicOrderId) {
		await apiAdminCompleteOrder(publicOrderId)
		await get().getAdminOrder(publicOrderId)
	},
	async getAdminOrder(publicOrderId) {
		const order = await apiAdminGetOrder(publicOrderId)
		set({ currentOrder: order })
		return order
	},
	async paginate() {
		const result = await apiFilterOrders({
			page: get().page,
			perPage: get().perPage,
			publicOrderId: get().filter.publicOrderId || undefined,
			status: get().filter.status || undefined,
		})
		set({
			orders: result.items,
			total: result.meta.total,
			totalPages: result.meta.totalPages,
		})
	},
	async createOrder(data) {
		return await apiCreateOrder(data)
	},
	async getOrder(publicOrderId, email) {
		const order = await apiGetOrder(publicOrderId, email)
		set({ currentOrder: order })
		return order
	},
}))
