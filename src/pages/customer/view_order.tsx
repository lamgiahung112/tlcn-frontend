import { useParams } from "react-router-dom";
import { useState } from "react";
import { useOrder } from "@/hooks/zustand/useOrder";
import OrderDetail from "@/components/customer/order_detail";

function ViewOrderPage() {
    const { orderPublicId } = useParams();
    const { getOrder } = useOrder()
    const [orderId, setOrderId] = useState(orderPublicId || '');
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderPublicId || !email) return
        getOrder(orderPublicId, email)
    };

    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">View Order Status</h1>
                    <p className="text-gray-500">Enter your order details below</p>
                </div>
                
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">
                                Order ID
                            </label>
                            <input
                                type="text"
                                id="orderId"
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                                className="appearance-none relative block w-full px-3 py-3 mt-1
                                    border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    text-sm"
                                placeholder="Enter your order ID"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Customer Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none relative block w-full px-3 py-3 mt-1
                                    border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    text-sm"
                                placeholder="Enter your email address"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-3 px-4 
                            border border-transparent text-sm font-medium rounded-lg text-white 
                            bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 
                            focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                        Look Up Order
                    </button>
                </form>
            </div>
            <OrderDetail />
        </div>
    );
}

export default ViewOrderPage;