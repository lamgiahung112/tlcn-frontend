import { apiCreateOrder, apiFilterOrders, apiGetOrder, CreateOrderDto, FilterOrderDto } from "@/apis/order";
import { Order, OrderStatus } from "@/custom";
import { create } from "zustand";

interface OrderState {
    page: number,
    perPage: number,
    total: number,
    totalPages: number,
    filter: {
        publicOrderId: string
        status: OrderStatus | ""
    }
    currentOrder: Order | undefined
    orders: Order[]
}

interface OrderActions {
    createOrder: (data: CreateOrderDto) => Promise<Order>
    getOrder: (publicOrderId: string, email: string) => Promise<Order>
    filterOrders: (data: FilterOrderDto) => Promise<void>
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
    async filterOrders(data) {
        const result = await apiFilterOrders(data)
        set({ orders: result.items, total: result.meta.total, totalPages: result.meta.totalPages })
    },
    async createOrder(data) {
        return await apiCreateOrder(data)
    },
    async getOrder(publicOrderId, email) {
        const order = await apiGetOrder(publicOrderId, email)
        set({ currentOrder: order })
        return order
    }
}))
