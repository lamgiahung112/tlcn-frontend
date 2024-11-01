import { CartItem } from "@/components/customer"
import useCart from "@/hooks/zustand/useCart"
import { useOrder } from "@/hooks/zustand/useOrder"
import { _currency } from "@/utils/format"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function CartDetailPage() {
    const { cart, cartDetail, fetchCartDetail, totalPrice, clearCart } = useCart()
    const navigate = useNavigate()
    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        cvv: '',
        expirationDate: ''
    })
    const [customerData, setCustomerData] = useState({
        customerName: '',
        customerPhone: '',
        customerAddress: '',
        customerEmail: ''
    })
    const { createOrder } = useOrder()

    useEffect(() => {
        fetchCartDetail()
    }, [JSON.stringify(cart)])

    const onSubmit = async () => {
        const order = await createOrder({
            cart,
            customer: customerData,
            paymentMethodId: paymentDetails.cardNumber === '4444' ? 'invalid' : '1'
        })
        if (!order) {
            return
        }
        clearCart()
        navigate(`/orders/${order.publicOrderId}`)
    }

    const handleCustomerDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCustomerData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setPaymentDetails(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
            
            {cartDetail.length === 0 ? (
                <div className="text-center py-16">
                    <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
                    <p className="text-gray-600 mb-8">Add some motorbikes to get started!</p>
                    <Link 
                        to="/motorbikes" 
                        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Browse Motorbikes
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {cartDetail.map((item) => (
                        <CartItem 
                            key={item.item.id}
                            item={item.item}
                            quantity={item.quantity}
                        />
                    ))}
                    
                    <div className="mt-8 p-4 border rounded-lg bg-white">
                        <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="customerName"
                                    value={customerData.customerName}
                                    onChange={handleCustomerDataChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter your full name"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="customerPhone"
                                    value={customerData.customerPhone}
                                    onChange={handleCustomerDataChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter your phone number"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="customerEmail"
                                    value={customerData.customerEmail}
                                    onChange={handleCustomerDataChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter your email"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="customerAddress"
                                    value={customerData.customerAddress}
                                    onChange={handleCustomerDataChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter your address"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 p-4 border rounded-lg bg-white">
                        <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Card Number
                                </label>
                                <input
                                    type="text"
                                    name="cardNumber"
                                    value={paymentDetails.cardNumber}
                                    onChange={handlePaymentChange}
                                    placeholder="1234 5678 9012 3456"
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    maxLength={19}
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Expiration Date
                                    </label>
                                    <input
                                        type="text"
                                        name="expirationDate"
                                        value={paymentDetails.expirationDate}
                                        onChange={handlePaymentChange}
                                        placeholder="MM/YY"
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        maxLength={5}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        CVV
                                    </label>
                                    <input
                                        type="text"
                                        name="cvv"
                                        value={paymentDetails.cvv}
                                        onChange={handlePaymentChange}
                                        placeholder="123"
                                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        maxLength={3}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 p-4 border rounded-lg bg-white">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg">Total</span>
                            <span className="text-2xl font-bold">{_currency(totalPrice)}</span>
                        </div>
                        <button onClick={onSubmit} className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors">
                            Buy Now
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CartDetailPage