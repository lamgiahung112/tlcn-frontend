import { apiGetCartDetail } from "@/apis/cart";
import { CartItemDetail } from "@/custom";
import { create } from "zustand"

interface CartItem {
    genericMotorbikeId: number;
    quantity: number;
}

interface CartState {
    cart: CartItem[];
    cartDetail: CartItemDetail[]
    totalPrice: number
    maxQuantity: Record<number, number>
    errors: Record<number, string>
}

interface CartActions {
    fetchCartDetail: () => Promise<void>;
    updateCartDetail: (genericMotorbikeId: number, quantity: number) => Promise<void>;
    removeFromCartDetail: (genericMotorbikeId: number) => Promise<void>;
    updateCart: (genericMotorbikeId: number, quantity: number) => void;
    removeFromCart: (motorbikeId: number) => void;
    clearCart: () => void;
}

const useCart = create<CartState & CartActions>((set, get) => ({
    cart: JSON.parse(localStorage.getItem('cart') || '[]'),
    totalPrice: 0,
    maxQuantity: {},
    errors: {},
    cartDetail: [],
    clearCart() {
        set({ cart: [], cartDetail: [] })
        localStorage.setItem('cart', '[]')
    },
    async removeFromCartDetail(genericMotorbikeId) {
        get().removeFromCart(genericMotorbikeId)
        await get().fetchCartDetail()
    },
    async updateCartDetail(genericMotorbikeId, quantity) {
        const { maxQuantity } = get();
        // Check against max quantity
        const actualQuantity = Math.min(quantity, maxQuantity[genericMotorbikeId] || 0);
        
        // Update cart with validated quantity
        get().updateCart(genericMotorbikeId, actualQuantity);
        
        // Refresh cart details
        await get().fetchCartDetail();
    },
    async fetchCartDetail() {
        const cartDetail = await apiGetCartDetail(get().cart)
        set({ 
            cartDetail: cartDetail.cart, 
            totalPrice: cartDetail.metadata.totalPrice, 
            maxQuantity: cartDetail.metadata.maxQuantity, 
            errors: cartDetail.metadata.errors,
            cart: cartDetail.cart.map((item) => ({ genericMotorbikeId: item.item.id, quantity: item.quantity }))
        })
        localStorage.setItem('cart', JSON.stringify(get().cart))
    },
    updateCart: (genericMotorbikeId, quantity) => {
        set((state) => {
            const existingItem = state.cart.find(item => item.genericMotorbikeId === genericMotorbikeId);
            
            if (existingItem) {
                // Update existing item
                return {
                    cart: state.cart.map((item) => 
                        item.genericMotorbikeId === genericMotorbikeId 
                            ? { ...item, quantity } 
                            : item
                    )
                };
            } else {
                // Add new item
                return {
                    cart: [...state.cart, { genericMotorbikeId, quantity }]
                };
            }
        });
        localStorage.setItem('cart', JSON.stringify(get().cart))
    },
    removeFromCart: (genericMotorbikeId) => {
        set((state) => ({
            cart: state.cart.filter((item) => item.genericMotorbikeId !== genericMotorbikeId)
        }))
        localStorage.setItem('cart', JSON.stringify(get().cart))
    }
}))

export default useCart