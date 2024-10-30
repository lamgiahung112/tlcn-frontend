import { CartItemDetail } from "@/custom";
import { Axios } from "@/utils/Axios";

export function apiGetCartDetail(cartDetailDto: {
    genericMotorbikeId: number;
    quantity: number;
}[]) {
    return Axios.post<{ cart: CartItemDetail[], metadata: { totalPrice: number, maxQuantity: Record<number, number>, errors: Record<number, string> } }, typeof cartDetailDto>('/cart/detail', cartDetailDto)
}