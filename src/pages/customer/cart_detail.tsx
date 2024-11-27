import { CartItem } from "@/components/customer"
import { CouponType } from "@/custom"
import useCart from "@/hooks/zustand/useCart"
import { useOrder } from "@/hooks/zustand/useOrder"
import useUser from "@/hooks/zustand/useUser"
import { _currency } from "@/utils/format"
import { _imgLink } from "@/utils/img-link"
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function CartDetailPage() {
	const { cart, cartDetail, fetchCartDetail, totalPrice, clearCart, coupon } = useCart()
	const navigate = useNavigate()
	const { user } = useUser()
	const [customerData, setCustomerData] = useState({
		customerName: user?.name ?? "",
		customerPhone: user?.phoneNumber ?? "",
		customerAddress: "",
		customerEmail: user?.email ?? "",
	})
	const [couponCode, setCouponCode] = useState("")
	const { createOrder, createPaymentOrder } = useOrder()

	useEffect(() => {
		fetchCartDetail(couponCode)
	}, [JSON.stringify(cart)])

	const handleCustomerDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setCustomerData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	if (!user) {
		return (
			<div className="container mx-auto px-4 py-16 text-center">
				<h2 className="text-2xl font-semibold mb-4">Please login to continue</h2>
				<p className="text-gray-600 mb-8">
					You need to be logged in to access your shopping cart
				</p>
				<Link
					to="/login"
					className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
				>
					Login Now
				</Link>
			</div>
		)
	}

	return (
		<PayPalScriptProvider
			options={{
				currency: "USD",
				components: "buttons",
				clientId:
					"AbprxemC7WDSdsJn8J0hxrW5WgjA0y2KT4XMYKxd5b6yjx9cMziWRf4OeZf3KHKP6K6CromupA_7I8vd",
			}}
		>
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

				{cartDetail.length === 0 ? (
					<div className="text-center py-16">
						<h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
						<p className="text-gray-600 mb-8">
							Add some motorbikes to get started!
						</p>
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

						{coupon && coupon.type === CouponType.ITEM && (
							<div className="flex items-center gap-4 p-4 border rounded-lg bg-white">
								<img
									src={_imgLink(coupon?.itemImageResource?.s3Key ?? "")}
									alt="img motorbike"
									className="w-20 h-20 object-cover rounded-lg"
								/>
								<div className="flex-1 flex flex-col gap-2">
									<h3 className="font-semibold text-lg">
										{coupon.itemName}
									</h3>
									<p className="text-gray-600">Số lượng: 1</p>
								</div>
							</div>
						)}

						<div className="mt-8 p-4 border rounded-lg bg-white">
							<h2 className="text-xl font-semibold mb-4">
								Customer Information
							</h2>
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
										className="w-full px-3 py-2 outline-none border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
										className="w-full px-3 py-2 outline-none border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
										className="w-full px-3 py-2 outline-none border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
										className="w-full px-3 py-2 outline-none border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										placeholder="Enter your address"
									/>
								</div>
							</div>
						</div>

						<div className="mt-8 p-4 border rounded-lg bg-white">
							<div className="flex gap-4 mb-4">
								<input
									type="text"
									name="couponCode"
									value={couponCode}
									onChange={(e) => setCouponCode(e.target.value)}
									className="flex-1 px-3 py-2 border outline-none rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="Enter coupon code"
								/>
								<button
									className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
									onClick={() => fetchCartDetail(couponCode)}
								>
									Apply
								</button>
							</div>
							{coupon && (
								<div className="flex justify-between items-center mb-4">
									<span className="text-lg">Applied Coupon</span>
									<span className="text-2xl font-bold">
										{coupon.code}
									</span>
								</div>
							)}
						</div>

						<div className="mt-8 p-4 border rounded-lg bg-white">
							<div className="flex justify-between items-center mb-4">
								<span className="text-lg">Total</span>
								<span className="text-2xl font-bold">
									{_currency(totalPrice)}
								</span>
							</div>
						</div>

						<div className="mt-8 p-4 border rounded-lg bg-white">
							<h2 className="text-xl font-semibold mb-4">
								Payment Details
							</h2>
							<PayPalButtons
								forceReRender={[cart, customerData]}
								style={{
									disableMaxWidth: true,
									layout: "horizontal",
								}}
								createOrder={async () => {
									const paymentOrder = await createPaymentOrder(
										totalPrice
									)
									return paymentOrder.id
								}}
								onApprove={async (data) => {
									const order = await createOrder({
										cart,
										customer: customerData,
										paypalOrderId: data.orderID,
										couponCode: coupon?.code,
									})
									if (!order) {
										return
									}
									clearCart()
									navigate(`/orders/${order.publicOrderId}`)
								}}
							/>
						</div>
					</div>
				)}
			</div>
		</PayPalScriptProvider>
	)
}

export default CartDetailPage
